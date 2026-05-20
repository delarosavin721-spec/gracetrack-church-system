import { useState } from 'react'
import ScanCamera from './ScanCamera'
import AmountEntry from './AmountEntry'
import PageHeader from '../shared/PageHeader'

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
    <div className="page-content max-w-md mx-auto">
      <PageHeader
        eyebrow="live"
        title="Usher Station"
        description="Scan a member's envelope QR code to record tithe or offering instantly."
      />

      <div className="relative group w-full mb-6">
        <div className="absolute -inset-2 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
          style={{ background: 'linear-gradient(135deg, rgba(12,191,199,0.25), rgba(99,102,241,0.15))' }} />

        <button
          type="button"
          onClick={() => setIsScanning(true)}
          className="relative w-full premium-card p-8 flex flex-col items-center gap-5 transition-all duration-300 hover:-translate-y-1 group-hover:border-teal-200/80"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl"
              style={{ background: 'linear-gradient(135deg, #0CBFC7 0%, #0891b2 100%)', boxShadow: '0 16px 40px rgba(12,191,199,0.35)' }}>
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border-2 border-teal-100 flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <div className="font-playfair text-2xl font-black text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
              Scan Envelope
            </div>
            <p className="text-xs text-slate-400 font-medium">Hold the QR code steady in frame</p>
          </div>

          <span className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 btn-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Start Scanning
          </span>
        </button>
      </div>

      <div className="premium-card-flat p-4 grid grid-cols-3 gap-2 text-center">
        {[
          { label: 'Tithes', color: '#0CBFC7' },
          { label: 'Offerings', color: '#6366F1' },
          { label: 'Live Sync', color: '#22C55E' },
        ].map((item) => (
          <div key={item.label} className="py-2">
            <div className="w-2 h-2 rounded-full mx-auto mb-1.5" style={{ background: item.color }} />
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
