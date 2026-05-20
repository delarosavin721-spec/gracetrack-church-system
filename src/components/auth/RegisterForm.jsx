import { useState, useEffect } from 'react'
import { registerUser } from '../../firebase/auth'

export default function RegisterForm({ onSwitchToLogin, onClose }) {
  const [name,            setName]            = useState('')
  const [email,           setEmail]           = useState('')
  const [password,        setPassword]        = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role,            setRole]            = useState('usher')
  const [showPassword,    setShowPassword]    = useState(false)
  const [loading,         setLoading]         = useState(false)
  const [error,           setError]           = useState('')
  const [success,         setSuccess]         = useState(false)
  const [strength,        setStrength]        = useState(0)

  useEffect(() => {
    let s = 0
    if (password.length > 5) s++
    if (password.length > 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    setStrength(Math.min(3, Math.floor(s / 1.5)))
  }, [password])

  const strengthConfig = [
    { label: 'Weak',   color: '#EF4444', width: '33%' },
    { label: 'Fair',   color: '#F59E0B', width: '66%' },
    { label: 'Strong', color: '#10B981', width: '100%' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await registerUser(email, password, name, role)
      setSuccess(true)
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered.')
      } else if (err.message?.includes('permissions') || err.code === 'permission-denied') {
        setError('Firebase Permission Error: Update your Firestore Rules.')
      } else {
        setError(`Registration failed: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center py-8 text-center animate-fadeInUp">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 success-icon"
          style={{ background: 'linear-gradient(135deg, #0CBFC7 0%, #0891b2 100%)', boxShadow: '0 12px 30px rgba(12,191,199,0.3)' }}>
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-playfair text-3xl font-bold text-slate-800 mb-3">Registration Sent!</h2>
        <p className="text-slate-500 font-dmsans max-w-[300px] leading-relaxed mb-8">
          Your account has been created. Please wait for an{' '}
          <span className="text-teal-600 font-bold uppercase">Admin</span> to approve your access.
        </p>
        <button onClick={onSwitchToLogin} className="btn-primary w-full py-3.5 text-base">
          Back to Sign In
        </button>
      </div>
    )
  }

  return (
    <div className={`w-full ${error ? 'shake' : ''}`}>
      <div className="mb-6">
        <h2 className="font-playfair text-2xl text-slate-900 font-bold">Create Account</h2>
        <p className="text-slate-400 text-sm mt-1">Join as admin or usher — approval may be required</p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-600 p-3.5 rounded-xl text-sm mb-5">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Juan Dela Cruz" required className="input-dark pl-10" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@church.org" required className="input-dark pl-10" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input type={showPassword ? "text" : "password"} value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required className="input-dark pl-10 pr-12" />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1">
              {showPassword
                ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              }
            </button>
          </div>

          {/* Password Strength */}
          {password.length > 0 && (
            <div className="mt-2 space-y-1">
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: strengthConfig[strength - 1]?.width || '10%',
                    background: strengthConfig[strength - 1]?.color || '#EF4444'
                  }} />
              </div>
              {strength > 0 && (
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: strengthConfig[strength - 1]?.color }}>
                  {strengthConfig[strength - 1]?.label} password
                </p>
              )}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm Password</label>
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <input type={showPassword ? "text" : "password"} value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••" required className="input-dark pl-10" />
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Account Role</label>
          <div className="grid grid-cols-2 gap-3">
            {['admin', 'usher'].map(r => (
              <label key={r}
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  role === r
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                }`}>
                <input type="radio" name="role" value={r} checked={role === r}
                  onChange={() => setRole(r)} className="sr-only" />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  role === r ? 'border-teal-500 bg-teal-500' : 'border-slate-300'
                }`}>
                  {role === r && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-sm font-bold capitalize">{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading}
          className="w-full py-3.5 text-base font-bold text-white rounded-xl transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #0CBFC7 0%, #0891b2 100%)', boxShadow: '0 4px 15px rgba(12,191,199,0.3)' }}>
          {loading
            ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
            : 'Create Account'
          }
        </button>
      </form>

      <div className="mt-5 text-center">
        <button onClick={onSwitchToLogin} className="text-sm text-slate-500 hover:text-teal-600 font-medium transition-colors">
          Already have an account?{' '}
          <span className="text-teal-600 font-bold">Sign In →</span>
        </button>
      </div>
    </div>
  )
}
