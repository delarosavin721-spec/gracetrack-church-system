import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollNavbar } from '../../hooks/useScrollNavbar'

export default function LandingNavbar({ onOpenLogin, onOpenRegister }) {
  const isScrolled = useScrollNavbar(50)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home',    href: '#' },
    { name: 'About',   href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Contact', href: '#footer' },
  ]

  return (
    <>
      {/* ── Utility Bar ── */}
      <div className="landing-topbar text-white text-xs py-2 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-6">
          <p className="hidden sm:block text-slate-400 text-[10px] tracking-widest uppercase font-semibold">
            Christ Centered Christian Church Philippines GI
          </p>
          <div className="flex items-center gap-5 ml-auto">
            <a href="#" className="hover:text-teal-400 transition-colors hidden sm:inline text-slate-400 font-medium">Plan Your Visit</a>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <a href="#" className="hover:text-teal-400 transition-colors hidden sm:inline text-slate-400 font-medium">Events</a>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <button
              onClick={onOpenRegister}
              className="text-teal-400 hover:text-teal-300 transition-colors font-bold tracking-wide"
            >
              Donate Now ↗
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'fixed top-0 glass py-3 border-b border-slate-200/80 shadow-lg shadow-slate-200/40'
            : 'relative py-0 border-b border-white/[0.06]'
        }`}
        style={!isScrolled ? { background: 'rgba(11, 18, 32, 0.75)', backdropFilter: 'blur(12px)' } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white/10 border border-white/20 group-hover:bg-white/20 transition-all p-1">
                <img src="/logo.png" alt="CCCCPGI Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className={`font-playfair font-bold text-xl tracking-wide leading-none transition-colors ${
                  isScrolled ? 'text-slate-900' : 'text-white'
                }`}>CCCCPGI</span>
                <span className={`text-[9px] uppercase tracking-[0.2em] font-bold leading-none mt-0.5 transition-colors ${
                  isScrolled ? 'text-teal-600' : 'text-teal-400'
                }`}>Church System</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold px-4 py-5 transition-all border-b-2 border-transparent hover:border-teal-500 ${
                    isScrolled
                      ? 'text-slate-600 hover:text-teal-600 hover:bg-teal-50/50'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              ))}

              <div className="flex items-center gap-3 ml-4">
                <button
                  onClick={onOpenLogin}
                  className={`text-sm font-bold px-5 py-2.5 rounded-xl border transition-all ${
                    isScrolled
                      ? 'text-slate-700 border-slate-200 hover:border-teal-400 hover:text-teal-600 bg-white'
                      : 'text-white border-white/20 hover:border-white/50 hover:bg-white/10'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={onOpenRegister}
                  className="text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all shadow-lg hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #0CBFC7 0%, #0891b2 100%)', boxShadow: '0 4px 15px rgba(12,191,199,0.3)' }}
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span className={`block h-0.5 rounded transition-all ${isScrolled ? 'bg-slate-800' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 rounded transition-all ${isScrolled ? 'bg-slate-800' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-0.5 rounded transition-all ${isScrolled ? 'bg-slate-800' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[90px] left-0 w-full bg-white z-40 border-b border-gray-100 shadow-2xl overflow-hidden md:hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-base font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50 py-3 px-4 rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3 border-t border-slate-100 mt-3">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenLogin() }}
                  className="w-full btn-outline py-3.5 text-center text-base"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenRegister() }}
                  className="w-full btn-primary py-3.5 text-center text-base"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
