import { useState, useEffect } from 'react'
import { onMembersChange } from '../firebase/firestore'

export const useMembers = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onMembersChange((data) => {
      setMembers(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { members, loading }
}
