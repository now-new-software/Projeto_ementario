import { Outlet, useLocation } from 'react-router-dom'
import { navigationItems } from '../../types/navigation'
import { Sidebar } from './Sidebar'

// Este layout encapsula a estrutura visual persistente da aplicacao:
// menu lateral, topbar e area principal para renderizar as rotas filhas.
function getTopbarContext(pathname: string): string {
  const activeItem = navigationItems.find((item) => {
    if (pathname === item.path) {
      return true
    }

    // Mantem o contexto correto para futuras subrotas, ex: /cursos/123.
    return pathname.startsWith(`${item.path}/`)
  })

  return activeItem?.topbarLabel ?? 'dashboard'
}

export function AppLayout() {
  const location = useLocation()
  const topbarContext = getTopbarContext(location.pathname)

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-area">
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
