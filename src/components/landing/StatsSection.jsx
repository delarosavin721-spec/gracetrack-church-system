import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'

const StatItem = ({ end, suffix = "", label, prefix = "", icon }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const count = useCountUp(end, 2000, 0, isInView)

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105"
    >
      <div className="font-playfair text-4xl md:text-5xl text-white font-bold mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="font-outfit text-xs md:text-sm text-teal-100 uppercase tracking-[0.15em] font-medium">
        {label}
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 relative overflow-hidden py-16 flex justify-center w-full">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-2xl" />

      <div className="w-full max-w-6xl px-6 relative z-10 flex justify-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatItem end={500} suffix="+" label="Members" />
          <StatItem end={2} prefix="₱" suffix="M+" label="Recorded" />
          <StatItem end={52} label="Weeks Active" />
          <StatItem end={100} suffix="%" label="Paperless" />
        </div>
      </div>
    </section>
  )
}
