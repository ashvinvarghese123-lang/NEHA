import { useReducedMotion } from 'framer-motion'

const items = [
  { symbol: '🌸', left: '6%', size: 20, duration: 24, delay: 0, opacity: 0.65 },
  { symbol: '✧', left: '15%', size: 16, duration: 28, delay: -4, opacity: 0.5 },
  { symbol: '♡', left: '26%', size: 18, duration: 22, delay: -9, opacity: 0.6 },
  { symbol: '🦋', left: '38%', size: 22, duration: 32, delay: -14, opacity: 0.55 },
  { symbol: '✦', left: '52%', size: 15, duration: 26, delay: -6, opacity: 0.45 },
  { symbol: '🌸', left: '64%', size: 21, duration: 25, delay: -12, opacity: 0.6 },
  { symbol: '♡', left: '76%', size: 17, duration: 29, delay: -3, opacity: 0.55 },
  { symbol: '✨', left: '86%', size: 18, duration: 27, delay: -16, opacity: 0.5 },
  { symbol: '⋆', left: '94%', size: 14, duration: 34, delay: -8, opacity: 0.4 },
]

export default function FloatingElements() {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {items.map((item, idx) => (
        <span
          key={idx}
          className="absolute select-none will-change-transform"
          style={{
            left: item.left,
            top: 0,
            fontSize: item.size,
            opacity: item.opacity,
            animation: `driftDrift ${item.duration}s cubic-bezier(0.4, 0, 0.2, 1) ${item.delay}s infinite`,
            filter: 'drop-shadow(0 2px 6px rgba(217, 169, 169, 0.35))',
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  )
}
