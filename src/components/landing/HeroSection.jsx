import { motion } from 'framer-motion'

export default function HeroSection({ onOpenRegister }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <section className="relative h-[70vh] min-h-[450px] max-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      {/* Warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-8 flex justify-center text-center">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl flex flex-col items-center">
          
          <motion.h1 
            variants={item} 
            className="font-cormorant text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-[1.1] tracking-wide uppercase"
            style={{ textShadow: '2px 4px 12px rgba(0,0,0,0.4)' }}
          >
            Find Your Way<br />Back Home
          </motion.h1>

          <motion.p variants={item} className="text-white/80 text-lg md:text-xl font-outfit font-light mb-8 max-w-lg">
            Streamline your church's administration with CCCCPGI — the modern platform built for faithful communities.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <button 
              onClick={onOpenRegister} 
              className="btn-gold py-3 px-8 text-base flex items-center gap-2 shadow-xl"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
            <a 
              href="#features" 
              className="py-3 px-8 text-base text-white border-2 border-white/50 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all backdrop-blur-sm"
            >
              Learn More
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
