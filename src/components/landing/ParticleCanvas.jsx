import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let particles = []
    let mouse = { x: null, y: null }

    const initCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.baseSize = this.size
        this.speedY = (Math.random() * 0.5) + 0.1 // Drift upward
        this.speedX = (Math.random() - 0.5) * 0.2
        this.color = `rgba(45, 212, 191, ${Math.random() * 0.45 + 0.08})` // Teal tint
      }

      update() {
        this.y -= this.speedY
        this.x += this.speedX

        // Wrap around
        if (this.y < 0) this.y = canvas.height
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0

        // Mouse interaction (repel)
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x
          let dy = mouse.y - this.y
          let distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            this.x -= dx * 0.02
            this.y -= dy * 0.02
            this.size = this.baseSize * 2 // Glow slightly
          } else {
            this.size = this.baseSize
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const createParticles = () => {
      particles = []
      const particleCount = Math.floor(window.innerWidth / 15) // Responsive count
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      // Clear with slight trailing effect
      ctx.fillStyle = 'rgba(6, 11, 24, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.update()
        p.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    initCanvas()
    animate()

    const handleResize = () => initCanvas()
    const handleMouseMove = (e) => {
      mouse.x = e.x
      mouse.y = e.y
    }
    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Pause animation when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId)
      } else {
        animate()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}
