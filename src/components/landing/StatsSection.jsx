import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'
import { getLandingStats } from '../../firebase/firestore'

const STAT_ITEMS = [
  { icon: '👥', label: 'Members',      prefix: '',  suffix: '+',  key: 'members',     color: '#0CBFC7', bg: 'rgba(12,191,199,0.08)' },
  { icon: '💰', label: 'Recorded',     prefix: '₱', suffix: '',   key: 'totalAmount', color: '#6366F1', bg: 'rgba(99,102,241,0.08)',  isLive: true },
  { icon: '📅', label: 'Weeks Active', prefix: '',  suffix: '+',  key: 'weeksActive', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
  { icon: '🌿', label: 'Paperless',    prefix: '',  suffix: '%',  key: 'paperless',   color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
]

function StatItem({ end, suffix, label, prefix, icon, isLive, color, bg, inView }) {
  const ref = useRef(null)
  const isLocalView = useInView(ref, { once: true, margin: "-50px" })
  const count = useCountUp(end, 2000, 0, inView && isLocalView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="relative premium-card p-7
        flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 h-full overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at center bottom, ${bg}, transparent 70%)` }} />

        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-4 right-5 flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500" />
            </span>
            <span className="text-[8px] font-black text-teal-600 uppercase tracking-widest">Live</span>
          </div>
        )}

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300 relative z-10"
          style={{ background: bg, border: `1px solid ${color}22` }}>
          {icon}
        </div>

        {/* Number */}
        <div className="font-outfit text-4xl md:text-5xl font-black mb-1 relative z-10 flex items-baseline gap-0.5"
          style={{ color }}>
          <span className="text-lg font-bold">{prefix}</span>
          <span>{count.toLocaleString()}</span>
          <span className="text-lg font-bold">{suffix}</span>
        </div>

        {/* Label */}
        <div className="font-dmsans text-[10px] text-slate-400 uppercase tracking-[0.25em] font-bold relative z-10">
          {label}
        </div>
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  const [stats, setStats]   = useState({ members: 0, totalAmount: 0, weeksActive: 0, paperless: 100 })
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true })

  useEffect(() => {
    getLandingStats()
      .then(data => setStats(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const formatAmount = (amt) => {
    if (amt >= 1000000) return { val: parseFloat((amt / 1000000).toFixed(1)), suffix: 'M+' }
    if (amt >= 1000)    return { val: parseFloat((amt / 1000).toFixed(1)),    suffix: 'K+' }
    return { val: amt, suffix: '+' }
  }

  const amtData = formatAmount(stats.totalAmount)

  const statValues = {
    members:     stats.members,
    totalAmount: amtData.val,
    weeksActive: stats.weeksActive,
    paperless:   stats.paperless,
  }

  return (
    <section ref={sectionRef} className="relative z-20 -mt-24 px-6 pb-4 flex justify-center w-full">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STAT_ITEMS.map((s, i) => (
            <StatItem
              key={i}
              end={statValues[s.key]}
              prefix={s.prefix}
              suffix={s.key === 'totalAmount' ? amtData.suffix : s.suffix}
              label={s.label}
              icon={s.icon}
              isLive={s.isLive}
              color={s.color}
              bg={s.bg}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
