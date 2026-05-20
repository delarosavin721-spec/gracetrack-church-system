import { useNavigate, useLocation } from 'react-router-dom'
import { ADMIN_NAV_MAIN, ADMIN_NAV_SYSTEM } from '../../config/adminNav'

const USHER_TABS = [
  {
    path: '/usher/history',
    label: 'History',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    path: '/usher',
    label: 'Scan',
    end: true,
    center: true,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

function AdminBottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const tabs = [
    ADMIN_NAV_MAIN[0],
    ADMIN_NAV_MAIN[1],
    ADMIN_NAV_MAIN[2],
    ADMIN_NAV_MAIN[3],
    { ...ADMIN_NAV_SYSTEM[1], shortLabel: 'More' },
  ]

  const isActive = (tab) =>
    tab.end ? location.pathname === tab.path : location.pathname.startsWith(tab.path)

  return (
    <>
      {tabs.map((tab) => {
        const active = isActive(tab)
        return (
          <button
            key={tab.path}
            type="button"
            onClick={() => navigate(tab.path)}
            className={`bottom-nav-tab ${active ? 'active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {tab.icon}
            <span>{tab.shortLabel || tab.label}</span>
          </button>
        )
      })}
    </>
  )
}

function UsherBottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      {USHER_TABS.map((tab) => {
        const active = tab.end
          ? location.pathname === tab.path
          : location.pathname.startsWith(tab.path)

        if (tab.center) {
          return (
            <button
              key={tab.path}
              type="button"
              onClick={() => navigate(tab.path)}
              className={`bottom-nav-tab bottom-nav-tab--scan ${active ? 'active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className="bottom-nav-tab__fab">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          )
        }

        return (
          <button
            key={tab.path}
            type="button"
            onClick={() => navigate(tab.path)}
            className={`bottom-nav-tab ${active ? 'active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        )
      })}
    </>
  )
}

export default function BottomNav({ role }) {
  return (
    <nav className="bottom-nav-dock lg:hidden" aria-label="Mobile navigation">
      <div className="bottom-nav-dock__inner">
        {role === 'admin' ? <AdminBottomNav /> : <UsherBottomNav />}
      </div>
    </nav>
  )
}
