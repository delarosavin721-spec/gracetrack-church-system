import { useState, useEffect } from 'react'
import { onTransactionsChange } from '../firebase/firestore'

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onTransactionsChange((data) => {
      setTransactions(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { transactions, loading }
}
