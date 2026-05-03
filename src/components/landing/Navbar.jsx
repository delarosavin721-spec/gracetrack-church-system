import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollNavbar } from '../../hooks/useScrollNavbar'

export default function LandingNavbar({ onOpenLogin, onOpenRegister }) {
  const isScrolled = useScrollNavbar(50)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#features' },
    { name: 'Events', href: '#how-it-works' },
    { name: 'Contact', href: '#footer' },
  ]

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-gray-800 text-white text-xs py-2 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center gap-6">
          <a href="#" className="hover:text-teal-400 transition-colors hidden sm:inline">Plan Your Visit</a>
          <span className="text-gray-500 hidden sm:inline">/</span>
          <a href="#" className="hover:text-teal-400 transition-colors hidden sm:inline">Calendar</a>
          <span className="text-gray-500 hidden sm:inline">/</span>
          <button onClick={onOpenRegister} className="hover:text-teal-400 transition-colors font-semibold">
            Donate Now
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full z-50 transition-all duration-300 ${
          isScrolled ? 'fixed top-0 navbar-scrolled py-3 shadow-lg' : 'relative bg-teal-600 py-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                isScrolled ? 'bg-teal-600 text-white' : 'bg-white/20 text-white'
              }`}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 2v6h-4v4h4v10h4v-10h4v-4h-4v-6h-4z"/>
                </svg>
              </div>
              <span className={`font-cormorant font-bold text-2xl tracking-wide ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>GraceTrack</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-wider px-5 py-5 transition-colors border-b-3 ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-teal-600 hover:bg-gray-50' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={onOpenLogin}
                className={`text-sm font-semibold uppercase tracking-wider px-5 py-5 transition-colors ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-teal-600 hover:bg-gray-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block w-6 h-0.5 rounded transition-all ${isScrolled ? 'bg-gray-800' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 rounded transition-all ${isScrolled ? 'bg-gray-800' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 rounded transition-all ${isScrolled ? 'bg-gray-800' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
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
            className="fixed top-[90px] left-0 w-full bg-white z-40 border-b border-gray-200 shadow-lg overflow-hidden md:hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-semibold text-gray-700 hover:text-teal-600 hover:bg-gray-50 py-3 px-4 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3 border-t border-gray-100 mt-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenLogin(); }}
                  className="w-full btn-outline-gold py-3 text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenRegister(); }}
                  className="w-full btn-gold py-3 text-center"
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
