import { motion } from 'framer-motion'

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Register Members",
      desc: "Add your church members to the system and generate personalized QR cards instantly.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      num: "02",
      title: "Scan & Enter",
      desc: "Ushers scan the member's QR code and enter the Tithes and Offering amounts in one screen.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      num: "03",
      title: "Monitor Live",
      desc: "Admins view all transactions in real-time, track trends, and automate thank-you emails.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ]

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-white flex justify-center w-full relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-50 rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-slate-50 rounded-full blur-[100px] opacity-60 translate-y-1/2 -translate-x-1/2" />

      <div className="w-full max-w-7xl px-6 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center w-full max-w-3xl mb-24 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-teal-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 bg-teal-50 px-5 py-2 rounded-full border border-teal-100"
          >
            Efficiency Redefined
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-6xl text-slate-900 leading-tight font-black mb-8"
          >
            Simple Workflow,<br />
            <span className="text-teal-600">Powerful Impact.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 text-lg md:text-xl font-dmsans max-w-2xl"
          >
            We've distilled complex church administration into three effortless steps.
          </motion.p>
        </div>
        
        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-slate-100" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step Circle */}
              <div className="relative w-28 h-28 mb-10 flex items-center justify-center">
                {/* Glow Background */}
                <div className="absolute inset-0 bg-teal-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[2.5rem] blur-xl" />
                
                {/* Main Circle */}
                <div className="w-full h-full rounded-[2.5rem] bg-slate-50 border-2 border-white shadow-2xl shadow-slate-200/50 flex items-center justify-center text-slate-600 group-hover:bg-teal-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 relative z-10 overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100" />
                   {step.icon}
                </div>
                
                {/* Step Number Tag */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center shadow-2xl z-20 font-outfit border-4 border-white group-hover:bg-teal-500 transition-colors">
                  {step.num}
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-4 max-w-[280px]">
                <h3 className="font-playfair text-2xl text-slate-900 font-black group-hover:text-teal-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-dmsans text-sm leading-relaxed group-hover:text-slate-700 transition-colors">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action hint */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 w-full max-w-6xl relative group"
        >
          {/* Animated Glow behind the banner */}
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative bg-slate-900 rounded-[3rem] p-8 md:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 border border-white/5">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-6 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </div>
                <p className="text-teal-400 font-bold text-[10px] uppercase tracking-[0.3em]">Ready to scale?</p>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-bold font-playfair text-white leading-tight">
                Join 50+ churches<br />
                <span className="text-teal-400">using our platform.</span>
              </h3>
            </div>
            
            <button className="whitespace-nowrap px-10 py-5 bg-teal-500 hover:bg-teal-400 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-teal-500/20 active:scale-95 flex items-center gap-3">
              Create Free Account
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
