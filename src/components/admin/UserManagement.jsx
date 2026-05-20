import { useState, useEffect } from 'react'
import { onUsersChange, updateUserStatus } from '../../firebase/firestore'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onUsersChange((data) => {
      setUsers(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleToggleStatus = async (uid, currentStatus) => {
    try {
      await updateUserStatus(uid, !currentStatus)
    } catch (err) {
      console.error(err)
      alert('Failed to update user status')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner" />
      </div>
    )
  }

  const pendingUsers = users.filter(u => u.active === false)
  const activeUsers = users.filter(u => u.active === true)

  return (
    <div className="page-content space-y-8">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-slate-900">User Management</h1>
        <p className="text-sm text-slate-500 mt-1">Approve or manage system access for admins and ushers.</p>
      </div>

      {/* Pending Approvals */}
      {pendingUsers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Pending Approvals ({pendingUsers.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingUsers.map(user => (
              <div key={user.uid} className="glass p-5 rounded-3xl border-amber-100 bg-amber-50/30">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-xl">
                    👤
                  </div>
                  <span className={`badge ${user.role === 'admin' ? 'badge-tithe' : 'badge-offering'}`}>
                    {user.role}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 truncate">{user.name}</h3>
                <p className="text-xs text-slate-500 mb-6 truncate">{user.email}</p>
                <button
                  onClick={() => handleToggleStatus(user.uid, false)}
                  className="w-full btn-primary bg-teal-600 hover:bg-teal-700 shadow-teal-200"
                >
                  Approve Access
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Users Table */}
      <div className="glass rounded-[2rem] border-white shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-playfair text-xl font-bold text-slate-800">System Users</h2>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{activeUsers.length} Active</span>
        </div>
        <div className="overflow-x-auto">
          <table className="table-glass">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Registered</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.uid}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                        {user.name?.[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800 truncate">{user.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'badge-tithe' : 'badge-offering'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-slate-500">
                      {user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString() : '—'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${user.active ? 'badge-active' : 'badge-inactive'}`}>
                      {user.active ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleToggleStatus(user.uid, user.active)}
                      className={`text-xs font-bold uppercase tracking-wider ${user.active ? 'text-red-500 hover:text-red-600' : 'text-teal-600 hover:text-teal-700'}`}
                    >
                      {user.active ? 'Revoke' : 'Approve'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
