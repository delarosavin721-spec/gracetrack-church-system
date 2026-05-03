/**
 * Parse barcode string format: TITHE-{memberUID}-{weekCode} or OFFERING-{memberUID}-{weekCode}
 */
export const parseBarcode = (barcodeStr) => {
  if (!barcodeStr || typeof barcodeStr !== 'string') {
    return { valid: false, error: 'Empty or invalid barcode' }
  }

  const str = barcodeStr.trim()
  const parts = str.split('-')
  
  // 1. Try to parse the structured format: TYPE-MEMBERID-YEAR-WXX
  // Standard format has at least 4 parts (e.g. TITHE-ID-2026-W18)
  if (parts.length >= 4) {
    const type = parts[0].toLowerCase()
    const weekCode = `${parts[parts.length - 2]}-${parts[parts.length - 1]}`
    
    if ((type === 'tithe' || type === 'offering') && /^\d{4}-W\d{2}$/.test(weekCode)) {
      const memberId = parts.slice(1, parts.length - 2).join('-')
      return {
        valid: true,
        type,
        memberId,
        weekCode,
      }
    }
  }

  // 2. Fallback: Treat the whole string as a Member ID
  // This allows simple QR codes that just contain the ID to work
  // We default to 'tithe' and current week if we can't determine them
  import('./weekCode').then(({ getCurrentWeekCode }) => {
    // Note: This is an async import, but we need a sync return for standard usage.
    // However, in our React component we can handle this or just use a default.
  }).catch(() => {})

  // For simplicity and immediate fix, we'll return it as a possible member ID
  // The AmountEntry component will try to find this ID in Firestore.
  return {
    valid: true,
    type: 'tithe', // default
    memberId: str,
    weekCode: 'AUTO', // Signal to component to use current week
    isSimpleId: true
  }
}

/**
 * Generate barcode string for a member
 */
export const generateBarcodeString = (type, memberId, weekCode) => {
  return `${type.toUpperCase()}-${memberId}-${weekCode}`
}
