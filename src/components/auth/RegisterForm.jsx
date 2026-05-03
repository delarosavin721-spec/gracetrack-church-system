import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../firebase/auth'

export default function RegisterForm({ onSwitchToLogin, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('usher')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Password strength logic
  const [strength, setStrength] = useState(0)
  
  useEffect(() => {
    let s = 0
    if (password.length > 5) s++
    if (password.length > 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    setStrength(Math.min(3, Math.floor(s / 1.5)))
  }, [password])

  const getStrengthClass = () => {
    if (strength === 0) return ''
    if (strength === 1) return 'strength-weak'
    if (strength === 2) return 'strength-medium'
    return 'strength-strong'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await registerUser(email, password, name, role)
      setSuccess(true)
      // We don't close or navigate yet, let them read the message
    } catch (err) {
      console.error("Registration Error details:", err)
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered.')
      } else if (err.message.includes('permissions') || err.code === 'permission-denied') {
        setError('Firebase Permission Error: Your Firestore rules block creating users. Please update your Firebase Rules.')
      } else {
        setError(`Registration failed: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const [success, setSuccess] = useState(false)

  if (success) {
    return (
      <div className="flex flex-col items-center py-8 text-center animate-fadeInUp">
        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-6 border border-teal-100 success-icon">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-playfair text-3xl font-bold text-slate-800 mb-3">Registration Sent!</h2>
        <p className="text-slate-500 font-dmsans max-w-[300px] leading-relaxed mb-8">
          Your account has been created. Please wait for an <span className="text-teal-600 font-bold uppercase">Admin</span> to approve your access.
        </p>
        <button 
          onClick={onSwitchToLogin}
          className="btn-primary w-full py-3.5"
        >
          Back to Sign In
        </button>
      </div>
    )
  }

  return (
    <div className={`w-full ${error ? 'shake' : ''}`}>
      <div className="flex flex-col items-center mb-6">
        <h2 className="font-playfair text-3xl text-gray-800 font-bold mb-2">Join Your Church</h2>
        <p className="text-gray-400 font-outfit text-sm">Create an account to manage God's house</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mb-6 text-center font-dmsans">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5 font-dmsans">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Dela Cruz"
            required
            className="input-dark"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5 font-dmsans">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@church.org"
            required
            className="input-dark"
          />
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 mb-1.5 font-dmsans">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="input-dark pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            )}
          </button>
        </div>

        {/* Password Strength */}
        {password.length > 0 && (
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-300 ${getStrengthClass()}`} />
          </div>
        )}

        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 mb-1.5 font-dmsans">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="input-dark pr-12"
          />
        </div>

        <div className="flex items-center gap-4 py-2">
          <span className="text-gray-700 font-medium text-sm">Role:</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="role" 
              value="admin" 
              checked={role === 'admin'} 
              onChange={() => setRole('admin')}
              className="accent-teal-600 w-4 h-4"
            />
            <span className={`text-sm font-medium ${role === 'admin' ? 'text-teal-700' : 'text-gray-500'}`}>Admin</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="role" 
              value="usher" 
              checked={role === 'usher'} 
              onChange={() => setRole('usher')}
              className="accent-teal-600 w-4 h-4"
            />
            <span className={`text-sm font-medium ${role === 'usher' ? 'text-teal-700' : 'text-gray-500'}`}>Usher</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-gold py-3.5 text-base mt-4 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
          ) : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button 
          onClick={onSwitchToLogin}
          className="text-gray-600 hover:text-teal-600 font-medium transition-colors font-dmsans"
        >
          Already have an account? <span className="text-teal-600 font-semibold">Sign In →</span>
        </button>
      </div>
    </div>
  )
}
