import { useState, useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { parseBarcode } from '../../utils/barcodeParser'

export default function ScanCamera({ onScanSuccess, onCancel }) {
  const [error, setError] = useState('')

  useEffect(() => {
    // Initialize scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 100 }, aspectRatio: 1.5 },
      false
    )

    scanner.render((decodedText) => {
      // Handle success
      const parsed = parseBarcode(decodedText)
      if (parsed.valid) {
        // Pause scanner after successful scan
        scanner.pause()
        onScanSuccess(parsed)
      } else {
        setError(`Invalid barcode: ${parsed.error}`)
        setTimeout(() => setError(''), 3000)
      }
    }, (err) => {
      // Handle normal scanning errors silently (e.g. no barcode found in frame)
    })

    return () => {
      // Cleanup
      try {
        scanner.clear()
      } catch (e) {
        console.error("Failed to clear scanner on unmount", e)
      }
    }
  }, [onScanSuccess])

  return (
    <div className="max-w-md mx-auto relative mt-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-playfair text-2xl text-gray-800 font-bold">
          Scanning Envelope...
        </h3>
        <button onClick={onCancel} className="text-gray-500 hover:text-red-500 transition-colors font-dmsans font-semibold text-sm">
          Cancel
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mb-4 text-center font-dmsans">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-2">
        <div id="reader" className="w-full rounded-lg overflow-hidden"></div>
      </div>
      
      <div className="mt-6 text-center text-muted text-sm font-dmsans">
        Align the barcode within the frame to scan automatically.
      </div>
    </div>
  )
}
