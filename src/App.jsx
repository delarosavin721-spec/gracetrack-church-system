import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import { initializeDefaultAdminOnce } from './firebase/defaultAdminSetup'
import Landing from './pages/Landing'
import AdminHome from './pages/AdminHome'
import UsherHome from './pages/UsherHome'
import ProtectedRoute from './components/shared/ProtectedRoute'
import LoadingSpinner from './components/shared/LoadingSpinner'

function App() {
  const { loading } = useAuth()

  // Initialize default admin on app startup (runs only once per browser)
  useEffect(() => {
    initializeDefaultAdminOnce()
  }, [])

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminHome />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/usher/*" 
          element={
            <ProtectedRoute allowedRole="usher">
              <UsherHome />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
