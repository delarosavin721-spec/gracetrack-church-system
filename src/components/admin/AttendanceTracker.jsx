import { useState, useEffect } from 'react'
import { useMembers } from '../../hooks/useMembers'
import { getAttendance, markAttendance } from '../../firebase/firestore'
import PageHeader from '../shared/PageHeader'
import AppLoading from '../shared/AppLoading'

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

  if (memLoading) return <AppLoading message="Loading members…" />

  return (
    <div className="page-content space-y-6">
      <PageHeader
        eyebrow="service"
        title="Attendance"
        description="Track Sunday service presence for active members."
        action={
          <div className="grid grid-cols-3 gap-3 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-3xl p-4 shadow-sm">
            <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Present</p>
              <p className="mt-3 text-3xl font-bold text-emerald-700">{presentCount}</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Total Active</p>
              <p className="mt-3 text-3xl font-bold text-slate-800">{activeMembers.length}</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Attendance Rate</p>
              <p className="mt-3 text-3xl font-bold text-indigo-700">{percentage}%</p>
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-6">
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-emerald-50 to-slate-50 border border-emerald-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-emerald-500">Attendance Snapshot</p>
                <h2 className="mt-3 text-2xl font-bold text-slate-900">{presentCount}/{activeMembers.length} Present</h2>
              </div>
              <div className="inline-flex rounded-3xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200">
                {percentage}% attendance
              </div>
            </div>
            <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500" style={{ width: `${percentage}%` }} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div>
                <p className="text-sm font-semibold text-slate-700">Take attendance</p>
                <p className="text-xs text-slate-500 mt-1">Choose date and mark members present instantly.</p>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full sm:w-56 px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:border-indigo-400 focus:bg-white focus:outline-none transition"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search member…"
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:border-indigo-400 focus:bg-white focus:outline-none transition"
              />
            </div>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-400">Loading attendance data...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
              {filtered.map(member => {
                const isPresent = attendanceData[member.id] || false
                const isSaving  = saving[member.id]
                return (
                  <button
                    key={member.id}
                    onClick={() => toggle(member.id, isPresent)}
                    disabled={isSaving}
                    className={`group flex items-center gap-4 p-4 rounded-3xl border-2 text-left transition-all duration-200 w-full ${
                      isPresent
                        ? 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    } ${isSaving ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
                  >
                    <div className={`w-14 h-14 rounded-3xl flex items-center justify-center text-lg font-bold ${isPresent ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {isPresent ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> : member.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm font-semibold ${isPresent ? 'text-slate-900' : 'text-slate-800'}`}>{member.name}</div>
                      <div className={`mt-1 text-xs ${isPresent ? 'text-emerald-600' : 'text-slate-500'}`}>
                        {isPresent ? 'Present' : 'Tap to mark present'}
                      </div>
                    </div>
                    <div className="text-right text-xs text-slate-400 tracking-[0.16em] uppercase">{member.group || 'Member'}</div>
                  </button>
                )
              })}
              {filtered.length === 0 && (
                <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-400">No matching members found.</div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Attendance Report</p>
                <h3 className="mt-3 text-2xl font-bold">Today’s Service Summary</h3>
              </div>
              <div className="rounded-3xl bg-slate-800/80 px-4 py-2 text-sm text-slate-300">As of {selectedDate}</div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-900/80 p-5 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-slate-400">Total Members</p>
                  <p className="text-xl font-semibold text-white">{activeMembers.length}</p>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: '100%' }} />
                </div>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-5 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-slate-400">Present Today</p>
                  <p className="text-xl font-semibold text-emerald-300">{presentCount}</p>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" style={{ width: `${percentage}%` }} />
                </div>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-5 border border-slate-800">
                <p className="text-sm text-slate-400 mb-3">Attendance Notes</p>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
                  Mark attendance quickly and keep the service flow smooth. Use this panel to follow up with absent members.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
