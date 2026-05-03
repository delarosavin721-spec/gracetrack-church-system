import { motion } from 'framer-motion'

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
      title: "Smart Envelope Scanning",
      description: "Scan QR codes on envelopes using your smartphone. No more manual logbooks or tedious data entry.",
      color: "teal"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Automated Email Devotions",
      description: "Daily life verses and prayer reminders sent every morning to keep your congregation spiritually connected.",
      color: "indigo"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Real-time Dashboard",
      description: "Monitor all tithes, offerings, and giving trends live with beautiful, easy-to-understand charts.",
      color: "blue",
      isLive: true
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Member Management",
      description: "Maintain complete member profiles including their giving history, attendance, and contact information.",
      color: "slate"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Attendance Tracking",
      description: "Mark and monitor attendance for every Sunday service to ensure no member falls through the cracks.",
      color: "green"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Christian Education",
      description: "Automated Friday Bible study reminders and lesson materials sent directly to members' inboxes.",
      color: "rose"
    }
  ]

  return (
    <section id="features" className="py-24 md:py-32 bg-slate-50 flex justify-center w-full">
      <div className="w-full max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-teal-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-4"
            >
              <div className="w-8 h-[2px] bg-teal-600" />
              Advanced Capabilities
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-4xl md:text-6xl text-slate-900 leading-tight font-black"
            >
              Built for the <br />
              <span className="text-teal-600">Modern Ministry.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 text-lg md:text-xl font-dmsans max-w-md leading-relaxed"
          >
            Everything you need to manage your congregation efficiently, allowing you to focus on what truly matters — spiritual growth.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Animated Accent */}
              <div className={`absolute top-0 left-0 w-2 h-full bg-teal-600 opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="flex justify-between items-start mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500`}>
                  {feature.icon}
                </div>
                {feature.isLive && (
                  <div className="px-3 py-1 bg-teal-50 rounded-full flex items-center gap-1.5 border border-teal-100">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
                    </span>
                    <span className="text-[9px] font-bold text-teal-700 uppercase tracking-widest">Real-time</span>
                  </div>
                )}
              </div>
              
              <h3 className="font-playfair text-2xl text-slate-900 mb-4 font-black group-hover:text-teal-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-500 text-sm font-dmsans leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
