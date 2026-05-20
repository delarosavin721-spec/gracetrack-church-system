import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, getUserRole, logoutUser } from '../../firebase/auth'

export default function LoginForm({ onSwitchToRegister, onClose }) {
  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const userCredential = await loginUser(email, password)
      const userData = await getUserRole(userCredential.user.uid)
      if (userData && userData.active === false) {
        await logoutUser()
        setError('Your account is pending approval by an admin.')
        setLoading(false)
        return
      }
      onClose()
      navigate(userData?.role === 'admin' ? '/admin' : '/usher')
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.')
      } else if (err.message?.includes('permissions') || err.code === 'permission-denied') {
        setError('Permission denied. Check your Firebase Rules.')
      } else {
        setError(`Error: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`w-full ${error ? 'shake' : ''}`}>

      <div className="mb-8 sm:hidden">
        <h2 className="font-playfair text-2xl text-slate-900 font-bold">Welcome Back</h2>
        <p className="text-slate-400 text-sm mt-1">Sign in to your account</p>
      </div>
      <div className="hidden sm:block mb-6">
        <h2 className="font-playfair text-2xl text-slate-900 font-bold">Sign In</h2>
        <p className="text-slate-400 text-sm mt-1">Access your church portal</p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-600 p-3.5 rounded-xl text-sm mb-5 font-dmsans">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
          <div className="input-group">
            <svg className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@church.org" required
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
          <div className="input-group">
            <svg className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required
              className="input pr-12"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1">
              {showPassword
                ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              }
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors">
            Forgot Password?
          </button>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 text-base mt-2 disabled:opacity-60">
          {loading
            ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
            : <>
                Sign In
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </>
          }
        </button>
      </form>

      {/* Divider */}
      <div className="mt-7 flex items-center gap-3 before:flex-1 before:h-px before:bg-slate-100 after:flex-1 after:h-px after:bg-slate-100">
        <span className="text-xs text-slate-400 font-medium">or</span>
      </div>

      <div className="mt-5 text-center">
        <button onClick={onSwitchToRegister} className="text-sm text-slate-500 hover:text-teal-600 font-medium transition-colors font-dmsans">
          Don't have an account?{' '}
          <span className="text-teal-600 font-bold">Register here →</span>
        </button>
      </div>
    </div>
  )
}
