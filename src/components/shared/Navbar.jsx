import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../firebase/auth'

export default function Navbar({ user, role }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="h-full max-w-screen-2xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => navigate(role === 'admin' ? '/admin' : '/usher')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-md shadow-teal-200 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 2v6h-4v4h4v10h4v-10h4v-4h-4v-6h-4z" />
            </svg>
          </div>
          <span className="font-playfair font-bold text-xl text-slate-900 tracking-wide">GraceTrack</span>
        </button>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Role badge */}
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest border border-teal-100">
            {role}
          </span>

          {/* User info */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-800 leading-tight">{user?.email?.split('@')[0]}</span>
            <span className="text-xs text-slate-400 leading-tight">{user?.email}</span>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-slate-200 hidden sm:block" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors group"
          >
            <span className="hidden sm:inline">Sign Out</span>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
