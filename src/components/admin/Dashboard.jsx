import { useTransactions } from '../../hooks/useTransactions'
import { useMembers } from '../../hooks/useMembers'
import { formatCurrency, getCurrentWeekCode } from '../../utils/weekCode'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useMemo } from 'react'
import PageHeader from '../shared/PageHeader'

const STAT_CONFIGS = [
  {
    key: 'tithe',
    label: "This Week's Tithes",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #0CBFC7 0%, #0891b2 100%)',
  },
  {
    key: 'offering',
    label: "This Week's Offerings",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
  },
  {
    key: 'ytd',
    label: 'YTD Total Giving',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  },
  {
    key: 'members',
    label: 'Total Members',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
]

function StatCard({ label, value, sub, config }) {
  return (
    <div className="stat-card-v5 group" style={{ '--stat-accent': config.gradient }}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.14em] leading-tight max-w-[8rem]">{label}</p>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white transition-transform group-hover:scale-105"
          style={{ background: config.gradient }}>
          {config.icon}
        </div>
      </div>
      <div className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit tracking-tight mb-0.5">{value}</div>
      {sub && <p className="text-[11px] text-slate-400 font-medium">{sub}</p>}
    </div>
  )
}

export default function Dashboard() {
  const { transactions, loading: txLoading } = useTransactions()
  const { members, loading: memLoading } = useMembers()

  const stats = useMemo(() => {
    if (!transactions.length) return { currentWeekTithe: 0, currentWeekOffering: 0, totalYTD: 0 }
    const currentWeek = getCurrentWeekCode()
    const currentYear = new Date().getFullYear().toString()
    return transactions.reduce((acc, tx) => {
      if (tx.weekCode === currentWeek) {
        if (tx.type === 'tithe') acc.currentWeekTithe += tx.amount
        if (tx.type === 'offering') acc.currentWeekOffering += tx.amount
      }
      if (tx.weekCode?.startsWith(currentYear)) acc.totalYTD += tx.amount
      return acc
    }, { currentWeekTithe: 0, currentWeekOffering: 0, totalYTD: 0 })
  }, [transactions])

  const chartData = useMemo(() => {
    const weeks = {}
    transactions.slice(0, 200).forEach((tx) => {
      if (!weeks[tx.weekCode]) weeks[tx.weekCode] = { name: `W${tx.weekCode?.split('-W')[1] ?? tx.weekCode}`, Tithe: 0, Offering: 0 }
      if (tx.type === 'tithe') weeks[tx.weekCode].Tithe += tx.amount
      if (tx.type === 'offering') weeks[tx.weekCode].Offering += tx.amount
    })
    return Object.values(weeks).sort((a, b) => a.name.localeCompare(b.name)).slice(-8)
  }, [transactions])

  if (txLoading || memLoading) {
    return (
      <div className="page-content flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-3">
          <div className="spinner" />
          <p className="text-sm text-slate-400 animate-pulse">Loading live data…</p>
        </div>
      </div>
    )
  }

  const activeMembers = members.filter((m) => m.active !== false).length
  const statValues = [
    { value: formatCurrency(stats.currentWeekTithe), config: STAT_CONFIGS[0] },
    { value: formatCurrency(stats.currentWeekOffering), config: STAT_CONFIGS[1] },
    { value: formatCurrency(stats.totalYTD), sub: `as of ${new Date().getFullYear()}`, config: STAT_CONFIGS[2] },
    { value: members.length, sub: `${activeMembers} active`, config: STAT_CONFIGS[3] },
  ]

  return (
    <div className="page-content space-y-8">
      <PageHeader
        eyebrow="live"
        title="Dashboard"
        description="Welcome back — here's your church at a glance."
        action={
          <div className="sync-badge">
            <span className="sync-badge__dot" />
            Syncing with Cloud
          </div>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {statValues.map((s, i) => (
          <StatCard key={i} label={STAT_CONFIGS[i].label} value={s.value} sub={s.sub} config={s.config} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-6">
        <div className="xl:col-span-2 premium-card-flat p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-playfair text-xl font-bold text-slate-800">Giving Trends</h2>
              <p className="text-xs text-slate-400 mt-0.5">Historical breakdown of tithes vs offerings</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 uppercase tracking-wider">
              Last 8 weeks
            </span>
          </div>

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} dy={8} />
                <YAxis axisLine={false} tickLine={false}
                  tickFormatter={(v) => `₱${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                  tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(12,191,199,0.04)' }}
                  contentStyle={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
                  formatter={(value) => [formatCurrency(value)]}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 20 }} iconType="circle" />
                <Bar dataKey="Tithe" fill="#0CBFC7" radius={[6, 6, 0, 0]} maxBarSize={28} />
                <Bar dataKey="Offering" fill="#6366F1" radius={[6, 6, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[260px] flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 text-2xl">📊</div>
              <p className="text-sm text-slate-400">No data yet. Scan QR codes to begin.</p>
            </div>
          )}
        </div>

        <div className="premium-card-flat p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-playfair text-xl font-bold text-slate-800">Recent Activity</h2>
              <p className="text-xs text-slate-400 mt-0.5">Live transaction stream</p>
            </div>
            <a href="/admin/transactions"
              className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-colors border border-slate-100">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>

          <div className="flex-1 space-y-1">
            {transactions.slice(0, 7).map((tx, idx) => (
              <div key={tx.id} className="flex items-center gap-3 group p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors"
                style={{ animationDelay: `${idx * 40}ms` }}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base
                  ${tx.type === 'tithe' ? 'bg-teal-50 text-teal-600 border border-teal-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                  {tx.type === 'tithe' ? '💰' : '🙏'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-800 truncate">{tx.memberName}</div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                    <span className={tx.type === 'tithe' ? 'text-teal-500' : 'text-indigo-500'}>{tx.type}</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
                    <span className="font-mono">{tx.weekCode}</span>
                  </div>
                </div>
                <div className={`text-sm font-black shrink-0 ${tx.type === 'tithe' ? 'text-teal-600' : 'text-indigo-600'}`}>
                  +{formatCurrency(tx.amount)}
                </div>
              </div>
            ))}

            {transactions.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center py-10 gap-3 text-slate-400 text-sm">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-2xl border border-slate-100">⏳</div>
                <p>No recent activity.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
