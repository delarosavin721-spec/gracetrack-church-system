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
    <div className="max-w-2xl mx-auto animate-fadeInUp px-4 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={onCancel} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Recording Entry</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Member Card */}
        <div className="card-flat overflow-hidden border-t-8 border-t-teal-600 shadow-xl shadow-teal-100/50">
          <div className="px-8 py-8 bg-gradient-to-br from-teal-50 via-white to-transparent">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-teal-100 shrink-0">
                {member?.name?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Member</p>
                <p className="font-playfair text-3xl font-bold text-slate-900 truncate">{member?.name}</p>
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <span className="px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider">📅 Week {effectiveWeekCode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amount Input Section */}
        <div className="space-y-6">
          {/* Tithe Input */}
          <div className="card-flat overflow-hidden border-l-4 border-l-emerald-500 shadow-lg shadow-emerald-50">
            <div className="px-8 py-6 bg-gradient-to-r from-emerald-50 to-transparent border-b border-emerald-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">💚 Tithes (Ikapu)</p>
                  <p className="text-sm text-slate-600 mt-1">10% of income - faithful giving</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="relative group mb-2">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-emerald-400 group-focus-within:text-emerald-600 transition-colors">₱</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={titheAmount}
                  onChange={e => setTitheAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full border-3 border-emerald-200 focus:border-emerald-500 rounded-2xl py-5 pl-16 pr-6 text-4xl font-bold font-outfit text-slate-900 transition-all outline-none bg-white focus:shadow-lg focus:shadow-emerald-200/50"
                  autoFocus
                />
              </div>
              <p className="text-xs text-slate-500 px-1">Enter the tithe amount</p>
            </div>
          </div>

          {/* Offering Input */}
          <div className="card-flat overflow-hidden border-l-4 border-l-indigo-500 shadow-lg shadow-indigo-50">
            <div className="px-8 py-6 bg-gradient-to-r from-indigo-50 to-transparent border-b border-indigo-100">
              <div>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">💙 Offering (Handog)</p>
                <p className="text-sm text-slate-600 mt-1">Voluntary gift for the church</p>
              </div>
            </div>
            <div className="p-8">
              <div className="relative group mb-2">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-indigo-400 group-focus-within:text-indigo-600 transition-colors">₱</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={offeringAmount}
                  onChange={e => setOfferingAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full border-3 border-indigo-200 focus:border-indigo-500 rounded-2xl py-5 pl-16 pr-6 text-4xl font-bold font-outfit text-slate-900 transition-all outline-none bg-white focus:shadow-lg focus:shadow-indigo-200/50"
                />
              </div>
              <p className="text-xs text-slate-500 px-1">Enter the offering amount</p>
            </div>
          </div>

          {/* Note Section */}
          <div className="card-flat overflow-hidden border-l-4 border-l-slate-300 shadow-lg">
            <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-transparent border-b border-slate-100">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">📝 Add Remark (Optional)</p>
            </div>
            <div className="p-8">
              <input
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="e.g., For Mission Fund, Building Fund, etc."
                className="w-full border-2 border-slate-200 focus:border-slate-400 rounded-xl py-4 px-6 text-base font-medium text-slate-900 transition-all outline-none bg-slate-50/50 focus:bg-white placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-5 rounded-xl bg-red-50 border-2 border-red-200 text-red-700 font-bold text-sm flex items-start gap-3 animate-shake">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={submitting || !member}
          className={`w-full py-5 px-8 rounded-2xl font-bold text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-3 font-outfit shadow-xl ${
            submitting || !member
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-slate-900 to-black text-white hover:from-black hover:to-slate-900 active:scale-95 shadow-slate-300 hover:shadow-slate-400'
          }`}
        >
          {submitting ? (
            <>
              <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              ✅ Confirm & Save
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
