import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'

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
      className="relative group"
    >
      <div className="absolute inset-0 bg-teal-500/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-2xl shadow-slate-200/50 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500">
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

        <div className="font-outfit text-4xl md:text-5xl text-slate-900 font-black mb-1 flex items-baseline gap-1">
          <span className="text-teal-600 text-2xl font-bold">{prefix}</span>
          {count}
          <span className="text-teal-600 text-2xl font-bold">{suffix}</span>
        </div>
        
        <div className="font-dmsans text-[10px] text-slate-400 uppercase tracking-[0.25em] font-bold">
          {label}
        </div>
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="relative z-20 -mt-20 px-6 flex justify-center w-full">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <StatItem end={500} suffix="+" label="Members" icon="👥" />
          <StatItem end={2} prefix="₱" suffix="M+" label="Recorded" icon="💰" isLive />
          <StatItem end={52} label="Weeks Active" icon="📅" />
          <StatItem end={100} suffix="%" label="Paperless" icon="🌿" />
        </div>
      </div>
    </section>
  )
}
