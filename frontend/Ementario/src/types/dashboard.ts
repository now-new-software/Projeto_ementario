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
}

export interface DashboardResponse {
  last_sync: string | null
  metrics: DashboardMetrics
  recent_activity: ActivityItem[]
}
