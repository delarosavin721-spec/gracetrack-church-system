import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../firebase/auth'

export default function Navbar({ user, role }) {
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)
  const isAdmin = role === 'admin'
  const homePath = isAdmin ? '/admin' : '/usher'

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logoutUser()
      navigate('/')
    } catch (err) {
      console.error(err)
      setLoggingOut(false)
    }
  }

  return (
    <header className="app-topbar">
      <div className="app-topbar__inner">
        <button
          type="button"
          onClick={() => navigate(homePath)}
          className="flex items-center gap-3 group min-w-0"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white/10 border border-white/15 group-hover:border-teal-500/40 group-hover:bg-white/15 transition-all p-1 shrink-0">
            <img src="/logo.png" alt="CCCCPGI Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="font-playfair font-bold text-base text-white leading-none tracking-tight truncate">
              CCCCPGI
            </span>
            <span className="text-[10px] text-teal-400 uppercase tracking-[0.16em] font-bold leading-none mt-1 truncate">
              {isAdmin ? 'Admin Portal' : 'Usher Station'}
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span
            className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border"
            style={{
              background: isAdmin ? 'rgba(12,191,199,0.12)' : 'rgba(99,102,241,0.12)',
              color: isAdmin ? '#5EEAD4' : '#C7D2FE',
              borderColor: isAdmin ? 'rgba(12,191,199,0.25)' : 'rgba(99,102,241,0.25)',
            }}
          >
            {role}
          </span>

          <div className="hidden md:flex items-center gap-2.5 pl-2.5 pr-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08]">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ background: 'linear-gradient(135deg, #0CBFC7, #6366F1)' }}
            >
              {user?.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white leading-tight truncate max-w-[140px]">
                {user?.email?.split('@')[0]}
              </span>
              <span className="text-[10px] text-slate-500 leading-tight truncate max-w-[140px]">
                {user?.email}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50 px-3 py-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <span className="hidden sm:inline">{loggingOut ? 'Signing out…' : 'Sign out'}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
