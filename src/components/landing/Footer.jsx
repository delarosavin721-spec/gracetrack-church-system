export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-800 text-white pt-16 pb-10 flex justify-center w-full">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-slate-700 p-1">
                <img src="/logo.png" alt="CCCCPGI Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-cormorant font-bold text-2xl tracking-wide">CCCCPGI</span>
            </div>
            <p className="text-gray-400 text-sm font-dmsans leading-relaxed mb-4">
              Christ Centered Christian Church Philippines Global Incorporated.
              A modern church management platform designed to help your congregation grow and thrive.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit text-sm font-bold uppercase tracking-widest mb-5 text-teal-400">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm font-dmsans">
              {['Home', 'About Us', 'Features', 'Events'].map(link => (
                <li key={link}><a href="#" className="hover:text-teal-400 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-outfit text-sm font-bold uppercase tracking-widest mb-5 text-teal-400">Support</h4>
            <ul className="space-y-3 text-gray-400 text-sm font-dmsans">
              {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map(link => (
                <li key={link}><a href="#" className="hover:text-teal-400 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-outfit text-sm font-bold uppercase tracking-widest mb-5 text-teal-400">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm font-dmsans">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z"></path></svg>
                info@ccccpgi.org
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                Contact Support
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 font-dmsans text-sm">
            © {new Date().getFullYear()} CCCCPGI. All rights reserved.
          </p>
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="flex items-center gap-2 font-dmsans text-sm text-gray-500">
              Developed with <span className="text-teal-400">♥</span> by Arvin dela rosa marasigan
            </p>
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">System Developer</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
