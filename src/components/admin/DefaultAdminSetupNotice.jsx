import { useState, useEffect } from 'react'
import { getDefaultAdminCredentials, clearDefaultAdminCredentials } from '../../firebase/defaultAdminSetup'

export default function DefaultAdminSetupNotice() {
  const [credentials, setCredentials] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const creds = getDefaultAdminCredentials()
    setCredentials(creds)
  }, [])

  if (!credentials) {
    return null
  }

  const handleCopy = () => {
    const text = `Email: ${credentials.email}\nPassword: ${credentials.password}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDismiss = () => {
    clearDefaultAdminCredentials()
    setCredentials(null)
  }

  return (
    <div className="fixed top-4 right-4 max-w-md bg-white rounded-lg shadow-xl border-l-4 border-green-500 p-5 z-50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 font-bold text-lg">✓</span>
          </div>
          <h3 className="font-bold text-slate-800">System Admin Account Created</h3>
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-slate-600 text-xl"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3 bg-slate-50 p-4 rounded mb-4">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Email</p>
          <p className="text-sm font-mono text-slate-800">{credentials.email}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Password</p>
          <p className="text-sm font-mono text-slate-800">{credentials.password}</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-4">
        <p className="text-xs text-amber-800">
          <strong>⚠️ Important:</strong> This is your system administrator account. Change the password immediately after first login.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 btn-primary bg-blue-600 hover:bg-blue-700 text-sm"
        >
          {copied ? '✓ Copied' : 'Copy Credentials'}
        </button>
        <button
          onClick={handleDismiss}
          className="flex-1 btn-secondary text-sm"
        >
          Got It
        </button>
      </div>
    </div>
  )
}
