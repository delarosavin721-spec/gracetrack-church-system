import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function AuthModal({ isOpen, onClose, children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
  }

  const modalVariants = isMobile
    ? {
        hidden: { y: '100%' },
        visible: { y: 0, transition: { type: 'spring', damping: 28, stiffness: 220 } },
        exit: { y: '100%', transition: { duration: 0.28 } },
      }
    : {
        hidden: { scale: 0.94, opacity: 0, y: 24 },
        visible: { scale: 1, opacity: 1, y: 0, transition: { type: 'spring', damping: 26, stiffness: 280 } },
        exit: { scale: 0.96, opacity: 0, y: 16, transition: { duration: 0.2 } },
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop">
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 bg-slate-950/80"
            onClick={onClose}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full max-w-[52rem] mx-auto my-auto flex-shrink-0 ${
              isMobile ? 'absolute bottom-0 rounded-t-[1.75rem] rounded-b-none max-w-full' : ''
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`auth-modal-split bg-white shadow-2xl ${isMobile ? 'rounded-t-[1.75rem]' : 'rounded-[1.75rem]'} overflow-hidden border border-white/10`}>
              {/* Brand panel — desktop */}
              <div className="auth-modal-brand">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 p-1.5 flex items-center justify-center">
                      <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="font-playfair font-bold text-lg text-white">CCCCPGI</p>
                      <p className="text-[9px] text-teal-400 uppercase tracking-[0.2em] font-bold">Church System</p>
                    </div>
                  </div>
                  <h3 className="font-playfair text-2xl text-white font-bold leading-snug mb-3">
                    Manage your ministry with clarity and grace.
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-[220px]">
                    Secure access for admins and ushers. Real-time tithes, offerings, and member records.
                  </p>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2">
                  {['QR Scanning', 'Live Dashboard', 'Member Care'].map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-teal-300/90 border border-teal-500/25 bg-teal-500/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Form panel */}
              <div className="auth-modal-form relative min-h-[280px]">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {isMobile && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-slate-200" />
                )}
                <div className="w-full max-h-[78vh] overflow-y-auto pr-1 pt-2">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
