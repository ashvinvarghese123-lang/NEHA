import { motion, useReducedMotion } from 'framer-motion'
export default function PaperPlane({ top = '20%', delay = 0, duration = 20, size = 44 }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <motion.div className="pointer-events-none absolute left-0 z-10" style={{ top }}
      initial={{ x: '-20vw', opacity: 0 }}
      animate={{ x: '115vw', y: [0, -40, 15, -30], opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: 7, ease: 'linear' }}>
      <div className="flex -rotate-6 items-center">
        <div className="w-28 border-t-2 border-dotted border-rose/60" />
        <svg width={size} height={size} viewBox="0 0 48 48" fill="#FFFCF8" stroke="#8C7168" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M3 22 45 4 33 44 22 29z" /><path d="M22 29 45 4" />
        </svg>
      </div>
    </motion.div>
  )
}

