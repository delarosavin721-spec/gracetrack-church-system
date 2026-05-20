import { useState } from 'react'
import { useMembers } from '../../hooks/useMembers'
import { addMember, updateMember, deleteMember } from '../../firebase/firestore'
import EnvelopeGenerator from './EnvelopeGenerator'

function MemberModal({ member, onClose, onSave }) {
  const [form, setForm] = useState(member || { name: '', email: '', phone: '', address: '', active: true })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const update = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name.trim()) { setError('Name is required'); return }
    setSaving(true); setError('')
    try {
      if (member?.id) await updateMember(member.id, form)
      else             await addMember(form)
      onSave()
    } catch (err) {
      console.error(err)
      setError('Failed to save member. Please try again.')
      setSaving(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card animate-fadeInUp">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-playfair text-xl font-bold text-slate-900">
            {member?.id ? 'Edit Member' : 'Add New Member'}
          </h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name *</label>
            <input required type="text" value={form.name} onChange={update('name')} placeholder="Juan dela Cruz" className="input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={update('email')} placeholder="juan@email.com" className="input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Phone</label>
            <input type="tel" value={form.phone} onChange={update('phone')} placeholder="09XX XXX XXXX" className="input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Address</label>
            <textarea value={form.address} onChange={update('address')} placeholder="Street, City, Province" rows={2} className="input resize-none" />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <input type="checkbox" id="active" checked={form.active !== false} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="w-4 h-4 accent-teal-500 rounded" />
            <label htmlFor="active" className="text-sm font-medium text-slate-700 cursor-pointer">Active member</label>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 btn-ghost">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 btn-primary">
              {saving ? 'Saving...' : member?.id ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function MembersTable() {
  const { members, loading } = useMembers()
  const [search, setSearch] = useState('')
  const [modal, setModal]   = useState(null)   // null | 'add' | member-object
  const [printing, setPrinting] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const filtered = members.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase()) ||
    m.phone?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (member) => {
    if (!confirm(`Delete ${member.name}? This cannot be undone.`)) return
    setDeleting(member.id)
    try { await deleteMember(member.id) }
    catch (err) { console.error(err); alert('Error deleting member') }
    finally { setDeleting(null) }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="flex flex-col items-center gap-3">
        <div className="spinner" />
        <p className="text-sm text-slate-400 animate-pulse">Loading members...</p>
      </div>
    </div>
  )

  return (
    <>
      <div className="page-content space-y-6">
        {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-slate-900">Member Directory</h1>
          <p className="text-sm text-slate-500 mt-1">{members.length} {members.length === 1 ? 'member' : 'members'} registered</p>
        </div>
        <button
          onClick={() => setModal('add')}
          className="btn-primary gap-2 shrink-0"
          id="add-member-btn"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Member
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input pl-9"
        />
      </div>

      {/* Table */}
      <div className="card-flat overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-glass w-full">
            <thead>
              <tr>
                <th>Member</th>
                <th className="hidden sm:table-cell">Contact</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(member => (
                <tr key={member.id} className="group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {member.name?.[0]?.toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 text-sm truncate">{member.name}</div>
                        <div className="text-xs text-slate-400 sm:hidden truncate">{member.phone || member.email || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell">
                    <div className="text-sm text-slate-600">{member.email || '—'}</div>
                    <div className="text-xs text-slate-400">{member.phone || ''}</div>
                  </td>
                  <td>
                    <span className={member.active !== false ? 'badge-active' : 'badge-inactive'}>
                      {member.active !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      {/* QR Download */}
                      <button
                        onClick={() => setPrinting(member)}
                        title="Download QR Code"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                      </button>
                      {/* Edit */}
                      <button
                        onClick={() => setModal(member)}
                        title="Edit member"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(member)}
                        disabled={deleting === member.id}
                        title="Delete member"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-16">
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <svg className="w-12 h-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm">
                        {search ? `No members matching "${search}"` : 'No members yet. Click "Add Member" to get started.'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

      {/* Modals */}
      {modal && (
        <MemberModal
          member={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={() => setModal(null)}
        />
      )}
      {printing && (
        <EnvelopeGenerator member={printing} onClose={() => setPrinting(null)} />
      )}
    </>
  )
}
