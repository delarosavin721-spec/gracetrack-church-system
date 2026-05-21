import { useState } from 'react'
import { setupDefaultAdminManually } from '../../firebase/defaultAdminSetup'

export default function AdminSetupTroubleshoot() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleManualSetup = async () => {
    setLoading(true)
    setMessage('Setting up default admin account...')
    
    try {
      const result = await setupDefaultAdminManually()
      if (result.success) {
        setMessage(`✅ Success! Email: ${result.email}`)
      } else {
        setMessage('Account may already exist. Try logging in or contact support.')
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 max-w-xs bg-white rounded-lg shadow-lg border border-slate-200 p-4 z-50">
      <h3 className="font-bold text-sm text-slate-800 mb-3">Admin Setup Troubleshoot</h3>
      
      <div className="space-y-2 mb-3">
        <p className="text-xs text-slate-600">
          If you can't log in, click the button below to manually create the default admin account.
        </p>
        <div className="bg-slate-100 p-2 rounded text-xs text-slate-700 font-mono">
          <p>📧 admin@churchsystem.com</p>
          <p>🔑 Admin@123Church</p>
        </div>
      </div>

      <button
        onClick={handleManualSetup}
        disabled={loading}
        className="w-full btn-primary bg-teal-600 hover:bg-teal-700 text-sm"
      >
        {loading ? '⏳ Setting up...' : '🔧 Setup Admin Account'}
      </button>

      {message && (
        <p className={`text-xs mt-2 ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
