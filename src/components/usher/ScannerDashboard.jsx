import { useState } from 'react'
import ScanCamera from './ScanCamera'
import AmountEntry from './AmountEntry'

export default function ScannerDashboard() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState(null)

  if (scannedData) {
    return <AmountEntry data={scannedData} onComplete={() => setScannedData(null)} onCancel={() => setScannedData(null)} />
  }

  if (isScanning) {
    return <ScanCamera onScanSuccess={setScannedData} onCancel={() => setIsScanning(false)} />
  }

  return (
    <div className="min-h-full flex flex-col animate-fadeInUp py-4">
      <div className="m-auto w-full max-w-sm flex flex-col items-center">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="pulse-live" />
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Scanner Active</span>
          </div>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-xl shadow-teal-200/50 mb-4 transform -rotate-3">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="font-playfair text-3xl font-bold text-slate-900 mb-2">Usher Station</h1>
          <p className="text-slate-500 text-sm max-w-[280px] sm:max-w-sm mx-auto">
            Scan a member's envelope QR code to record their tithe or offering instantly.
          </p>
        </div>

        {/* Scan button */}
        <div className="relative group w-full">
          {/* Glow ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity animate-pulse" />

          <button
            onClick={() => setIsScanning(true)}
            className="relative w-full glass border-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 hover:shadow-teal-200/40 hover:-translate-y-2 transition-all duration-500 p-8 sm:p-12 flex flex-col items-center gap-6"
          >
            {/* Scanner icon box */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[2rem] bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center text-teal-600 group-hover:from-teal-500 group-hover:to-teal-600 group-hover:text-white transition-all duration-500 shadow-inner shrink-0">
              <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>

            <div className="text-center">
              <div className="font-playfair text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Scan Envelope</div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                Hold the QR code steady in the frame
              </p>
            </div>

            <div className="btn-primary px-8 py-3.5 w-full rounded-2xl text-base justify-center mt-2 group-hover:scale-105 transition-transform duration-300">
              Start Scanning
            </div>
          </button>
        </div>

        {/* Info strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 rounded-full bg-teal-400" />
            Tithes
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 rounded-full bg-indigo-400" />
            Offerings
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 pulse-live" />
            Live Sync
          </div>
        </div>
      </div>
    </div>
  )
}
