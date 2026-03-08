import type { ActivityItem } from '../../types/dashboard'

interface RecentActivityPanelProps {
  items: ActivityItem[]
  isLoading?: boolean
}

export function RecentActivityPanel({ items, isLoading = false }: RecentActivityPanelProps) {
  return (
    <section className="activity-panel">
      <header className="activity-panel__header">
        <h2>Atividade Recente</h2>
        <button type="button" className="activity-panel__view-all">
          Ver todos
          <span aria-hidden="true">→</span>
        </button>
      </header>

      <ul className="activity-list">
        {isLoading ? (
          <li className="activity-list__placeholder">Carregando atividades recentes...</li>
        ) : null}

        {!isLoading && items.length === 0 ? (
          <li className="activity-list__placeholder">Nenhuma atividade recente encontrada.</li>
        ) : null}

        {items.map((item) => (
          <li key={item.code} className="activity-list__item">
            <div>
              <p className="activity-list__title">
                <span className="activity-list__code">{item.code}</span>
                {item.title}
              </p>
              <p className="activity-list__subtitle">{item.area}</p>
            </div>
            <span className={`status-badge status-badge--${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
