import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function VerseBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <section ref={ref} className="bg-slate-950 py-32 md:py-48 flex justify-center w-full relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-5xl px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div style={{ opacity, scale }}>
          <div className="text-teal-500 text-6xl md:text-8xl font-playfair leading-none h-12 md:h-20 mb-6 opacity-40">"</div>
          <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white italic mb-12 leading-[1.3] font-medium px-4 max-w-4xl tracking-tight">
            Bring the whole tithe into the storehouse... and see if I will not throw open the <span className="text-teal-400 not-italic">floodgates of heaven.</span>
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-[2px] bg-teal-500/50" />
            <p className="font-outfit text-teal-400 tracking-[0.4em] uppercase text-xs md:text-sm font-black">
              Malachi 3:10
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
