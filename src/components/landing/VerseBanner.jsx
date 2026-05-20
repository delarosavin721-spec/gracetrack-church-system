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
    <section ref={ref} className="py-32 md:py-48 flex justify-center w-full relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030712 0%, #0F172A 50%, #134e4a 100%)' }}>
      <div className="absolute inset-0 grid-pattern-dark opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,40rem)] h-64 rounded-full blur-[100px] opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(12,191,199,0.35), transparent 70%)' }} />

      <div className="w-full max-w-5xl px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div style={{ opacity, scale }} className="flex flex-col items-center">
          <div className="text-teal-500 text-6xl md:text-9xl font-playfair leading-none h-16 md:h-24 mb-4 md:mb-8 opacity-20">"</div>
          <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white italic mb-12 md:mb-16 leading-[1.3] font-medium px-4 max-w-4xl tracking-tight">
            Bring the whole tithe into the storehouse... and see if I will not throw open the <span className="text-teal-400 not-italic">floodgates of heaven.</span>
          </h2>
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-[2px] bg-teal-500/30" />
            <p className="font-outfit text-teal-400 tracking-[0.5em] uppercase text-xs md:text-sm font-black">
              Malachi 3:10
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
