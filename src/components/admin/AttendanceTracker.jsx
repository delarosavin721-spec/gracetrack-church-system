import { useState, useEffect } from 'react'
import { useMembers } from '../../hooks/useMembers'
import { getAttendance, markAttendance } from '../../firebase/firestore'

export default function AttendanceTracker() {
  const { members, loading: memLoading } = useMembers()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [attendanceData, setAttendanceData] = useState({})
  const [loading, setLoading]   = useState(false)
  const [search, setSearch]     = useState('')
  const [saving, setSaving]     = useState({})

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const records = await getAttendance(selectedDate)
        const map = {}
        records.forEach(r => { map[r.memberId] = r.present })
        setAttendanceData(map)
      } catch (err) { console.error(err) }
      finally { setLoading(false) }
    }
    load()
  }, [selectedDate])

  const toggle = async (memberId, cur) => {
    const next = !cur
    setAttendanceData(p => ({ ...p, [memberId]: next }))
    setSaving(p => ({ ...p, [memberId]: true }))
    try {
      await markAttendance({ memberId, date: selectedDate, present: next, serviceType: 'Sunday Service' })
    } catch (err) {
      console.error(err)
      setAttendanceData(p => ({ ...p, [memberId]: cur }))
    } finally {
      setSaving(p => ({ ...p, [memberId]: false }))
    }
  }

  const activeMembers  = members.filter(m => m.active !== false)
  const filtered       = activeMembers.filter(m => m.name?.toLowerCase().includes(search.toLowerCase()))
  const presentCount   = Object.values(attendanceData).filter(Boolean).length
  const percentage     = activeMembers.length > 0 ? Math.round((presentCount / activeMembers.length) * 100) : 0

  if (memLoading) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="flex flex-col items-center gap-3">
        <div className="spinner" /><p className="text-sm text-slate-400 animate-pulse">Loading members...</p>
      </div>
    </div>
  )

  return (
    <div className="page-content space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-slate-900">Attendance</h1>
          <p className="text-sm text-slate-500 mt-1">Track Sunday service presence</p>
        </div>

        {/* Stat */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm shrink-0">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600 font-outfit leading-none">{presentCount}</div>
            <div className="text-xs text-slate-400 mt-0.5">Present</div>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-700 font-outfit leading-none">{activeMembers.length}</div>
            <div className="text-xs text-slate-400 mt-0.5">Total</div>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 font-outfit leading-none">{percentage}%</div>
            <div className="text-xs text-slate-400 mt-0.5">Rate</div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Attendance progress</span>
          <span className="font-semibold">{presentCount}/{activeMembers.length} present</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
          className="input sm:w-48"
        />
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search member..." className="input pl-9"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm animate-pulse">Loading attendance data...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map(member => {
            const isPresent = attendanceData[member.id] || false
            const isSaving  = saving[member.id]
            return (
              <button
                key={member.id}
                onClick={() => toggle(member.id, isPresent)}
                disabled={isSaving}
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-200 select-none
                  ${isPresent
                    ? 'border-green-400 bg-green-50 hover:bg-green-100'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}
                  ${isSaving ? 'opacity-60 cursor-wait' : 'cursor-pointer'}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors
                  ${isPresent ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {isPresent
                    ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    : member.name?.[0]?.toUpperCase()
                  }
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-semibold truncate ${isPresent ? 'text-green-800' : 'text-slate-700'}`}>
                    {member.name}
                  </div>
                  <div className={`text-xs ${isPresent ? 'text-green-600' : 'text-slate-400'}`}>
                    {isPresent ? '✓ Present' : 'Tap to mark present'}
                  </div>
                </div>
              </button>
            )
          })}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-slate-400 text-sm">
              No active members found.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
