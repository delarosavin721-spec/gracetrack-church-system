/**
 * Parse barcode string format: TITHE-{memberUID}-{weekCode} or OFFERING-{memberUID}-{weekCode}
 */
export const parseBarcode = (barcodeStr) => {
  if (!barcodeStr || typeof barcodeStr !== 'string') {
    return { valid: false, error: 'Empty or invalid barcode' }
  }

  const parts = barcodeStr.trim().split('-')
  
  // Format: TYPE-MEMBERID-YEAR-WXX
  if (parts.length < 3) {
    return { valid: false, error: 'Invalid barcode format' }
  }

  const type = parts[0].toLowerCase()
  
  if (type !== 'tithe' && type !== 'offering') {
    return { valid: false, error: `Unknown type: ${parts[0]}` }
  }

  // memberId is everything between the type prefix and the last two parts (YYYY-WXX)
  const weekCode = `${parts[parts.length - 2]}-${parts[parts.length - 1]}`
  const memberId = parts.slice(1, parts.length - 2).join('-')

  if (!memberId) {
    return { valid: false, error: 'Missing member ID' }
  }

  if (!/^\d{4}-W\d{2}$/.test(weekCode)) {
    return { valid: false, error: `Invalid week code: ${weekCode}` }
  }

  return {
    valid: true,
    type,
    memberId,
    weekCode,
  }
}

/**
 * Generate barcode string for a member
 */
export const generateBarcodeString = (type, memberId, weekCode) => {
  return `${type.toUpperCase()}-${memberId}-${weekCode}`
}
