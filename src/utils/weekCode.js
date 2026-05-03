/**
 * Generate ISO week code: YYYY-WXX
 * e.g., 2025-W18
 */
export const getWeekCode = (date = new Date()) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7))
  const week1 = new Date(d.getFullYear(), 0, 4)
  const weekNum = 1 + Math.round(((d - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
  const year = d.getFullYear()
  return `${year}-W${String(weekNum).padStart(2, '0')}`
}

export const getCurrentWeekCode = () => getWeekCode(new Date())

export const getWeekLabel = (weekCode) => {
  const [year, week] = weekCode.split('-W')
  return `Week ${week}, ${year}`
}

export const weekCodeToDateRange = (weekCode) => {
  const [year, week] = weekCode.split('-W')
  const y = parseInt(year)
  const w = parseInt(week)
  const jan4 = new Date(y, 0, 4)
  const startOfWeek1 = new Date(jan4)
  startOfWeek1.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7))
  const startDate = new Date(startOfWeek1)
  startDate.setDate(startOfWeek1.getDate() + (w - 1) * 7)
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)
  return {
    start: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    end: endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(amount)
}
