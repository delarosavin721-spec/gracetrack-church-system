import { useState, useEffect } from 'react'
import { getMember, checkDuplicate, addTransaction } from '../../firebase/firestore'
import { useAuth } from '../../hooks/useAuth'
import { getCurrentWeekCode } from '../../utils/weekCode'

export default function AmountEntry({ data, onComplete, onCancel }) {
  const { user }     = useAuth()
  const [member,     setMember]     = useState(null)
  const [amount,     setAmount]     = useState('')
  const [note,       setNote]       = useState('')
  const [loading,    setLoading]    = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState('')
  const [warning,    setWarning]    = useState('')
  const [success,    setSuccess]    = useState(false)

  const effectiveWeekCode = data.weekCode === 'AUTO' ? getCurrentWeekCode() : data.weekCode
  const isTithe = data.type === 'tithe'

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
        const isDup = await checkDuplicate(data.memberId, data.type, effectiveWeekCode)
        if (isDup) setWarning('A transaction of this type has already been recorded for this member this week.')
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
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount greater than ₱0.'); return
    }
    setSubmitting(true); setError('')
    try {
      await addTransaction({
        memberId: data.memberId, 
        memberName: member.name,
        type: data.type, 
        amount: parseFloat(amount),
        weekCode: effectiveWeekCode, 
        date: new Date().toISOString().split('T')[0],
        submittedBy: user.uid, 
        note: note || null, 
        status: 'completed'
      })
      setSuccess(true)
      setTimeout(onComplete, 2000)
    } catch (err) {
      console.error(err); setError('Failed to submit. Please try again.')
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
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-5 success-icon">
        <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-playfair text-3xl font-bold text-slate-900 mb-2">Recorded!</h2>
      <p className="text-slate-500">₱{parseFloat(amount).toLocaleString()} {data.type} saved for <span className="font-semibold text-slate-800">{member?.name}</span></p>
    </div>
  )

  return (
    <div className="max-w-md mx-auto animate-fadeInUp">
      {/* Type badge */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onCancel} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <span className={`badge text-xs ${isTithe ? 'badge-tithe' : 'badge-offering'}`}>
          {data.type.toUpperCase()}
        </span>
      </div>

      <div className={`card-flat overflow-hidden border-t-4 ${isTithe ? 'border-t-teal-500' : 'border-t-indigo-500'}`}>
        {/* Member header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Member</p>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0
              ${isTithe ? 'bg-gradient-to-br from-teal-400 to-teal-600' : 'bg-gradient-to-br from-indigo-400 to-indigo-600'}`}>
              {member?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="font-playfair text-lg font-bold text-slate-900">{member?.name}</div>
              <div className="text-xs text-slate-400 font-mono">{data.weekCode}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error   && <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>}
          {warning && <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 text-sm flex items-start gap-2">
            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            {warning}
          </div>}

          {/* Amount input */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Amount (₱)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400 font-medium select-none">₱</span>
              <input
                type="number" step="0.01" min="0"
                value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className={`w-full border-2 rounded-xl py-4 pl-10 pr-4 text-3xl font-bold font-outfit text-slate-900 transition-all outline-none
                  ${isTithe
                    ? 'border-teal-200 focus:border-teal-500 bg-teal-50/30 focus:bg-white'
                    : 'border-indigo-200 focus:border-indigo-500 bg-indigo-50/30 focus:bg-white'}`}
                required autoFocus
              />
            </div>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-xs text-slate-400 mb-0.5">Week</div>
              <div className="text-sm font-semibold text-slate-700 font-mono">{data.weekCode}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-xs text-slate-400 mb-0.5">Date</div>
              <div className="text-sm font-semibold text-slate-700">{new Date().toLocaleDateString('en-PH')}</div>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Note (Optional)</label>
            <input
              type="text" value={note} onChange={e => setNote(e.target.value)}
              placeholder="e.g. Cash, Check #..." className="input"
            />
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={submitting || !member}
            className={`w-full py-4 rounded-xl font-bold text-lg font-outfit transition-all flex items-center justify-center gap-2
              ${isTithe
                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-lg shadow-teal-200'
                : 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-200'}
              disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : `Submit ${data.type.charAt(0).toUpperCase() + data.type.slice(1)}`}
          </button>
        </form>
      </div>
    </div>
  )
}
