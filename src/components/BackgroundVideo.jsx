import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { backgroundVideos } from '../data/memories'

// Every video in src/assets/videos is loaded automatically
const found = import.meta.glob('../assets/videos/*.{mp4,webm,mov}', { eager: true, query: '?url', import: 'default' })
const videos = [...Object.values(found), ...backgroundVideos]

export default function BackgroundVideo() {
  const reduce = useReducedMotion()
  const [deck, setDeck] = useState(0) // 0 for Deck A, 1 for Deck B
  const [videoA, setVideoA] = useState(videos[0] || '')
  const [videoB, setVideoB] = useState(videos[1] || videos[0] || '')
  const nextIndexRef = useRef(1)

  const videoRefA = useRef(null)
  const videoRefB = useRef(null)

  const on = videos.length > 0 && !reduce

  useEffect(() => {
    if (!on || videos.length < 2) return

    const interval = setInterval(() => {
      const nextIdx = (nextIndexRef.current + 1) % videos.length
      nextIndexRef.current = nextIdx
      const nextSrc = videos[nextIdx]

      setDeck((currentDeck) => {
        if (currentDeck === 0) {
          setVideoB(nextSrc)
          videoRefB.current?.play().catch(() => {})
          return 1
        } else {
          setVideoA(nextSrc)
          videoRefA.current?.play().catch(() => {})
          return 0
        }
      })
    }, 15000)

    return () => clearInterval(interval)
  }, [on])

  if (!on) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-ivory via-cream to-ivory" aria-hidden />
    )
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-ivory via-cream to-ivory" aria-hidden>
      {/* DECK A */}
      <div
        className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out"
        style={{ opacity: deck === 0 ? 0.72 : 0 }}
      >
        {videoA && (
          <video
            ref={videoRefA}
            src={videoA}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            disablePictureInPicture
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'blur(0.5px) sepia(0.12) saturate(1.05)' }}
          />
        )}
      </div>

      {/* DECK B */}
      <div
        className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out"
        style={{ opacity: deck === 1 ? 0.72 : 0 }}
      >
        {videoB && (
          <video
            ref={videoRefB}
            src={videoB}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            disablePictureInPicture
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'blur(0.5px) sepia(0.12) saturate(1.05)' }}
          />
        )}
      </div>

      {/* Gentle ivory paper tint overlay */}
      <div className="absolute inset-0 bg-ivory/25 backdrop-blur-[0.5px]" />
    </div>
  )
}
