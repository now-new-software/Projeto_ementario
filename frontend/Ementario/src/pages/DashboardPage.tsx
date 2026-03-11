import { useCallback, useEffect, useMemo, useState } from 'react'
import { RecentActivityPanel } from '../components/dashboard/RecentActivityPanel'
import { StatCard, type StatTone } from '../components/dashboard/StatCard'
import type { DashboardResponse } from '../types/dashboard'

// Esta pagina consome o endpoint agregado da API (/api/dashboard/)
// e transforma o retorno em cards de metricas + lista de atividade recente.
interface DashboardMetric {
  label: string
  value: number
  tone: StatTone
}

const emptyDashboard: DashboardResponse = {
  last_sync: null,
  metrics: {
    total_cursos: 0,
    sincronizados: 0,
    desatualizados: 0,
    inseridos_manualmente: 0,
  },
  recent_activity: [],
}

function formatLastSync(lastSync: string | null): string {
  if (!lastSync) {
    return 'Sem sincronizacao registrada'
  }

  const parsedDate = new Date(lastSync)
  if (Number.isNaN(parsedDate.getTime())) {
    return 'Data de sincronizacao indisponivel'
  }

  return parsedDate.toLocaleString('pt-BR')
}

export function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse>(emptyDashboard)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Funcao unica de sincronizacao de dados da tela,
  // reutilizada no carregamento inicial e no botao "Sincronizar".
  const loadDashboardData = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/dashboard/', {
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) {
        throw new Error(`Falha na API: ${response.status}`)
      }

      const payload = (await response.json()) as DashboardResponse
      setDashboardData(payload)
    } catch (_error) {
      setErrorMessage('Nao foi possivel carregar os dados em tempo real.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Dispara a primeira carga quando a pagina e aberta.
  useEffect(() => {
    void loadDashboardData()
  }, [loadDashboardData])

  // Adapta o formato de dados da API para o formato esperado pelos cards.
  const metrics = useMemo<DashboardMetric[]>(() => {
    return [
      { label: 'Total de Cursos', value: dashboardData.metrics.total_cursos, tone: 'teal' },
      { label: 'Sincronizados', value: dashboardData.metrics.sincronizados, tone: 'green' },
      { label: 'Desatualizados', value: dashboardData.metrics.desatualizados, tone: 'amber' },
      {
        label: 'Inseridos manualmente',
        value: dashboardData.metrics.inseridos_manualmente,
        tone: 'violet',
      },
    ]
  }, [dashboardData.metrics])

  const handleSync = () => {
    void loadDashboardData()
  }

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard__sync-label">
            Ultima sincronizacao: {formatLastSync(dashboardData.last_sync)}
          </p>
          {errorMessage ? <p className="dashboard__error">{errorMessage}</p> : null}
        </div>
        <button type="button" className="sync-button" onClick={handleSync} disabled={isLoading}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.5 6.5V3.8L21 7.3l-3.5 3.5V8.5a6.5 6.5 0 1 0 1.2 7.4" />
          </svg>
          {isLoading ? 'Sincronizando...' : 'Sincronizar'}
        </button>
      </header>

      <div className="dashboard__stats">
        {metrics.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} tone={metric.tone} />
        ))}
      </div>

      <RecentActivityPanel items={dashboardData.recent_activity} isLoading={isLoading} />
    </section>
  )
}
