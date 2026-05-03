import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function VerseBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="verse-banner py-24 md:py-32 flex justify-center w-full relative overflow-hidden">
      <div className="w-full max-w-4xl px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div style={{ opacity }}>
          <div className="text-white/20 text-6xl md:text-8xl font-playfair leading-none h-10 md:h-16 mb-4">"</div>
          <h2 className="font-playfair text-2xl md:text-4xl text-white italic mb-8 leading-relaxed font-light px-4">
            Bring the whole tithe into the storehouse... and see if I will not throw open the floodgates of heaven.
          </h2>
          <p className="font-outfit text-teal-300 tracking-widest uppercase text-sm font-semibold">
            — Malachi 3:10
          </p>
        </motion.div>
      </div>
    </section>
  )
}
