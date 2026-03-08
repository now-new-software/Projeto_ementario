import { useState } from 'react'
import { DashboardPage } from './pages/DashboardPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { Sidebar } from './components/layout/Sidebar'
import { navigationItems, type NavigationKey } from './types/navigation'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState<NavigationKey>('dashboard')

  const activeItem = navigationItems.find((item) => item.key === activePage)
  const pageDescriptions: Record<Exclude<NavigationKey, 'dashboard'>, string> = {
    cursos:
      'Área para consulta completa, filtros e edição das informações de cursos e disciplinas.',
    configuracoes:
      'Espaço para preferências da aplicação, parâmetros da sincronização e acesso de administradores.',
    'status-api':
      'Painel com saúde da API, jobs de extração Selenium e monitoramento de integridade dos dados.',
  }

  return (
    <div className="app-shell">
      <Sidebar activeItem={activePage} onSelect={setActivePage} />
      <div className="app-area">
        <header className="app-topbar">
          <span className="app-topbar__project">APIEmentário</span>
          <span className="app-topbar__separator">/</span>
          <span className="app-topbar__context">
            {activeItem?.label.toLowerCase() ?? 'dashboard'}
          </span>
        </header>
        <main className="app-main">
          {activePage === 'dashboard' ? (
            <DashboardPage />
          ) : (
            <PlaceholderPage
              title={activeItem?.label ?? 'Tela'}
              description={pageDescriptions[activePage as Exclude<NavigationKey, 'dashboard'>]}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
