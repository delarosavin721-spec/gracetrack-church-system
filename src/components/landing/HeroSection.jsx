import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

function DashboardPreview() {
  const bars = [40, 65, 45, 80, 55, 70, 90, 60]
  return (
    <div className="product-mockup w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
      <div className="product-mockup__chrome">
        <span className="product-mockup__dot bg-red-400/80" />
        <span className="product-mockup__dot bg-amber-400/80" />
        <span className="product-mockup__dot bg-emerald-400/80" />
        <span className="ml-3 text-[10px] text-white/40 font-mono tracking-wider">ccccpgi.app/admin</span>
      </div>
      <div className="product-mockup__body space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">This Week</p>
            <p className="text-xl font-black text-white font-outfit">₱24,850</p>
          </div>
          <span className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] font-bold text-teal-300 bg-teal-500/15 border border-teal-500/20">
            <span className="pulse-live" /> Live
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Tithes', val: '₱18.2k', color: '#0CBFC7' },
            { label: 'Offering', val: '₱6.6k', color: '#818CF8' },
            { label: 'Members', val: '142', color: '#34D399' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-2.5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">{s.label}</p>
              <p className="text-sm font-bold text-white font-outfit" style={{ color: s.color }}>{s.val}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[9px] text-white/35 uppercase tracking-widest mb-2 font-bold">Giving Trends</p>
          <div className="flex items-end gap-1.5 h-16">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md min-h-[4px] transition-all"
                style={{
                  height: `${h}%`,
                  background: i % 2 === 0
                    ? 'linear-gradient(180deg, #2DD4BF, #0CBFC7)'
                    : 'linear-gradient(180deg, #A5B4FC, #6366F1)',
                  opacity: 0.85 + (i * 0.02),
                }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {['Maria Santos — Tithe', 'Juan Reyes — Offering', 'Ana Cruz — Tithe'].map((row, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px]">
              <div className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-white/80 font-bold"
                style={{ background: 'linear-gradient(135deg, #0CBFC7, #6366F1)', fontSize: '9px' }}>
                {row[0]}
              </div>
              <span className="text-white/60 flex-1 truncate">{row}</span>
              <span className="text-teal-400 font-bold">+₱</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HeroSection({ onOpenRegister, onOpenLogin }) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden" style={{ background: '#030712' }}>
      <ParticleCanvas />
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 grid-pattern-dark opacity-40" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(3,7,18,0.5) 0%, rgba(3,7,18,0.2) 45%, rgba(248,250,252,0.98) 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(3,7,18,0.75) 0%, transparent 55%)' }} />
        <div className="absolute top-1/3 left-1/4 w-[28rem] h-[28rem] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, #0CBFC7 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/5 w-72 h-72 rounded-full blur-[120px] opacity-15"
          style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-32 lg:pb-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
            <motion.div variants={item}
              className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
              </span>
              <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.28em]">Live Church Management</span>
            </motion.div>

            <motion.h1 variants={item}
              className="font-playfair text-[2.75rem] sm:text-6xl lg:text-[4.25rem] font-black text-white mb-6 leading-[0.92] tracking-tight">
              Faith Meets
              <br />
              <span className="gradient-text gradient-animate" style={{
                background: 'linear-gradient(135deg, #5EEAD4 0%, #0CBFC7 40%, #818CF8 80%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Innovation.
              </span>
            </motion.h1>

            <motion.p variants={item}
              className="text-white/60 text-base md:text-lg font-dmsans mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The all-in-one digital sanctuary for{' '}
              <span className="text-white font-semibold">CCCCPGI</span>. Automate tithes, offerings,
              attendance, and member care — with real-time insights your leadership can trust.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row items-center lg:items-start gap-4 justify-center lg:justify-start">
              <button onClick={onOpenRegister} className="btn-primary-lg w-full sm:w-auto">
                Start Free Trial
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button onClick={onOpenLogin}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-white/80 hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                Sign In
              </button>
            </motion.div>

            <motion.div variants={item}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-white/35 text-[10px] font-bold uppercase tracking-[0.2em]">
              {['Free to Start', 'Real-time Sync', 'Cloud Secured'].map((t, i) => (
                <span key={t} className="flex items-center gap-2">
                  {i > 0 && <span className="w-px h-3 bg-white/15 hidden sm:block" />}
                  <svg className="w-3.5 h-3.5 text-teal-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden sm:block"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[9px] text-white/25 uppercase tracking-[0.35em] font-bold">Scroll</span>
        <div className="w-5 h-9 border border-white/12 rounded-full flex justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1.5 bg-teal-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
