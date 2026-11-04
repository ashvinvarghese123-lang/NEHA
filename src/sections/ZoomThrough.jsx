import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import Polaroid from '../components/Polaroid'
import { zoomPhotos } from '../data/memories'

// Carefully balanced coordinates that stay beautifully centered on both iPhone and desktop
const spots = [[0, 0], [-10, -6], [10, 5], [-8, 7], [8, -7], [0, 3]]

function Layer({ p, i, n, photo }) {
  const total = n
  const start = i / total
  const end = Math.min(1, (i + 1.35) / total)
  const w = end - start
  const scale = useTransform(p, [start, end], [0.32, 3.4])
  const opacity = useTransform(
    p,
    [start, start + w * 0.22, start + w * 0.75, end],
    i === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
  )
  const [x, y] = spots[i % spots.length]

  return (
    <motion.div
      style={{
        scale,
        opacity,
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
    >
      <div
        style={{ transform: `translate3d(${x}vw, ${y}vh, 0)` }}
        className="pointer-events-none w-[64vw] max-w-[260px] sm:w-72 sm:max-w-xs"
      >
        <Polaroid {...photo} idx={i} eager />
      </div>
    </motion.div>
  )
}

export default function ZoomThrough() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const n = zoomPhotos?.length || 0
  const { scrollYProgress: rawP } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(rawP, { damping: 30, stiffness: 200, mass: 0.08 })
  const hint = useTransform(p, [0, 0.08], [1, 0])

  if (!n) return null

  if (reduce) {
    return (
      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-16 sm:gap-12 sm:px-6 sm:py-24 sm:grid-cols-2">
        {zoomPhotos.map((ph, i) => (
          <Polaroid key={i} {...ph} idx={i} />
        ))}
      </section>
    )
  }

  return (
    <section ref={ref} className="relative" style={{ height: `${Math.max(260, n * 65)}dvh` }}>
      <div className="sticky top-0 h-screen h-[100dvh] overflow-hidden">
        <motion.p
          style={{ opacity: hint }}
          className="pointer-events-none absolute bottom-8 left-0 right-0 z-20 px-4 text-center font-hand text-xl text-brown sm:bottom-10 sm:text-2xl"
        >
          keep scrolling, fly through us ↓
        </motion.p>
        {zoomPhotos.map((ph, i) => (
          <Layer key={i} p={p} i={i} n={n} photo={ph} />
        ))}
      </div>
    </section>
  )
}
