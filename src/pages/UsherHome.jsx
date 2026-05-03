import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/shared/Navbar'
import BottomNav from '../components/shared/BottomNav'
import ScannerDashboard from '../components/usher/ScannerDashboard'

const ScanHistory = () => (
  <div className="p-6 sm:p-8 animate-fadeInUp">
    <div className="flex items-center gap-2 mb-2">
      <div className="pulse-live" />
      <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Active Session</span>
    </div>
    <h1 className="font-playfair text-3xl font-bold text-slate-900 mb-2">Scan History</h1>
    <p className="text-sm text-slate-500 mb-8">Transactions recorded in your current session.</p>
    
    <div className="glass p-12 text-center rounded-[2rem] border border-white shadow-xl shadow-slate-200/40">
      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-100 text-3xl">
        📜
      </div>
      <h3 className="text-slate-800 font-bold mb-1">No transactions yet</h3>
      <p className="text-sm text-slate-400 max-w-[200px] mx-auto leading-relaxed">
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
    <div className="fixed inset-0 bg-slate-50 font-dmsans overflow-hidden flex flex-col">
      <Navbar user={user} role={role} />
      {/* Spacer to push content exactly below fixed Navbar */}
      <div className="h-16 shrink-0 w-full" />

      <main id="main-scroll-container" className="flex-1 overflow-y-auto relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-24">
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
