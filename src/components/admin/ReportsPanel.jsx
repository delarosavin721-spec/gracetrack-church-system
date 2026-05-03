import { useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'
import { useMembers } from '../../hooks/useMembers'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { formatCurrency, formatDate } from '../../utils/weekCode'

const REPORT_TYPES = [
  {
    id: 'monthly_summary',
    label: 'Monthly Summary',
    desc: 'All giving for a specific month',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'member_statement',
    label: 'Member Statement',
    desc: 'Individual annual giving record',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
]

export default function ReportsPanel() {
  const { transactions, loading: txLoading } = useTransactions()
  const { members,      loading: memLoading } = useMembers()
  const [reportType,    setReportType]       = useState('monthly_summary')
  const [selectedMonth, setSelectedMonth]    = useState(new Date().toISOString().slice(0, 7))
  const [selectedMember, setSelectedMember]  = useState('')
  const [selectedYear,  setSelectedYear]     = useState(new Date().getFullYear().toString())
  const [generating,    setGenerating]       = useState(false)

  const generatePDF = async () => {
    setGenerating(true)
    try {
      const doc = new jsPDF()
      doc.setFont('helvetica')

      // Header bar
      doc.setFillColor(12, 191, 199)
      doc.rect(0, 0, 210, 14, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text('GraceTrack Church Management System', 14, 9.5)

      // Title
      doc.setTextColor(15, 23, 42)
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')

      if (reportType === 'monthly_summary') {
        const filtered = transactions.filter(tx => tx.date?.startsWith(selectedMonth))
        const totalTithe    = filtered.filter(t => t.type === 'tithe').reduce((a, t) => a + t.amount, 0)
        const totalOffering = filtered.filter(t => t.type === 'offering').reduce((a, t) => a + t.amount, 0)

        doc.text('Monthly Giving Summary', 14, 26)
        doc.setFontSize(11)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(100)
        doc.text(`Period: ${selectedMonth}`, 14, 34)
        doc.text(`Generated: ${new Date().toLocaleDateString('en-PH')}`, 14, 40)

        // Summary boxes
        doc.setFillColor(239, 254, 251)
        doc.roundedRect(14, 46, 55, 22, 3, 3, 'F')
        doc.setTextColor(10, 155, 163)
        doc.setFontSize(9)
        doc.text('Total Tithes', 16, 53)
        doc.setFontSize(13)
        doc.setFont('helvetica', 'bold')
        doc.text(formatCurrency(totalTithe), 16, 62)

        doc.setFillColor(238, 242, 255)
        doc.roundedRect(75, 46, 55, 22, 3, 3, 'F')
        doc.setTextColor(79, 70, 229)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.text('Total Offerings', 77, 53)
        doc.setFontSize(13)
        doc.setFont('helvetica', 'bold')
        doc.text(formatCurrency(totalOffering), 77, 62)

        doc.setFillColor(248, 250, 252)
        doc.roundedRect(136, 46, 60, 22, 3, 3, 'F')
        doc.setTextColor(15, 23, 42)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.text('Grand Total', 138, 53)
        doc.setFontSize(13)
        doc.setFont('helvetica', 'bold')
        doc.text(formatCurrency(totalTithe + totalOffering), 138, 62)

        doc.autoTable({
          startY: 76,
          head: [['Date', 'Member', 'Type', 'Amount', 'Note']],
          body: filtered.map(tx => [
            formatDate ? formatDate(tx.date) : tx.date,
            tx.memberName,
            tx.type.toUpperCase(),
            formatCurrency(tx.amount),
            tx.note || ''
          ]),
          theme: 'striped',
          headStyles: { fillColor: [12, 191, 199], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
          bodyStyles: { fontSize: 9 },
          alternateRowStyles: { fillColor: [248, 250, 252] },
        })

        doc.save(`GraceTrack_Monthly_${selectedMonth}.pdf`)

      } else if (reportType === 'member_statement') {
        const member = members.find(m => m.id === selectedMember)
        if (!member) { alert('Please select a member.'); return }

        const filtered = transactions.filter(tx => tx.memberId === selectedMember && tx.date?.startsWith(selectedYear))
        const total    = filtered.reduce((a, t) => a + t.amount, 0)

        doc.text(`Annual Giving Statement`, 14, 26)
        doc.setFontSize(11)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(100)
        doc.text(`Year: ${selectedYear}  •  Member: ${member.name}`, 14, 34)
        doc.text(`Email: ${member.email || 'N/A'}  •  Generated: ${new Date().toLocaleDateString('en-PH')}`, 14, 40)

        doc.setFillColor(239, 254, 251)
        doc.roundedRect(14, 46, 90, 22, 3, 3, 'F')
        doc.setTextColor(10, 155, 163)
        doc.setFontSize(9)
        doc.text(`Total Giving in ${selectedYear}`, 16, 53)
        doc.setFontSize(15)
        doc.setFont('helvetica', 'bold')
        doc.text(formatCurrency(total), 16, 63)

        doc.autoTable({
          startY: 76,
          head: [['Date', 'Week Code', 'Type', 'Amount', 'Note']],
          body: filtered.map(tx => [
            formatDate ? formatDate(tx.date) : tx.date,
            tx.weekCode,
            tx.type.toUpperCase(),
            formatCurrency(tx.amount),
            tx.note || ''
          ]),
          theme: 'striped',
          headStyles: { fillColor: [12, 191, 199], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
          bodyStyles: { fontSize: 9 },
        })

        const finalY = doc.lastAutoTable?.finalY || 120
        doc.setFontSize(8)
        doc.setFont('helvetica', 'italic')
        doc.setTextColor(150)
        doc.text('"For God loves a cheerful giver." — 2 Corinthians 9:7', 14, finalY + 12)
        doc.text('Thank you for your generous support. This statement is valid for tax purposes where applicable.', 14, finalY + 18)

        doc.save(`GraceTrack_Statement_${member.name.replace(/\s+/g, '_')}_${selectedYear}.pdf`)
      }
    } finally {
      setGenerating(false)
    }
  }

  if (txLoading || memLoading) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="flex flex-col items-center gap-3">
        <div className="spinner" /><p className="text-sm text-slate-400 animate-pulse">Loading data...</p>
      </div>
    </div>
  )

  return (
    <div className="p-6 sm:p-8 space-y-6 animate-fadeInUp">
      <div>
        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-slate-900">Reports</h1>
        <p className="text-sm text-slate-500 mt-1">Generate and download PDF financial statements</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Report Type */}
        <div className="card-flat p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Select Report Type</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REPORT_TYPES.map(rt => (
              <button
                key={rt.id}
                onClick={() => setReportType(rt.id)}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all
                  ${reportType === rt.id ? 'border-teal-400 bg-teal-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                <div className={`mt-0.5 shrink-0 ${reportType === rt.id ? 'text-teal-600' : 'text-slate-400'}`}>
                  {rt.icon}
                </div>
                <div>
                  <div className={`font-semibold text-sm ${reportType === rt.id ? 'text-teal-800' : 'text-slate-700'}`}>{rt.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{rt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Parameters */}
        <div className="card-flat p-6 space-y-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Parameters</p>
          {reportType === 'monthly_summary' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Month</label>
              <input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="input max-w-xs" />
            </div>
          )}
          {reportType === 'member_statement' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Member</label>
                <select value={selectedMember} onChange={e => setSelectedMember(e.target.value)} className="input">
                  <option value="">— Select member —</option>
                  {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Year</label>
                <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} className="input">
                  {[2026, 2025, 2024, 2023].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Generate */}
        <button
          onClick={generatePDF}
          disabled={generating}
          className="btn-primary gap-2 w-full sm:w-auto px-8 py-3 text-base disabled:opacity-60"
        >
          {generating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF Report
            </>
          )}
        </button>
      </div>
    </div>
  )
}
