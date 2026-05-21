import { createPortal } from 'react-dom'
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

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Sign in or register">
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
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
            <div className={`auth-modal-split bg-white shadow-[0_32px_64px_-16px_rgba(15,23,42,0.2)] ${isMobile ? 'rounded-t-[1.75rem]' : 'rounded-[1.75rem]'} overflow-hidden ring-1 ring-slate-200/80`}>
              {/* Brand panel — desktop */}
              <div className="auth-modal-brand">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 p-2 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-black/20">
                      <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="font-playfair font-bold text-xl text-white tracking-tight">CCCCPGI</p>
                      <p className="text-[10px] text-teal-300/90 uppercase tracking-[0.22em] font-bold">Church System</p>
                    </div>
                  </div>
                  <h3 className="font-playfair text-[1.65rem] text-white font-bold leading-snug mb-4 max-w-[240px]">
                    Ministry tools built for your church.
                  </h3>
                  <p className="text-sm text-slate-400/95 leading-relaxed max-w-[230px]">
                    Sign in to manage tithes, offerings, members, and usher scanning — all in one place.
                  </p>
                </div>
                <ul className="relative z-10 space-y-3 mt-8">
                  {[
                    { label: 'Real-time giving', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'QR member scan', icon: 'M12 4v1m6 11h2m-6 6v-2m0-14a2 2 0 100 4 2 2 0 000-4zm-8 8a2 2 0 100 4 2 2 0 000-4zm14-4a2 2 0 11-4 0 2 2 0 014 0zM6 12a2 2 0 11-4 0 2 2 0 014 0z' },
                    { label: 'Admin dashboard', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-400/20 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form panel */}
              <div className="auth-modal-form relative min-h-[300px]">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/60 transition-all"
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

  return createPortal(modal, document.body)
}
