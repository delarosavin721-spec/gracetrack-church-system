import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, getUserRole } from '../../firebase/auth'

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
      
      onClose()
      
      if (userData?.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/usher')
      }
    } catch (err) {
      console.error("Login Error details:", err)
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.')
      } else if (err.message.includes('permissions') || err.code === 'permission-denied') {
        setError('Firebase Permission Error: Your Firestore database rules are blocking access. Please update your Firebase Rules.')
      } else {
        setError(`Error: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`w-full ${error ? 'shake' : ''}`}>
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 rounded-xl bg-teal-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-teal-600/20">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 2v6h-4v4h4v10h4v-10h4v-4h-4v-6h-4z"/>
          </svg>
        </div>
        <h2 className="font-playfair text-3xl text-gray-800 font-bold">Welcome Back</h2>
        <p className="text-gray-400 text-sm mt-1 font-dmsans">Sign in to your CCCCPGI account</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mb-6 text-center font-dmsans">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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

        <div className="flex justify-end">
          <button type="button" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-gold py-3.5 text-base mt-2 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
          ) : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 flex items-center gap-4 before:flex-1 before:h-px before:bg-gray-200 after:flex-1 after:h-px after:bg-gray-200">
        <span className="text-sm text-gray-400 font-dmsans">or</span>
      </div>

      <div className="mt-6 text-center">
        <button 
          onClick={onSwitchToRegister}
          className="text-gray-600 hover:text-teal-600 font-medium transition-colors font-dmsans"
        >
          Don't have an account? <span className="text-teal-600 font-semibold">Register →</span>
        </button>
      </div>
    </div>
  )
}
