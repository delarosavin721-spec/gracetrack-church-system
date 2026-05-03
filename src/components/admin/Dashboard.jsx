import { useTransactions } from '../../hooks/useTransactions'
import { useMembers } from '../../hooks/useMembers'
import { formatCurrency, getCurrentWeekCode } from '../../utils/weekCode'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useMemo } from 'react'

function StatCard({ label, value, icon, color, sub }) {
  return (
    <div className="stat-card group cursor-default">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${color}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit mb-1">{value}</div>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  )
}

export default function Dashboard() {
  const { transactions, loading: txLoading } = useTransactions()
  const { members, loading: memLoading } = useMembers()

  const stats = useMemo(() => {
    if (!transactions.length) return { currentWeekTithe: 0, currentWeekOffering: 0, totalYTD: 0, activeMembers: 0 }
    const currentWeek = getCurrentWeekCode()
    const currentYear = new Date().getFullYear().toString()
    const s = transactions.reduce((acc, tx) => {
      if (tx.weekCode === currentWeek) {
        if (tx.type === 'tithe')    acc.currentWeekTithe    += tx.amount
        if (tx.type === 'offering') acc.currentWeekOffering += tx.amount
      }
      if (tx.weekCode?.startsWith(currentYear)) acc.totalYTD += tx.amount
      return acc
    }, { currentWeekTithe: 0, currentWeekOffering: 0, totalYTD: 0 })
    return s
  }, [transactions])

  const chartData = useMemo(() => {
    const weeks = {}
    transactions.slice(0, 200).forEach(tx => {
      if (!weeks[tx.weekCode]) weeks[tx.weekCode] = { name: `W${tx.weekCode?.split('-W')[1] ?? tx.weekCode}`, Tithe: 0, Offering: 0 }
      if (tx.type === 'tithe')    weeks[tx.weekCode].Tithe    += tx.amount
      if (tx.type === 'offering') weeks[tx.weekCode].Offering += tx.amount
    })
    return Object.values(weeks).sort((a, b) => a.name.localeCompare(b.name)).slice(-8)
  }, [transactions])

  if (txLoading || memLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-3">
          <div className="spinner" />
          <p className="text-sm text-slate-400 animate-pulse">Loading live data...</p>
        </div>
      </div>
    )
  }

  const activeMembers = members.filter(m => m.active !== false).length

  return (
    <div className="p-6 sm:p-8 space-y-8 animate-fadeInUp">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="pulse-live" />
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Live System</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back — here's your church at a glance.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl px-4 py-2 self-start sm:self-auto">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-600">Syncing with Cloud</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label="This Week's Tithes"
          value={formatCurrency(stats.currentWeekTithe)}
          icon="💰"
          color="bg-teal-50 text-teal-600 shadow-sm"
        />
        <StatCard
          label="This Week's Offerings"
          value={formatCurrency(stats.currentWeekOffering)}
          icon="🙏"
          color="bg-indigo-50 text-indigo-600 shadow-sm"
        />
        <StatCard
          label="YTD Total Giving"
          value={formatCurrency(stats.totalYTD)}
          icon="📈"
          color="bg-amber-50 text-amber-600 shadow-sm"
          sub={`as of ${new Date().getFullYear()}`}
        />
        <StatCard
          label="Total Members"
          value={members.length}
          icon="👥"
          color="bg-slate-100 text-slate-600 shadow-sm"
          sub={`${activeMembers} active`}
        />
      </div>

      {/* Chart + Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Bar Chart */}
        <div className="xl:col-span-2 glass p-6 sm:p-8 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-playfair text-xl font-bold text-slate-800">Giving Trends</h2>
              <p className="text-xs text-slate-400 mt-0.5">Historical breakdown of tithes vs offerings</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 uppercase tracking-wider">Last 8 weeks</span>
          </div>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={v => `₱${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(12,191,199,0.05)' }}
                  contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: 12, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [formatCurrency(value)]}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 20 }} iconType="circle" />
                <Bar dataKey="Tithe"    fill="#0CBFC7" radius={[6, 6, 0, 0]} maxBarSize={32} />
                <Bar dataKey="Offering" fill="#6366F1" radius={[6, 6, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">📊</div>
              No data yet. Scan QR codes to record transactions.
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="glass p-6 sm:p-8 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-playfair text-xl font-bold text-slate-800">Recent Activity</h2>
              <p className="text-xs text-slate-400 mt-0.5">Live transaction stream</p>
            </div>
            <a href="/admin/transactions" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-colors border border-slate-100">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
          <div className="flex-1 space-y-4">
            {transactions.slice(0, 7).map((tx, idx) => (
              <div key={tx.id} className="flex items-center gap-4 group animate-fadeInUp" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-lg transition-transform group-hover:scale-110 ${tx.type === 'tithe' ? 'bg-teal-50 text-teal-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  {tx.type === 'tithe' ? '💰' : '🙏'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-800 truncate group-hover:text-teal-600 transition-colors">{tx.memberName}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                    <span className={tx.type === 'tithe' ? 'text-teal-500' : 'text-indigo-500'}>{tx.type}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                    <span>{tx.weekCode}</span>
                  </div>
                </div>
                <div className={`text-sm font-black shrink-0 ${tx.type === 'tithe' ? 'text-teal-600' : 'text-indigo-600'}`}>
                  +{formatCurrency(tx.amount)}
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-sm text-slate-400 py-12 gap-2 opacity-50">
                <div className="text-2xl">⏳</div>
                No recent activity.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
