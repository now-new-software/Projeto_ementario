import { navigationItems, type NavigationKey, type NavigationSection } from '../../types/navigation'

interface SidebarProps {
  activeItem: NavigationKey
  onSelect: (key: NavigationKey) => void
}

const sidebarSections: NavigationSection[] = ['Navegacao', 'Sistema']

function NavIcon({ itemKey }: { itemKey: NavigationKey }) {
  if (itemKey === 'dashboard') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    )
  }

  if (itemKey === 'cursos') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 6.5a1.5 1.5 0 0 1 1.5-1.5H19a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5z" />
        <path d="M9 5v14" />
      </svg>
    )
  }

  if (itemKey === 'status-api') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 12h4l2-4 3 10 2-6h7" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 3h4l.6 2.2a7.4 7.4 0 0 1 1.8 1l2.2-.8 2 3.4-1.7 1.6a7.7 7.7 0 0 1 0 2.1l1.7 1.6-2 3.4-2.2-.8a7.4 7.4 0 0 1-1.8 1L14 21h-4l-.6-2.2a7.4 7.4 0 0 1-1.8-1l-2.2.8-2-3.4 1.7-1.6a7.7 7.7 0 0 1 0-2.1L3.4 9.9l2-3.4 2.2.8a7.4 7.4 0 0 1 1.8-1z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  )
}

export function Sidebar({ activeItem, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand__logo">AE</div>
        <div>
          <h1 className="brand__title">APIEmentario</h1>
          <p className="brand__subtitle">UFAC v1.0</p>
        </div>
      </div>

      {sidebarSections.map((section) => (
        <section key={section} className="sidebar__group">
          <h2 className="sidebar__group-title">{section}</h2>
          <div className="sidebar__links">
            {navigationItems
              .filter((item) => item.section === section)
              .map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`sidebar__link ${item.key === activeItem ? 'is-active' : ''}`}
                  onClick={() => onSelect(item.key)}
                  aria-current={item.key === activeItem ? 'page' : undefined}
                >
                  <span className="sidebar__link-icon">
                    <NavIcon itemKey={item.key} />
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
          </div>
        </section>
      ))}

      <div className="sidebar__status-card">
        <div>
          <p className="sidebar__status-title">Selenium Scraper</p>
          <p className="sidebar__status-subtitle">Online</p>
        </div>
        <span className="sidebar__status-dot" aria-hidden="true" />
      </div>
    </aside>
  )
}
