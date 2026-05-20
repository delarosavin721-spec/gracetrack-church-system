export default function PageHeader({ eyebrow, title, description, badge, action, children }) {
  return (
    <div className="page-header">
      <div className="page-header__content">
        {(eyebrow || badge) && (
          <div className="page-header__meta">
            {eyebrow && (
              <span className="section-eyebrow">
                {eyebrow === 'live' ? (
                  <>
                    <span className="pulse-live" />
                    Live System
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
      {action && <div className="page-header__action">{action}</div>}
    </div>
  )
}
