import { useState, useEffect } from 'react'
import { getMember, checkDuplicate, addTransaction } from '../../firebase/firestore'
import { useAuth } from '../../hooks/useAuth'
import { getCurrentWeekCode } from '../../utils/weekCode'

export default function AmountEntry({ data, onComplete, onCancel }) {
  const { user }     = useAuth()
  const [member,     setMember]     = useState(null)
  const [titheAmount, setTitheAmount] = useState('')
  const [offeringAmount, setOfferingAmount] = useState('')
  const [note,       setNote]       = useState('')
  const [loading,    setLoading]    = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState('')
  const [success,    setSuccess]    = useState(false)

  const effectiveWeekCode = data.weekCode === 'AUTO' ? getCurrentWeekCode() : data.weekCode

  useEffect(() => {
    const init = async () => {
      try {
        const m = await getMember(data.memberId)
        if (!m) { 
          setError('Member not found. Please ensure the QR code is correct.'); 
          setLoading(false); 
          return 
        }
        setMember(m)
      } catch (err) { 
        console.error(err); 
        setError('Error fetching data.') 
      }
      finally { setLoading(false) }
    }
    init()
  }, [data, effectiveWeekCode])

  const handleSubmit = async e => {
    e.preventDefault()
    
    const tithe = parseFloat(titheAmount) || 0
    const offering = parseFloat(offeringAmount) || 0

    if (tithe <= 0 && offering <= 0) {
      setError('Please enter an amount for Tithe or Offering.');
      return
    }

    setSubmitting(true); setError('')
    
    try {
      const dateStr = new Date().toISOString().split('T')[0]
      const promises = []

      if (tithe > 0) {
        promises.push(addTransaction({
          memberId: data.memberId, memberName: member.name,
          type: 'tithe', amount: tithe,
          weekCode: effectiveWeekCode, date: dateStr,
          submittedBy: user.uid, note: note || null, status: 'completed'
        }))
      }

      if (offering > 0) {
        promises.push(addTransaction({
          memberId: data.memberId, memberName: member.name,
          type: 'offering', amount: offering,
          weekCode: effectiveWeekCode, date: dateStr,
          submittedBy: user.uid, note: note || null, status: 'completed'
        }))
      }

      await Promise.all(promises)
      setSuccess(true)
      setTimeout(onComplete, 2000)
    } catch (err) {
      console.error(err); 
      setError('Failed to submit. Please try again.')
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="spinner" /><p className="text-sm text-slate-400 animate-pulse">Looking up member...</p>
      </div>
    </div>
  )

  if (success) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fadeInUp">
      <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center mb-5 success-icon shadow-xl shadow-teal-200">
        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-playfair text-3xl font-bold text-slate-900 mb-2">Saved Successfully!</h2>
      <p className="text-slate-500 font-dmsans">Record updated for <span className="font-bold text-slate-800">{member?.name}</span></p>
    </div>
  )

  return (
    <div className="max-w-md mx-auto animate-fadeInUp px-4 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onCancel} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Cancel
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Live Entry</span>
        </div>
      </div>

      <div className="card-flat overflow-hidden border-t-8 border-t-teal-600">
        {/* Member Profile */}
        <div className="px-6 py-6 border-b border-slate-100 bg-slate-50/30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-100 shrink-0">
              {member?.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="font-playfair text-2xl font-bold text-slate-900 truncate">{member?.name}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Week Code:</span>
                <span className="text-xs font-mono font-bold text-teal-600">{effectiveWeekCode}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold animate-shake">{error}</div>}

          {/* Amount Inputs */}
          <div className="space-y-4">
            {/* Tithe */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tithes (Ikapu)</label>
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">10% Default</span>
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold group-focus-within:text-teal-600 transition-colors">₱</span>
                <input
                  type="number" step="0.01" min="0"
                  value={titheAmount} onChange={e => setTitheAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full border-2 border-slate-100 focus:border-teal-500 rounded-2xl py-4 pl-10 pr-4 text-2xl font-bold font-outfit text-slate-900 transition-all outline-none bg-slate-50/50 focus:bg-white"
                  autoFocus
                />
              </div>
            </div>

            {/* Offering */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Offering (Handog)</label>
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold group-focus-within:text-indigo-600 transition-colors">₱</span>
                <input
                  type="number" step="0.01" min="0"
                  value={offeringAmount} onChange={e => setOfferingAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full border-2 border-slate-100 focus:border-indigo-500 rounded-2xl py-4 pl-10 pr-4 text-2xl font-bold font-outfit text-slate-900 transition-all outline-none bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <label className="px-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add Remark (Optional)</label>
            <input
              type="text" value={note} onChange={e => setNote(e.target.value)}
              placeholder="e.g. For Mission Fund" 
              className="w-full border-2 border-slate-100 focus:border-slate-300 rounded-xl py-3 px-4 text-sm font-medium transition-all outline-none bg-slate-50/50"
            />
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={submitting || !member}
            className="w-full py-4.5 rounded-2xl font-bold text-lg font-outfit transition-all flex items-center justify-center gap-3 bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Confirm Record
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
