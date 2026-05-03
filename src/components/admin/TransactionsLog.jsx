import { useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'
import { formatCurrency, formatDate } from '../../utils/weekCode'
import { deleteTransaction } from '../../firebase/firestore'

export default function TransactionsLog() {
  const { transactions, loading } = useTransactions()
  const [search, setSearch]       = useState('')
  const [typeFilter, setType]     = useState('all')

  const filtered = transactions.filter(tx => {
    const matchSearch = tx.memberName?.toLowerCase().includes(search.toLowerCase()) ||
                        tx.weekCode?.toLowerCase().includes(search.toLowerCase())
    const matchType   = typeFilter === 'all' || tx.type === typeFilter
    return matchSearch && matchType
  })

  const totals = filtered.reduce(
    (acc, tx) => ({ ...acc, [tx.type]: (acc[tx.type] || 0) + tx.amount, total: acc.total + tx.amount }),
    { tithe: 0, offering: 0, total: 0 }
  )

  const handleDelete = async id => {
    if (!confirm('Delete this transaction? This cannot be undone.')) return
    try { await deleteTransaction(id) }
    catch (err) { console.error(err); alert('Failed to delete.') }
  }

  const exportCSV = () => {
    const rows = [
      ['Date', 'Week', 'Member', 'Type', 'Amount', 'Note'],
      ...filtered.map(tx => [`"${tx.date}"`, `"${tx.weekCode}"`, `"${tx.memberName}"`, `"${tx.type}"`, tx.amount, `"${tx.note || ''}"`])
    ]
    const blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' })
    const a    = document.createElement('a')
    a.href     = URL.createObjectURL(blob)
    a.download = `ccccpgi_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="flex flex-col items-center gap-3">
        <div className="spinner" /><p className="text-sm text-slate-400 animate-pulse">Loading transactions...</p>
      </div>
    </div>
  )

  return (
    <div className="p-6 sm:p-8 space-y-6 animate-fadeInUp">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-slate-900">Tithes & Offerings</h1>
          <p className="text-sm text-slate-500 mt-1">Complete log of all giving records</p>
        </div>
        <button onClick={exportCSV} className="btn-ghost gap-2 shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Summary Chips */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 border border-teal-100">
          <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">Tithes</span>
          <span className="font-bold text-teal-700 font-outfit">{formatCurrency(totals.tithe)}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">Offerings</span>
          <span className="font-bold text-indigo-700 font-outfit">{formatCurrency(totals.offering)}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Total</span>
          <span className="font-bold text-slate-800 font-outfit">{formatCurrency(totals.total)}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by member or week..." className="input pl-9"
          />
        </div>
        <select value={typeFilter} onChange={e => setType(e.target.value)} className="input sm:w-44">
          <option value="all">All Types</option>
          <option value="tithe">Tithes Only</option>
          <option value="offering">Offerings Only</option>
        </select>
      </div>

      {/* Table */}
      <div className="card-flat overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-glass w-full">
            <thead>
              <tr>
                <th>Date / Week</th>
                <th>Member</th>
                <th>Type</th>
                <th className="text-right">Amount</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id} className="group">
                  <td>
                    <div className="font-medium text-slate-800 text-sm">{formatDate ? formatDate(tx.date) : tx.date}</div>
                    <div className="text-xs text-slate-400 font-mono">{tx.weekCode}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {tx.memberName?.[0]?.toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-800 text-sm">{tx.memberName}</span>
                    </div>
                  </td>
                  <td>
                    <span className={tx.type === 'tithe' ? 'badge-tithe' : 'badge-offering'}>
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </span>
                    {tx.note && <div className="text-xs text-slate-400 mt-1 truncate max-w-[120px]" title={tx.note}>{tx.note}</div>}
                  </td>
                  <td className="text-right">
                    <span className={`font-bold font-outfit text-sm ${tx.type === 'tithe' ? 'text-teal-600' : 'text-indigo-600'}`}>
                      +{formatCurrency(tx.amount)}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleDelete(tx.id)}
                      className="w-7 h-7 inline-flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="5" className="text-center py-16 text-slate-400 text-sm">
                  {search || typeFilter !== 'all' ? 'No transactions match your filters.' : 'No transactions recorded yet.'}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400 text-right">
            Showing {filtered.length} of {transactions.length} records
          </div>
        )}
      </div>
    </div>
  )
}
