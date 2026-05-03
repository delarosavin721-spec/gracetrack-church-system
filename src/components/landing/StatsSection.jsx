import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'
import { getLandingStats } from '../../firebase/firestore'

const StatItem = ({ end, suffix = "", label, prefix = "", icon, isLive }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const count = useCountUp(end, 2000, 0, isInView)

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group w-full"
    >
      <div className="absolute inset-0 bg-teal-500/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-2xl shadow-slate-200/50 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 h-full">
        {isLive && (
          <div className="absolute top-4 right-6 flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
            </span>
            <span className="text-[8px] font-bold text-teal-600 uppercase tracking-widest">Live</span>
          </div>
        )}
        
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        <div className="font-outfit text-3xl md:text-5xl text-slate-900 font-black mb-1 flex items-baseline gap-1">
          <span className="text-teal-600 text-xl font-bold">{prefix}</span>
          {count.toLocaleString()}
          <span className="text-teal-600 text-xl font-bold">{suffix}</span>
        </div>
        
        <div className="font-dmsans text-[10px] text-slate-400 uppercase tracking-[0.25em] font-bold">
          {label}
        </div>
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  const [stats, setStats] = useState({ members: 0, totalAmount: 0, weeksActive: 0, paperless: 100 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getLandingStats()
      setStats(data)
      setLoading(false)
    }
    fetchStats()
  }, [])

  // Format total amount for display (e.g. 2.4M if > 1M, else direct)
  const formatAmount = (amt) => {
    if (amt >= 1000000) return { val: amt / 1000000, suffix: 'M+' }
    if (amt >= 1000) return { val: amt / 1000, suffix: 'K+' }
    return { val: amt, suffix: '+' }
  }

  const amtData = formatAmount(stats.totalAmount)

  return (
    <section className="relative z-20 -mt-20 px-6 flex justify-center w-full">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <StatItem end={stats.members} suffix="+" label="Members" icon="👥" />
          <StatItem end={amtData.val} prefix="₱" suffix={amtData.suffix} label="Recorded" icon="💰" isLive />
          <StatItem end={stats.weeksActive} suffix="+" label="Weeks Active" icon="📅" />
          <StatItem end={stats.paperless} suffix="%" label="Paperless" icon="🌿" />
        </div>
      </div>
    </section>
  )
}
