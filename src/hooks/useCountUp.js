import { useState, useEffect } from 'react'

export const useCountUp = (end, duration = 2000, start = 0, inView = true) => {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (!inView) return

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * (end - start) + start))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [end, duration, start, inView])

  return count
}
