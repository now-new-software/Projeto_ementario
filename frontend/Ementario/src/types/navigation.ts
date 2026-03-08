export type NavigationKey = 'dashboard' | 'cursos' | 'configuracoes' | 'status-api'
export type NavigationSection = 'Navegacao' | 'Sistema'

export interface NavigationItem {
  key: NavigationKey
  label: string
  section: NavigationSection
}

export const navigationItems: NavigationItem[] = [
  { key: 'dashboard', label: 'Dashboard', section: 'Navegacao' },
  { key: 'cursos', label: 'Cursos', section: 'Navegacao' },
  { key: 'status-api', label: 'Status da API', section: 'Sistema' },
  { key: 'configuracoes', label: 'Configuracoes', section: 'Sistema' },
]
