import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loginUser, getUserRole, logoutUser } from '../../firebase/auth'
import AuthField from './AuthField'

const EmailIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const LockIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

function PasswordToggle({ show, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className="auth-field__toggle" aria-label={show ? 'Hide password' : 'Show password'}>
      {show ? (
        <svg className="w-[1.125rem] h-[1.125rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg className="w-[1.125rem] h-[1.125rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  )
}

export default function LoginForm({ onSwitchToRegister, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
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
    <motion.div
      className={`auth-form ${error ? 'shake' : ''}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="auth-form-header--mobile">
        <div className="auth-form-logo">
          <img src="/logo.png" alt="CCCCPGI" />
        </div>
        <div>
          <h2 className="auth-form-header__title text-xl">Welcome back</h2>
          <p className="auth-form-header__subtitle text-sm mt-0.5">Sign in to continue</p>
        </div>
      </div>

      <header className="auth-form-header hidden sm:block">
        <span className="auth-form-header__badge">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
          </svg>
          Secure sign in
        </span>
        <h2 className="auth-form-header__title">Welcome back</h2>
        <p className="auth-form-header__subtitle">Enter your credentials to access the church portal.</p>
      </header>

      {error && (
        <div className="auth-alert auth-alert--error" role="alert">
          <svg className="auth-alert__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@church.org"
          required
          autoComplete="email"
          icon={<EmailIcon />}
        />

        <div>
          <AuthField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            icon={<LockIcon />}
            suffix={<PasswordToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />}
          />
          <div className="flex justify-end mt-2">
            <button type="button" className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors">
              Forgot password?
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="auth-submit">
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Sign in
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>

      <div className="auth-divider">or</div>

      <p className="auth-switch">
        <button type="button" onClick={onSwitchToRegister}>
          Don&apos;t have an account?
          <span className="auth-switch__cta">Create one</span>
        </button>
      </p>
    </motion.div>
  )
}
