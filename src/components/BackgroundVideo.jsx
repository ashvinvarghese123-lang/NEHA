import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { backgroundVideos } from '../data/memories'

// Every video you drop into src/assets/videos is used automatically.
const found = import.meta.glob('../assets/videos/*.{mp4,webm,mov}', { eager: true, query: '?url', import: 'default' })
const videos = [...Object.values(found), ...backgroundVideos]

export default function BackgroundVideo() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  const on = videos.length > 0 && !reduce
  useEffect(() => {
    if (!on || videos.length < 2) return
    const t = setInterval(() => setI(n => (n + 1) % videos.length), 15000)
    return () => clearInterval(t)
  }, [on])
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-ivory via-cream to-ivory" aria-hidden>
      <AnimatePresence>
        {on && (
          <motion.video key={videos[i]} src={videos[i]} autoPlay muted loop playsInline disablePictureInPicture preload="auto"
            webkit-playsinline="true"
            initial={{ opacity: 0 }} animate={{ opacity: 0.75 }} exit={{ opacity: 0 }} transition={{ duration: 2.5 }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'blur(1px) sepia(.15) saturate(1.05)' }} />
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-ivory/25" />
    </div>
  )
}

