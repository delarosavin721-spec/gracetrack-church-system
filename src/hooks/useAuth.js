import { useState, useEffect } from 'react'
import { onAuthChange, getUserRole } from '../firebase/auth'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        const userData = await getUserRole(firebaseUser.uid)
        setRole(userData?.role || null)
      } else {
        setUser(null)
        setRole(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, role, loading }
}
