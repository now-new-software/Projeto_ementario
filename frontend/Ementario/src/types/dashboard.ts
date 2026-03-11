// Tipos do payload da Dashboard retornado pelo backend.
// Esses contratos mantem o front consistente com a API /api/dashboard/.
export type ActivityStatus = 'Sincronizado' | 'Desatualizado' | 'Manual'

export interface ActivityItem {
  code: string
  title: string
  area: string
  status: ActivityStatus
}

export interface DashboardMetrics {
  total_cursos: number
  sincronizados: number
  desatualizados: number
  inseridos_manualmente: number
}

export interface DashboardResponse {
  last_sync: string | null
  metrics: DashboardMetrics
  recent_activity: ActivityItem[]
}
