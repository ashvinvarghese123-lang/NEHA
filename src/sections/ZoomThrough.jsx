import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import Polaroid from '../components/Polaroid'
import { zoomPhotos } from '../data/memories'

function Card3D({ p, i, photo }) {
  // Center pos where this card is in the center
  // i=1 is center at p=0, i=2 is center at p=0.5, i=3 is center at p=1.0
  const centerP = (i - 1) / 2
  const pEnter = centerP - 0.7
  const pRight = centerP - 0.5
  const pCenter = centerP
  const pLeft = centerP + 0.5
  const pExit = centerP + 0.7

  // Smooth position transforms (strictly increasing p values)
  const x = useTransform(
    p,
    [pEnter, pRight, pCenter, pLeft, pExit],
    ['48vw', '28vw', '0vw', '-28vw', '-48vw']
  )
  const y = useTransform(
    p,
    [pEnter, pRight, pCenter, pLeft, pExit],
    ['3vh', '1.5vh', '0vh', '-1.5vh', '-3vh']
  )
  const rotate = useTransform(
    p,
    [pEnter, pRight, pCenter, pLeft, pExit],
    [7, 5, 1, -5, -7]
  )
  const scale = useTransform(
    p,
    [pEnter, pRight, pCenter, pLeft, pExit],
    [0.65, 0.88, 1.06, 0.88, 0.65]
  )
  const opacity = useTransform(
    p,
    [pEnter, pRight, pCenter, pLeft, pExit],
    [0, 1, 1, 1, 0]
  )

  const zIndex = useTransform(p, (currentP) => {
    const dist = Math.abs(currentP - pCenter)
    return dist < 0.25 ? 25 : 10
  })

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        rotate,
        zIndex,
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
    >
      <div className="pointer-events-auto w-[34vw] max-w-[135px] sm:w-[25vw] sm:max-w-[210px]">
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
  const p = useSpring(rawP, { damping: 26, stiffness: 120, mass: 0.12 })
  const hint = useTransform(p, [0, 0.08], [1, 0])

  if (!n) return null

  if (reduce) {
    return (
      <section className="mx-auto grid max-w-5xl grid-cols-3 gap-2 px-3 py-16 sm:gap-6 sm:px-6 sm:py-24">
        {zoomPhotos.map((ph, i) => (
          <Polaroid key={i} {...ph} idx={i} />
        ))}
      </section>
    )
  }

  return (
    <section ref={ref} className="relative" style={{ height: '220dvh' }}>
      <div className="sticky top-0 h-screen h-[100dvh] overflow-hidden flex items-center justify-center">
        <motion.p
          style={{ opacity: hint }}
          className="pointer-events-none absolute bottom-8 left-0 right-0 z-30 px-4 text-center font-hand text-xl text-brown sm:bottom-10 sm:text-2xl"
        >
          keep scrolling, fly through us ↓
        </motion.p>
        {zoomPhotos.map((ph, i) => (
          <Card3D key={i} p={p} i={i} photo={ph} />
        ))}
      </div>
    </section>
  )
}
