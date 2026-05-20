import { motion } from 'framer-motion'

const STEPS = [
  {
    num: "01",
    title: "Register Members",
    desc: "Add your church members to the system and generate personalized QR envelope cards instantly.",
    gradient: 'linear-gradient(135deg, #0CBFC7 0%, #0891b2 100%)',
    glow: 'rgba(12,191,199,0.2)',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    )
  },
  {
    num: "02",
    title: "Scan & Enter",
    desc: "Ushers scan the member's QR code and enter the Tithe and Offering amounts in one simple screen.",
    gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    glow: 'rgba(99,102,241,0.2)',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    )
  },
  {
    num: "03",
    title: "Monitor Live",
    desc: "Admins view all transactions in real-time, track trends, and automate thank-you emails automatically.",
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    glow: 'rgba(16,185,129,0.2)',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
]

export default function HowItWorks({ onOpenRegister }) {
  return (
    <section id="how-it-works" className="py-24 md:py-32 flex justify-center w-full relative overflow-hidden bg-white">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 blur-[140px] opacity-30 -translate-y-1/2 translate-x-1/2"
        style={{ background: 'radial-gradient(circle, #0CBFC7, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 blur-[120px] opacity-20 translate-y-1/2 -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />

      <div className="w-full max-w-7xl px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-teal-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 bg-teal-50 px-5 py-2 rounded-full border border-teal-100"
          >
            Efficiency Redefined
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-6xl text-slate-900 font-black mb-6 leading-tight"
          >
            Simple Workflow,{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0CBFC7, #6366F1)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>
              Powerful Impact.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 text-lg font-dmsans"
          >
            We've distilled complex church administration into three effortless steps.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[52px] left-[22%] right-[22%] h-px"
            style={{ background: 'linear-gradient(90deg, #0CBFC7, #6366F1)' }} />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step circle */}
              <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: step.glow }} />
                {/* Circle */}
                <div className="w-full h-full rounded-3xl flex items-center justify-center text-white relative z-10 transition-all duration-500 group-hover:scale-110 shadow-2xl"
                  style={{ background: step.gradient, boxShadow: `0 12px 30px ${step.glow}` }}>
                  {step.icon}
                </div>
                {/* Step number badge */}
                <div className="absolute -top-3 -right-3 w-9 h-9 rounded-2xl text-white text-xs font-black flex items-center justify-center z-20 font-outfit shadow-lg border-4 border-white"
                  style={{ background: '#0F172A' }}>
                  {step.num}
                </div>
              </div>

              <h3 className="font-playfair text-2xl text-slate-900 font-black mb-3 group-hover:text-teal-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 font-dmsans text-sm leading-relaxed max-w-[280px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative group"
        >
          <div className="absolute -inset-1 rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000"
            style={{ background: 'linear-gradient(135deg, #0CBFC7, #6366F1)' }} />
          <div className="relative rounded-[2.5rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1a2744 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>

            {/* Glow orb */}
            <div className="absolute right-0 top-0 w-64 h-64 blur-[100px] opacity-15"
              style={{ background: '#0CBFC7' }} />

            <div className="flex flex-col items-center md:items-start text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full"
                style={{ background: 'rgba(12,191,199,0.1)', border: '1px solid rgba(12,191,199,0.2)' }}>
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                </div>
                <span className="text-teal-400 font-black text-[10px] uppercase tracking-[0.3em]">Ready to scale?</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black font-playfair text-white leading-tight">
                Join growing churches<br />
                <span style={{
                  background: 'linear-gradient(135deg, #2DD4BF, #818CF8)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>
                  using our platform.
                </span>
              </h3>
            </div>

            <button
              type="button"
              onClick={onOpenRegister}
              className="btn-primary-lg whitespace-nowrap relative z-10"
            >
              Create Free Account
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
