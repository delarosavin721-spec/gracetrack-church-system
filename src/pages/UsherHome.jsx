import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/shared/Navbar'
import BottomNav from '../components/shared/BottomNav'
import ScannerDashboard from '../components/usher/ScannerDashboard'
import PageHeader from '../components/shared/PageHeader'

const ScanHistory = () => (
  <div className="page-content max-w-2xl">
    <PageHeader
      eyebrow="live"
      title="Scan History"
      description="Transactions recorded in your current session."
    />
    <div className="premium-card p-12 text-center">
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl bg-slate-50 border border-slate-100">
        📜
      </div>
      <h3 className="text-slate-800 font-bold text-lg mb-2">No transactions yet</h3>
      <p className="text-sm text-slate-400 max-w-[220px] mx-auto leading-relaxed">
        Start scanning member QR codes to see them listed here.
      </p>
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
        <div className="max-w-lg mx-auto">
          <Routes>
            <Route path="/" element={<ScannerDashboard />} />
            <Route path="/history" element={<ScanHistory />} />
            <Route path="*" element={<Navigate to="/usher" replace />} />
          </Routes>
        </div>
      </main>

      <BottomNav role={role} />
    </div>
  )
}
