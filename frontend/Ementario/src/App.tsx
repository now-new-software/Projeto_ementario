import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { navigationItems } from './types/navigation'
import { CursosPage } from './pages/CursosPage'
import './App.css'

// Este arquivo define as rotas publicas do front-end.
// O layout principal e reutilizado em todas as paginas administrativas.
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/cursos" element={<CursosPage />} />

        {navigationItems
          .filter((item) => item.key !== 'dashboard')
          .map((item) => {
            return (
              <Route
                key={item.key}
                path={item.path}
                element={<PlaceholderPage title={item.label} description={item.description} />}
              />
            )
          })}
      </Route>

      {/* Fallback para qualquer URL invalida dentro do SPA */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
