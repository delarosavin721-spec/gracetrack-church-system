import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/shared/Navbar'
import BottomNav from '../components/shared/BottomNav'
import ScannerDashboard from '../components/usher/ScannerDashboard'
import PageHeader from '../components/shared/PageHeader'

const ScanHistory = () => (
  <div className="page-content usher-page">
    <PageHeader
      eyebrow="live"
      title="Scan History"
      description="Transactions recorded in your current session."
    />
    <div className="panel">
      <div className="empty-state py-16">
        <div className="empty-state__icon">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="empty-state__title">No transactions yet</h3>
        <p className="empty-state__desc">
          Start scanning member QR codes to see them listed here.
        </p>
      </div>
    </div>
  </div>
)

export default function UsherHome() {
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

      <main id="main-scroll-container" className="app-main">
        <Routes>
          <Route path="/" element={<ScannerDashboard />} />
          <Route path="/history" element={<ScanHistory />} />
          <Route path="*" element={<Navigate to="/usher" replace />} />
        </Routes>
      </main>

      <BottomNav role={role} />
    </div>
  )
}
