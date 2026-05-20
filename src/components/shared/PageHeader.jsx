export default function PageHeader({ eyebrow, title, description, badge, action, children }) {
  return (
    <header className="page-header">
      <div className="page-header__content flex-1 min-w-0">
        {(eyebrow || badge) && (
          <div className="page-header__meta">
            {eyebrow && (
              <span className="page-header__badge-pill">
                {eyebrow === 'live' ? (
                  <>
                    <span className="pulse-live" />
                    Live
                  </>
                ) : (
                  eyebrow
                )}
              </span>
            )}
            {badge}
          </div>
        )}
        <h1 className="page-header__title">{title}</h1>
        {description && <p className="page-header__desc">{description}</p>}
        {children}
      </div>
      {action && <div className="page-header__action w-full sm:w-auto">{action}</div>}
    </header>
  )
}
