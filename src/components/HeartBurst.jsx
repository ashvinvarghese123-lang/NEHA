import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const symbols = ['♡', '♥', '✨', '🌸', '💕']
const colors = ['#D9A9A9', '#C88A8A', '#E3A5A5', '#B87272', '#EADFCF']

export default function HeartBurst() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const handleClick = (e) => {
      // Don't burst if clicking pure control inputs
      const x = e.clientX ?? (e.touches && e.touches[0]?.clientX)
      const y = e.clientY ?? (e.touches && e.touches[0]?.clientY)
      if (x === undefined || y === undefined) return

      const count = 6
      const newItems = Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
        const dist = 35 + Math.random() * 45
        return {
          id: `${Date.now()}-${i}-${Math.random()}`,
          x,
          y,
          targetX: x + Math.cos(angle) * dist,
          targetY: y + Math.sin(angle) * dist - 30 - Math.random() * 30,
          rotate: (Math.random() - 0.5) * 60,
          scale: 0.8 + Math.random() * 0.6,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        }
      })

      setParticles((prev) => [...prev.slice(-24), ...newItems])

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newItems.some((n) => n.id === p.id)))
      }, 1200)
    }

    window.addEventListener('pointerdown', handleClick, { passive: true })
    return () => window.removeEventListener('pointerdown', handleClick)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 0.2 }}
            animate={{
              x: p.targetX,
              y: p.targetY,
              opacity: 0,
              scale: p.scale,
              rotate: p.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              color: p.color,
              userSelect: 'none',
              transform: 'translate(-50%, -50%)',
              fontSize: '1.25rem',
            }}
          >
            {p.symbol}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
