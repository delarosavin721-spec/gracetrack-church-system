import { useEffect } from 'react'
import { Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/shared/Navbar'
import BottomNav from '../components/shared/BottomNav'
import Dashboard from '../components/admin/Dashboard'
import MembersTable from '../components/admin/MembersTableNew'
import TransactionsLog from '../components/admin/TransactionsLog'
import AttendanceTracker from '../components/admin/AttendanceTracker'
import Settings from '../components/admin/Settings'
import ReportsPanel from '../components/admin/ReportsPanel'
import UserManagement from '../components/admin/UserManagement'

const NAV_ITEMS = [
  {
    to: '/admin', end: true, label: 'Overview',
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    to: '/admin/members', label: 'Members',
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    to: '/admin/transactions', label: 'Tithes & Offerings',
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    to: '/admin/attendance', label: 'Attendance',
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    to: '/admin/reports', label: 'Reports',
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    to: '/admin/users', label: 'Users',
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    to: '/admin/settings', label: 'Settings', divider: true,
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
]

export default function AdminHome() {
  const { user, role } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const main = document.getElementById('main-scroll-container')
    if (main) main.scrollTop = 0
  }, [location.pathname])

  return (
    <div className="fixed inset-0 bg-slate-50 font-dmsans overflow-hidden flex flex-col">
      <Navbar user={user} role={role} />

      {/* Spacer to push content exactly below fixed Navbar */}
      <div className="h-16 shrink-0 w-full" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 h-full bg-white border-r border-slate-200 overflow-y-auto">
          <nav className="flex flex-col gap-0.5 p-3 pt-4 flex-1">
            {NAV_ITEMS.map(item => (
              <div key={item.to}>
                {item.divider && <div className="my-2 border-t border-slate-100" />}
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </div>
            ))}
          </nav>

          <div className="p-3 border-t border-slate-100">
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {user?.email?.[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-800 truncate">{user?.email?.split('@')[0]}</div>
                <div className="text-[10px] text-slate-400 truncate">{user?.email}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main id="main-scroll-container" className="flex-1 min-w-0 h-full overflow-y-auto pb-20 lg:pb-8 relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<MembersTable />} />
            <Route path="/transactions" element={<TransactionsLog />} />
            <Route path="/attendance" element={<AttendanceTracker />} />
            <Route path="/reports" element={<ReportsPanel />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>

      <BottomNav role={role} />
    </div>
  )
}
