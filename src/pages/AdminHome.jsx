import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/shared/Navbar'
import BottomNav from '../components/shared/BottomNav'
import AppSidebar from '../components/shared/AppSidebar'
import Dashboard from '../components/admin/Dashboard'
import MembersTable from '../components/admin/MembersTableNew'
import TransactionsLog from '../components/admin/TransactionsLog'
import AttendanceTracker from '../components/admin/AttendanceTracker'
import Settings from '../components/admin/Settings'
import ReportsPanel from '../components/admin/ReportsPanel'
import UserManagement from '../components/admin/UserManagement'

export default function AdminHome() {
  const { user, role } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const main = document.getElementById('main-scroll-container')
    if (main) main.scrollTop = 0
  }, [location.pathname])

  return (
    <div className="app-shell">
      <Navbar user={user} role={role} />
      <div className="h-16 shrink-0 w-full" />

      <div className="flex flex-1 overflow-hidden relative z-[1]">
        <AppSidebar user={user} />

        <main id="main-scroll-container" className="app-main flex-1 min-w-0 h-full">
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
