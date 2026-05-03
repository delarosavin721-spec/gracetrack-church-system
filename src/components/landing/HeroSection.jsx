import { motion } from 'framer-motion'

export default function HeroSection({ onOpenRegister }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Parallax-like scale */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      
      {/* Sophisticated Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-50 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-8 pt-20 flex flex-col items-center text-center">
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Live Badge */}
          <motion.div 
            variants={item}
            className="flex items-center gap-2 mb-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-2xl"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </div>
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Live Management Active</span>
          </motion.div>
          
          <motion.h1 
            variants={item} 
            className="font-playfair text-5xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight"
          >
            Faith Meets<br />
            <span className="text-teal-400">Innovation.</span>
          </motion.h1>

          <motion.p 
            variants={item} 
            className="text-white/70 text-lg md:text-2xl font-dmsans font-medium mb-12 max-w-2xl leading-relaxed"
          >
            The all-in-one digital sanctuary for <span className="text-white">CCCCPGI</span>. 
            Automate your administration, engage your members, and witness the growth of your community in real-time.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={onOpenRegister} 
              className="group relative px-10 py-5 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl shadow-teal-900/40 hover:-translate-y-1 active:scale-95 flex items-center gap-3"
            >
              Start Free Trial
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
            
            <a 
              href="#features" 
              className="px-10 py-5 text-white/80 hover:text-white font-bold text-lg transition-colors flex items-center gap-2 group"
            >
              Watch Video
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </a>
          </motion.div>

        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-teal-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
