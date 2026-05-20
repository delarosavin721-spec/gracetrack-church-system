export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className="text-white pt-16 pb-8 flex justify-center w-full relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0F172A 0%, #030712 100%)' }}>

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(12,191,199,0.4), transparent)' }} />
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-[120px] opacity-5"
        style={{ background: '#0CBFC7' }} />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full blur-[100px] opacity-5"
        style={{ background: '#6366F1' }} />

      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 border border-white/10 p-1 shrink-0">
                <img src="/logo.png" alt="CCCCPGI Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-playfair font-bold text-xl text-white leading-none">CCCCPGI</div>
                <div className="text-[9px] text-teal-400 uppercase tracking-[0.18em] font-bold mt-0.5">Church System</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm font-dmsans leading-relaxed mb-5">
              Christ Centered Christian Church Philippines Global Incorporated.
              A modern church management platform designed to help your congregation thrive.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Facebook', icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /> },
                { label: 'YouTube',  icon: <><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" /></> },
                { label: 'Email',    icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></> },
              ].map(social => (
                <a key={social.label} href="#" aria-label={social.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:-translate-y-0.5"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(12,191,199,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                >
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit text-xs font-black uppercase tracking-[0.2em] mb-5 text-teal-400">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm font-dmsans">
              {['Home', 'About Us', 'Features', 'Events', 'Donate'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-teal-500 transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-outfit text-xs font-black uppercase tracking-[0.2em] mb-5 text-teal-400">Support</h4>
            <ul className="space-y-3 text-slate-400 text-sm font-dmsans">
              {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Us', 'Report Issue'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-teal-500 transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-outfit text-xs font-black uppercase tracking-[0.2em] mb-5 text-teal-400">Contact</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-dmsans">
              <li>
                <a href="mailto:info@ccccpgi.org" className="flex items-start gap-3 hover:text-teal-400 transition-colors group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(12,191,199,0.1)', border: '1px solid rgba(12,191,199,0.15)' }}>
                    <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Email</div>
                    info@ccccpgi.org
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(12,191,199,0.1)', border: '1px solid rgba(12,191,199,0.15)' }}>
                    <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Location</div>
                    Philippines
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-slate-500 font-dmsans text-sm">
            © {year} CCCCPGI. All rights reserved.
          </p>
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="flex items-center gap-2 font-dmsans text-sm text-slate-500">
              Developed with{' '}
              <span className="text-teal-400 text-base">♥</span>
              {' '}by{' '}
              <span className="text-slate-300 font-semibold">Arvin dela rosa marasigan</span>
            </p>
            <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em]">System Developer</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
