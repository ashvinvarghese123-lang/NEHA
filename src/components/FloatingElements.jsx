import { useReducedMotion } from 'framer-motion'
const bits = ['✧', '·', '✦', '🦋', '🌸', '·']
export default function FloatingElements() {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {bits.map((b, n) => (
        <span key={n} className="absolute text-rose/60" style={{
          left: `${8 + n * 16}%`, top: 0, fontSize: 14 + (n % 3) * 6,
          animation: `drift ${38 + n * 7}s linear ${n * -9}s infinite` }}>{b}</span>
      ))}
    </div>
  )
}
