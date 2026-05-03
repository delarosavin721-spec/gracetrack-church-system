import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from './LoadingSpinner'

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, role, loading } = useAuth()

  if (loading) return <LoadingSpinner fullScreen />

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (allowedRole && role !== allowedRole) {
    // If logged in but wrong role, redirect to their proper home
    if (role === 'admin') return <Navigate to="/admin" replace />
    if (role === 'usher') return <Navigate to="/usher" replace />
    // If they have no role (e.g. database error during registration), sign them out or redirect to home
    return <Navigate to="/" replace />
  }

  return children
}
