import { useRef, useState } from 'react'
import { generateBarcodeString } from '../../utils/barcodeParser'
import { getCurrentWeekCode, getWeekLabel } from '../../utils/weekCode'
import { QRCodeCanvas } from 'qrcode.react'

export default function EnvelopeGenerator({ member, onClose }) {
  const titheRef   = useRef()
  const offeringRef = useRef()
  const [weekCode, setWeekCode] = useState(getCurrentWeekCode())

  const downloadQR = (ref, type) => {
    const canvas = ref.current?.querySelector('canvas')
    if (!canvas) return
    const a = document.createElement('a')
    a.href     = canvas.toDataURL('image/png')
    a.download = `QR_${type}_${member.name.replace(/\s+/g, '_')}_${weekCode}.png`
    a.click()
  }

  const titheBarcodeStr    = generateBarcodeString('tithe',    member.id, weekCode)
  const offeringBarcodeStr = generateBarcodeString('offering', member.id, weekCode)

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card max-w-lg animate-fadeInUp">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-playfair text-xl font-bold text-slate-900">Download QR Codes</h3>
            <p className="text-sm text-slate-500 mt-0.5">{member.name}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Week selector */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-teal-50 border border-teal-100 mb-6">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-teal-700 uppercase tracking-widest mb-1.5">Service Week</label>
            <input
              type="week" value={weekCode} onChange={e => setWeekCode(e.target.value)}
              className="input text-sm"
            />
          </div>
          <div className="text-sm text-teal-600 font-semibold shrink-0">
            {getWeekLabel(weekCode)}
          </div>
        </div>

        {/* QR Card */}
        <div className="flex flex-col items-center p-8 bg-slate-50 rounded-3xl border border-slate-200 gap-6 mb-6 shadow-inner">
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Official Member QR</p>
            <h4 className="font-playfair text-2xl font-bold text-slate-800 tracking-tight">{member.name}</h4>
          </div>
          
          <div ref={titheRef} className="p-4 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <QRCodeCanvas 
              value={member.id} 
              size={180} 
              level="H" 
              includeMargin 
            />
          </div>

          <button
            onClick={() => downloadQR(titheRef, 'MEMBER')}
            className="btn-primary w-full py-4 text-sm gap-2.5 shadow-teal-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Member QR
          </button>
        </div>

        <button onClick={onClose} className="w-full text-center text-sm text-slate-400 hover:text-slate-600 transition-colors py-1">
          Done
        </button>
      </div>
    </div>
  )
}
