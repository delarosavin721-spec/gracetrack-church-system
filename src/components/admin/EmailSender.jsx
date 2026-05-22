import React, { useState, useEffect } from 'react'
import { getMembers } from '../../firebase/firestore'
import { motion } from 'framer-motion'

export default function EmailSender() {
  const [members, setMembers] = useState([])
  const [selectedMembers, setSelectedMembers] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success') // 'success' or 'error'
  const [emailType, setEmailType] = useState('receipt')
  const [customSubject, setCustomSubject] = useState('')
  const [customMessage, setCustomMessage] = useState('')

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    setLoading(true)
    try {
      const data = await getMembers()
      setMembers(data.filter(m => m.email && m.emailOptIn))
    } catch (error) {
      setMessage('Error loading members: ' + error.message)
    }
    setLoading(false)
  }

  const toggleMember = (id) => {
    const newSelected = new Set(selectedMembers)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedMembers(newSelected)
  }

  const selectAll = () => {
    if (selectedMembers.size === members.length) {
      setSelectedMembers(new Set())
    } else {
      setSelectedMembers(new Set(members.map(m => m.id)))
    }
  }

  const sendEmails = async () => {
    if (selectedMembers.size === 0) {
      setMessage('❌ Please select at least one member')
      setMessageType('error')
      return
    }

    setSending(true)
    setMessage('')

    try {
      const selectedMembersList = members.filter(m => selectedMembers.has(m.id))
      
      // Call Vercel API route instead of Firebase function directly (fixes CORS)
      const response = await fetch('/api/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          members: selectedMembersList,
          emailType,
          customSubject,
          customMessage
        })
      })

      const result = await response.json()

      if (result.success) {
        setMessage(`✅ ${result.sent} emails sent successfully!${result.failed > 0 ? ` (${result.failed} failed)` : ''}`)
        setMessageType('success')
        setSelectedMembers(new Set())
        setCustomSubject('')
        setCustomMessage('')
      } else {
        setMessage(`❌ Error: ${result.error}`)
        setMessageType('error')
      }
    } catch (error) {
      setMessage(`❌ Connection Error: ${error.message}. Please check your internet and try again.`)
      setMessageType('error')
      console.error('Email send error:', error)
    }

    setSending(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-playfair text-4xl font-bold text-slate-900 mb-2">📧 Email Sender</h1>
        <p className="text-slate-600 text-lg">Reach out to your members with personalized messages and updates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Config */}
        <div className="lg:col-span-2 space-y-8">
          {/* Email Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-flat border-l-4 border-l-teal-500 overflow-hidden"
          >
            <div className="px-8 py-6 bg-gradient-to-br from-teal-50 to-transparent border-b border-teal-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-2xl">✉️</span> Choose Email Type
              </h2>
              <p className="text-sm text-slate-600 mt-1">Select what kind of message to send</p>
            </div>
            
            <div className="p-8 space-y-4">
              {[
                { value: 'receipt', label: 'Thank You Receipt', icon: '💚', desc: 'Gratitude with Bible verse' },
                { value: 'devotional', label: 'Inspirational Verse', icon: '📖', desc: 'Daily encouragement' },
                { value: 'custom', label: 'Custom Message', icon: '✍️', desc: 'Write your own' }
              ].map(option => (
                <label key={option.value} className="flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-teal-300 hover:bg-teal-50/30" style={{borderColor: emailType === option.value ? '#0d9488' : '#e2e8f0'}}>
                  <input
                    type="radio"
                    name="emailType"
                    value={option.value}
                    checked={emailType === option.value}
                    onChange={(e) => setEmailType(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-bold text-slate-900">{option.icon} {option.label}</p>
                    <p className="text-xs text-slate-500">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Custom Email Fields */}
          {emailType === 'custom' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-flat border-l-4 border-l-indigo-500 overflow-hidden"
            >
              <div className="px-8 py-6 bg-gradient-to-br from-indigo-50 to-transparent border-b border-indigo-100">
                <h2 className="text-xl font-bold text-slate-900">✍️ Compose Message</h2>
                <p className="text-sm text-slate-600 mt-1">Write your custom email content</p>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Subject Line</label>
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    placeholder="e.g., Important Update from Our Church"
                    className="w-full px-4 py-3 border-2 border-slate-200 focus:border-indigo-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Message Body</label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Write your message here... (supports plain text)"
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-slate-200 focus:border-indigo-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium resize-none"
                  />
                  <p className="text-xs text-slate-500 mt-2">📝 Tip: Use clear, warm language that resonates with your community</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column - Members & Send */}
        <div className="space-y-6">
          {/* Member Count Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white"
          >
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Ready to Send</p>
              <p className="text-4xl font-bold">{selectedMembers.size}</p>
              <p className="text-xs text-slate-400 mt-1">of {members.length} selected</p>
            </div>
          </motion.div>

          {/* Message Display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl text-sm font-bold border-2 flex items-start gap-3 ${
                messageType === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              <span className="text-lg mt-0.5">{messageType === 'success' ? '✅' : '⚠️'}</span>
              <span className="flex-1">{message}</span>
            </motion.div>
          )}

          {/* Select All Button */}
          <button
            onClick={selectAll}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-sm uppercase tracking-wider transition-all"
          >
            {selectedMembers.size === members.length ? '❌ Deselect All' : '✅ Select All'}
          </button>

          {/* Send Button */}
          <button
            onClick={sendEmails}
            disabled={sending || selectedMembers.size === 0}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              sending || selectedMembers.size === 0
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-200 hover:shadow-teal-300 active:scale-95'
            }`}
          >
            {sending ? (
              <>
                <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                📤 Send {selectedMembers.size > 0 ? `(${selectedMembers.size})` : ''}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Member List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 card-flat border-t-4 border-t-slate-200 overflow-hidden"
      >
        <div className="px-8 py-6 bg-gradient-to-br from-slate-50 to-transparent border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">👥 Members ({members.length})</h2>
          <p className="text-sm text-slate-600 mt-1">Select who to send emails to</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-500">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin" />
              <p className="font-medium">Loading members...</p>
            </div>
          </div>
        ) : members.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-slate-500 text-center">
            <div>
              <p className="text-lg font-bold">📭 No members found</p>
              <p className="text-sm">Members must have email addresses and opt-in enabled</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
            {members.map((member) => (
              <label
                key={member.id}
                className="flex items-center p-4 hover:bg-teal-50 cursor-pointer transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={selectedMembers.has(member.id)}
                  onChange={() => toggleMember(member.id)}
                  className="w-5 h-5 rounded cursor-pointer"
                />
                <div className="ml-4 flex-1 min-w-0">
                  <p className="font-bold text-slate-900 group-hover:text-teal-900">{member.name}</p>
                  <p className="text-sm text-slate-500 truncate">{member.email}</p>
                </div>
              </label>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
