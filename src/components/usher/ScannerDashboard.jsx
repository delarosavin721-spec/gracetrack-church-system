import { useState } from 'react'
import ScanCamera from './ScanCamera'
import AmountEntry from './AmountEntry'
import PageHeader from '../shared/PageHeader'

const FEATURES = [
  { label: 'Tithes', color: '#0CBFC7', desc: 'Ikapu recording' },
  { label: 'Offerings', color: '#6366F1', desc: 'Handog & gifts' },
  { label: 'Live Sync', color: '#22C55E', desc: 'Cloud backup' },
]

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
    <div className="page-content usher-page space-y-6">
      <PageHeader
        eyebrow="live"
        title="Usher Station"
        description="Scan a member's envelope QR code to record tithe or offering instantly."
      />

      <button type="button" onClick={() => setIsScanning(true)} className="usher-scan-hero w-full text-left">
        <span className="usher-scan-hero__glow" aria-hidden />
        <span className="usher-scan-hero__inner flex flex-col items-center">
          <span className="usher-scan-hero__icon-wrap">
            <span className="usher-scan-hero__icon">
              <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </span>
            <span className="usher-scan-hero__badge">
              <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </span>
          </span>

          <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-1">Scan Envelope</h2>
          <p className="text-sm text-slate-500 mb-5">Hold the QR code steady in frame</p>

          <span className="auth-submit w-full max-w-[240px] py-3.5 text-sm pointer-events-none">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Start Scanning
          </span>
        </span>
      </button>

      <div className="usher-feature-grid">
        {FEATURES.map((item) => (
          <div key={item.label} className="usher-feature-card">
            <div className="usher-feature-card__dot" style={{ background: item.color }} />
            <p className="usher-feature-card__label">{item.label}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
