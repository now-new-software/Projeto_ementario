export type StatTone = 'teal' | 'green' | 'amber'

interface StatCardProps {
  label: string
  value: number
  tone: StatTone
}

function ToneIcon({ tone }: { tone: StatTone }) {
  if (tone === 'green') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="m8.5 12.5 2.2 2.2 4.8-5.2" />
      </svg>
    )
  }

  if (tone === 'amber') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4.5 20 19H4z" />
        <path d="M12 9v4.5" />
        <circle cx="12" cy="16.6" r="0.9" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 6a1.5 1.5 0 0 1 1.5-1.5h12A1.5 1.5 0 0 1 19.5 6v12a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18z" />
      <path d="M9.5 8v8m5-8v8M7.5 10.5h9" />
    </svg>
  )
}

export function StatCard({ label, value, tone }: StatCardProps) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <div>
        <p className="stat-card__label">{label}</p>
        <p className="stat-card__value">{value}</p>
      </div>
      <span className="stat-card__icon">
        <ToneIcon tone={tone} />
      </span>
    </article>
  )
}
