import { useState, useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { parseBarcode } from '../../utils/barcodeParser'

export default function ScanCamera({ onScanSuccess, onCancel }) {
  const [error, setError] = useState('')
  const [isInitializing, setIsInitializing] = useState(true)
  const scannerRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader")
    scannerRef.current = html5QrCode

    const startScanner = async () => {
      try {
        // Preferred camera: environment (back camera)
        const config = { fps: 10, qrbox: { width: 280, height: 280 } }
        
        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            const parsed = parseBarcode(decodedText)
            if (parsed.valid) {
              // Play beep sound
              if (audioRef.current) {
                audioRef.current.currentTime = 0
                audioRef.current.play().catch(e => console.error('Audio playback failed:', e))
              }
              
              html5QrCode.stop().then(() => {
                onScanSuccess(parsed)
              })
            } else {
              setError(`Invalid Code: ${parsed.error}`)
              setTimeout(() => setError(''), 3000)
            }
          }
        )
        setIsInitializing(false)
      } catch (err) {
        console.error("Camera Error:", err)
        setError("Camera Error: Please ensure you have granted camera permissions.")
        setIsInitializing(false)
      }
    }

    startScanner()

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(e => console.error(e))
      }
    }
  }, [onScanSuccess])

  return (
    <div className="max-w-md mx-auto relative mt-4 px-4 sm:px-0 animate-fadeInUp">
      {/* Hidden audio element for beep sound */}
      <audio ref={audioRef} src="/Barcode scanner beep sound (sound effect).mp3" />
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-playfair text-2xl text-slate-900 font-bold">
            QR Scanner
          </h3>
          <p className="text-xs text-slate-500 font-medium font-dmsans">Point your camera at the QR code</p>
        </div>
        <button onClick={onCancel} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all font-bold text-xs uppercase tracking-wider">
          Cancel
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl text-sm mb-6 text-center font-bold flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          {error}
        </div>
      )}

      <div className="relative glass border-white rounded-[2rem] shadow-2xl overflow-hidden p-3 aspect-square bg-slate-900">
        {isInitializing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 z-10">
            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white text-sm font-bold tracking-widest uppercase opacity-50">Starting Camera...</p>
          </div>
        )}
        
        <div id="reader" className="w-full h-full rounded-2xl overflow-hidden"></div>
        
        {/* Decorative corner brackets */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-teal-500 rounded-tl-xl pointer-events-none opacity-50" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-teal-500 rounded-tr-xl pointer-events-none opacity-50" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-teal-500 rounded-bl-xl pointer-events-none opacity-50" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-teal-500 rounded-br-xl pointer-events-none opacity-50" />
      </div>
      
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 py-2 px-4 bg-teal-50 rounded-full border border-teal-100">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest">Awaiting Scan...</span>
        </div>
        <p className="text-center text-slate-400 text-sm font-medium max-w-[240px]">
          Make sure your camera has enough light and the QR code is clear.
        </p>
      </div>
    </div>
  )
}
