import React, { useState, useEffect } from 'react'
import { getMembers } from '../../firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../../firebase/config'
import { motion } from 'framer-motion'

export default function EmailSender() {
  const [members, setMembers] = useState([])
  const [selectedMembers, setSelectedMembers] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')
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
      return
    }

    setSending(true)
    setMessage('')

    try {
      const selectedMembersList = members.filter(m => selectedMembers.has(m.id))
      
      // Call Cloud Function
      const sendBulkEmails = httpsCallable(functions, 'sendBulkEmails')
      const result = await sendBulkEmails({
        members: selectedMembersList,
        emailType,
        customSubject,
        customMessage
      })
      
      if (result.data.success) {
        const failed = result.data.failed > 0 ? ` (${result.data.failed} failed)` : ''
        setMessage(`✅ ${result.data.sent} emails sent successfully!${failed}`)
        setSelectedMembers(new Set())
        setCustomSubject('')
        setCustomMessage('')
      } else {
        setMessage(`❌ Error: ${result.data.error}`)
      }
    } catch (error) {
      setMessage(`❌ Error sending emails: ${error.message}`)
    }

    setSending(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📧 Email Sender</h1>
        <p className="text-gray-600 mb-8">Send emails to your members manually</p>

        {/* Email Type Selection */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Type</h2>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="emailType"
                value="receipt"
                checked={emailType === 'receipt'}
                onChange={(e) => setEmailType(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-gray-700">
                📋 Receipt Email (for tithes/offerings)
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="emailType"
                value="devotional"
                checked={emailType === 'devotional'}
                onChange={(e) => setEmailType(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-gray-700">
                📖 Devotional Email (inspirational verse)
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="emailType"
                value="custom"
                checked={emailType === 'custom'}
                onChange={(e) => setEmailType(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-gray-700">
                ✍️ Custom Email
              </span>
            </label>
          </div>
        </div>

        {/* Custom Email Fields */}
        {emailType === 'custom' && (
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Custom Email Content</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="Enter email subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Enter email message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Member Selection */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              👥 Select Members ({selectedMembers.size}/{members.length})
            </h2>
            <button
              onClick={selectAll}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
            >
              {selectedMembers.size === members.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading members...</div>
          ) : members.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No members with email addresses</div>
          ) : (
            <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg divide-y">
              {members.map((member) => (
                <label
                  key={member.id}
                  className="flex items-center p-4 hover:bg-gray-100 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedMembers.has(member.id)}
                    onChange={() => toggleMember(member.id)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="ml-3 flex-1">
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Message Display */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-lg ${
              message.startsWith('✅')
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Send Button */}
        <button
          onClick={sendEmails}
          disabled={sending || selectedMembers.size === 0}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition ${
            sending || selectedMembers.size === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          }`}
        >
          {sending ? '📤 Sending...' : `📧 Send to ${selectedMembers.size} Member${selectedMembers.size !== 1 ? 's' : ''}`}
        </button>
      </div>
    </motion.div>
  )
}
