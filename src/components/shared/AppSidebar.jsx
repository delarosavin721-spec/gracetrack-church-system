import { NavLink } from 'react-router-dom'
import { ADMIN_NAV_MAIN, ADMIN_NAV_SYSTEM } from '../../config/adminNav'

function NavSection({ title, items }) {
  return (
    <>
      <p className="app-sidebar__section">{title}</p>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            title={item.description}
            className={({ isActive }) => `app-sidebar__link ${isActive ? 'app-sidebar__link--active' : ''}`}
          >
            <span className="app-sidebar__link-icon">{item.icon}</span>
            <span className="app-sidebar__link-text">
              <span className="app-sidebar__link-label">{item.label}</span>
              <span className="app-sidebar__link-desc">{item.description}</span>
            </span>
          </NavLink>
        ))}
      </div>
    </>
  )
}

export default function AppSidebar({ user }) {
  const displayName = user?.email?.split('@')[0] || 'Admin'
  const initial = user?.email?.[0]?.toUpperCase() || 'A'

  return (
    <aside className="app-sidebar hidden lg:flex flex-col w-[17.5rem] shrink-0 h-full overflow-hidden">
      <div className="app-sidebar__brand">
        <div className="flex items-center gap-2.5">
          <div className="app-sidebar__logo">
            <img src="/logo.png" alt="" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="font-playfair font-bold text-white text-base leading-tight">CCCCPGI</p>
            <p className="text-[10px] text-teal-400/90 font-bold uppercase tracking-[0.18em]">Admin Portal</p>
          </div>
        </div>
        <div className="app-sidebar__live mt-4">
          <span className="pulse-live" />
          <span>Live sync</span>
        </div>
      </div>

      <nav className="app-sidebar__nav flex-1 overflow-y-auto">
        <NavSection title="Main" items={ADMIN_NAV_MAIN} />
        <NavSection title="System" items={ADMIN_NAV_SYSTEM} />
      </nav>

      <div className="app-sidebar__user">
        <div className="app-sidebar__avatar">{initial}</div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-100 truncate">{displayName}</p>
          <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
        </div>
        <span className="app-sidebar__role">Admin</span>
      </div>
    </aside>
  )
}
