import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { registerUser } from '../../firebase/auth'
import AuthField from './AuthField'

const UserIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

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

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const ScanIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 6v-2m0-14a2 2 0 100 4 2 2 0 000-4zm-8 8a2 2 0 100 4 2 2 0 000-4zm14-4a2 2 0 11-4 0 2 2 0 014 0zM6 12a2 2 0 11-4 0 2 2 0 014 0z" />
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

const ROLES = [
  {
    id: 'admin',
    title: 'Admin',
    desc: 'Dashboard, members & reports',
    icon: ShieldIcon,
  },
  {
    id: 'usher',
    title: 'Usher',
    desc: 'QR scan & service recording',
    icon: ScanIcon,
  },
]

const strengthConfig = [
  { label: 'Weak', color: '#EF4444', width: '33%' },
  { label: 'Fair', color: '#F59E0B', width: '66%' },
  { label: 'Strong', color: '#10B981', width: '100%' },
]

export default function RegisterForm({ onSwitchToLogin, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('usher')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      await registerUser(email, password, name, role)
      setSuccess(true)
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered.')
      } else if (err.message?.includes('permissions') || err.code === 'permission-denied') {
        setError('Firebase permission error: update your Firestore rules.')
      } else {
        setError(`Registration failed: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <motion.div
        className="auth-success"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="auth-success__ring">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="auth-success__title">You&apos;re all set!</h2>
        <p className="auth-success__text">
          Your account was created. An <strong>admin</strong> will review and approve your access shortly.
        </p>
        <button type="button" onClick={onSwitchToLogin} className="auth-submit w-full max-w-xs">
          Back to sign in
        </button>
      </motion.div>
    )
  }

  const strengthMeta = strength > 0 ? strengthConfig[strength - 1] : null

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
          <h2 className="auth-form-header__title text-xl">Create account</h2>
          <p className="auth-form-header__subtitle text-sm mt-0.5">Join your church team</p>
        </div>
      </div>

      <header className="auth-form-header">
        <span className="auth-form-header__badge hidden sm:inline-flex">
          New member
        </span>
        <h2 className="auth-form-header__title">Create your account</h2>
        <p className="auth-form-header__subtitle">
          Register as admin or usher. Admin approval may be required before access.
        </p>
      </header>

      {error && (
        <div className="auth-alert auth-alert--error" role="alert">
          <svg className="auth-alert__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          label="Full name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Juan Dela Cruz"
          required
          autoComplete="name"
          icon={<UserIcon />}
        />

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
            placeholder="At least 6 characters"
            required
            autoComplete="new-password"
            icon={<LockIcon />}
            suffix={<PasswordToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />}
          />
          {password.length > 0 && (
            <div className="auth-strength">
              <div className="auth-strength__track">
                <div
                  className="auth-strength__bar"
                  style={{
                    width: strengthMeta?.width || '12%',
                    background: strengthMeta?.color || '#EF4444',
                  }}
                />
              </div>
              {strengthMeta && (
                <p className="auth-strength__label" style={{ color: strengthMeta.color }}>
                  {strengthMeta.label} password
                </p>
              )}
            </div>
          )}
        </div>

        <AuthField
          label="Confirm password"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter your password"
          required
          autoComplete="new-password"
          icon={<LockIcon />}
        />

        <div>
          <span className="auth-field__label">Your role</span>
          <div className="auth-role-picker mt-2">
            {ROLES.map(({ id, title, desc, icon: Icon }) => (
              <label
                key={id}
                className={`auth-role-card ${role === id ? 'auth-role-card--active' : ''}`}
              >
                <input
                  type="radio"
                  name="role"
                  value={id}
                  checked={role === id}
                  onChange={() => setRole(id)}
                  className="sr-only"
                />
                <span className="auth-role-card__check" aria-hidden>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="auth-role-card__icon">
                  <Icon />
                </span>
                <span className="auth-role-card__title">{title}</span>
                <span className="auth-role-card__desc">{desc}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="auth-submit">
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Create account'
          )}
        </button>
      </form>

      <div className="auth-divider">or</div>

      <p className="auth-switch">
        <button type="button" onClick={onSwitchToLogin}>
          Already have an account?
          <span className="auth-switch__cta">Sign in</span>
        </button>
      </p>
    </motion.div>
  )
}
