import { useState, useEffect } from 'react'
import { getChurchSettings, updateChurchSettings } from '../../firebase/firestore'

function Toggle({ checked, onChange, label, desc }) {
  return (
    <label className="flex items-center gap-4 cursor-pointer p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/60 transition-colors">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none
          ${checked ? 'bg-teal-500' : 'bg-slate-200'}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform
            ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
      <div>
        <div className="text-sm font-semibold text-slate-800">{label}</div>
        <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
      </div>
    </label>
  )
}

export default function Settings() {
  const [settings, setSettings] = useState({
    churchName: '', serviceTime: '', fridayStudyTime: '', location: '', emailEnabled: true,
  })
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [status,  setStatus]  = useState(null) // null | 'success' | 'error'

  useEffect(() => {
    const load = async () => {
      try { const d = await getChurchSettings(); if (d) setSettings(d) }
      catch (err) { console.error(err) }
      finally { setLoading(false) }
    }
    load()
  }, [])

  const set = field => e => setSettings(s => ({ ...s, [field]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSaving(true); setStatus(null)
    try {
      await updateChurchSettings(settings)
      setStatus('success')
      setTimeout(() => setStatus(null), 3000)
    } catch (err) {
      console.error(err); setStatus('error')
    } finally { setSaving(false) }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="flex flex-col items-center gap-3">
        <div className="spinner" /><p className="text-sm text-slate-400 animate-pulse">Loading settings...</p>
      </div>
    </div>
  )

  return (
    <div className="page-content space-y-6">
      <div>
        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure global church preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Church Info */}
        <div className="card-flat p-6 space-y-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Church Information</p>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Church Name</label>
            <input type="text" value={settings.churchName || ''} onChange={set('churchName')} placeholder="My Church" className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Location / Address</label>
            <input type="text" value={settings.location || ''} onChange={set('location')} placeholder="123 Main St, City, Province" className="input" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Sunday Service Time</label>
              <input type="text" value={settings.serviceTime || ''} onChange={set('serviceTime')} placeholder="e.g., 9:00 AM" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Friday Study Time</label>
              <input type="text" value={settings.fridayStudyTime || ''} onChange={set('fridayStudyTime')} placeholder="e.g., 6:00 PM" className="input" />
            </div>
          </div>
        </div>

        {/* Automation */}
        <div className="card-flat p-6 space-y-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Automation</p>
          <Toggle
            checked={settings.emailEnabled}
            onChange={v => setSettings(s => ({ ...s, emailEnabled: v }))}
            label="Enable Automated Emails"
            desc="Send daily devotionals and post-offering thank you emails to members"
          />
        </div>

        {/* Status message */}
        {status === 'success' && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium animate-fadeInUp">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Settings saved successfully.
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Failed to save. Please try again.
          </div>
        )}

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary gap-2 px-8 py-2.5 disabled:opacity-60">
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
