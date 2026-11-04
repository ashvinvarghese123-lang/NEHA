import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { backgroundVideos } from '../data/memories'

// Automatically load all background videos
const found = import.meta.glob('../assets/videos/*.{mp4,webm,mov}', { eager: true, query: '?url', import: 'default' })
const videos = [...Object.values(found), ...backgroundVideos]

export default function BackgroundVideo() {
  const reduce = useReducedMotion()
  const [deck, setDeck] = useState(0) // 0 means Deck A is visible, 1 means Deck B is visible
  const [videoA, setVideoA] = useState(videos[0] || '')
  const [videoB, setVideoB] = useState(videos[1] || videos[0] || '')
  const nextIndexRef = useRef(1)

  const videoRefA1 = useRef(null)
  const videoRefA2 = useRef(null)
  const videoRefB1 = useRef(null)
  const videoRefB2 = useRef(null)

  const on = videos.length > 0 && !reduce

  useEffect(() => {
    if (!on || videos.length < 2) return

    const interval = setInterval(() => {
      const nextIdx = (nextIndexRef.current + 1) % videos.length
      nextIndexRef.current = nextIdx
      const nextSrc = videos[nextIdx]

      setDeck((currentDeck) => {
        if (currentDeck === 0) {
          // Crossfade to Deck B
          setVideoB(nextSrc)
          videoRefB1.current?.play().catch(() => {})
          videoRefB2.current?.play().catch(() => {})
          return 1
        } else {
          // Crossfade to Deck A
          setVideoA(nextSrc)
          videoRefA1.current?.play().catch(() => {})
          videoRefA2.current?.play().catch(() => {})
          return 0
        }
      })
    }, 12000) // Crossfade every 12 seconds

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
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-[2200ms] ease-in-out"
        style={{ opacity: deck === 0 ? 1 : 0 }}
      >
        {videoA && (
          <>
            {/* Ambient background glow matching natural video tones */}
            <video
              ref={videoRefA1}
              src={videoA}
              autoPlay
              muted
              loop
              playsInline
              webkit-playsinline="true"
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover blur-3xl opacity-30 scale-110 pointer-events-none"
            />
            {/* 5:7 Aspect Ratio Aesthetic Video Frame */}
            <div className="relative aspect-[5/7] max-h-[82vh] max-w-[88vw] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(73,56,50,0.14),0_0_80px_rgba(248,243,234,0.35)] border border-white/60">
              <video
                ref={videoRefA2}
                src={videoA}
                autoPlay
                muted
                loop
                playsInline
                webkit-playsinline="true"
                preload="auto"
                className="h-full w-full object-cover"
                style={{
                  filter: 'sepia(0.06) saturate(1.06) brightness(0.98)',
                }}
              />
              {/* Soft warm film vignette inside the frame */}
              <div className="absolute inset-0 bg-gradient-to-t from-ivory/25 via-transparent to-ivory/15 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(73,56,50,0.15)_100%)] pointer-events-none" />
            </div>
          </>
        )}
      </div>

      {/* DECK B */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-[2200ms] ease-in-out"
        style={{ opacity: deck === 1 ? 1 : 0 }}
      >
        {videoB && (
          <>
            {/* Ambient background glow matching natural video tones */}
            <video
              ref={videoRefB1}
              src={videoB}
              autoPlay
              muted
              loop
              playsInline
              webkit-playsinline="true"
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover blur-3xl opacity-30 scale-110 pointer-events-none"
            />
            {/* 5:7 Aspect Ratio Aesthetic Video Frame */}
            <div className="relative aspect-[5/7] max-h-[82vh] max-w-[88vw] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(73,56,50,0.14),0_0_80px_rgba(248,243,234,0.35)] border border-white/60">
              <video
                ref={videoRefB2}
                src={videoB}
                autoPlay
                muted
                loop
                playsInline
                webkit-playsinline="true"
                preload="auto"
                className="h-full w-full object-cover"
                style={{
                  filter: 'sepia(0.06) saturate(1.06) brightness(0.98)',
                }}
              />
              {/* Soft warm film vignette inside the frame */}
              <div className="absolute inset-0 bg-gradient-to-t from-ivory/25 via-transparent to-ivory/15 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(73,56,50,0.15)_100%)] pointer-events-none" />
            </div>
          </>
        )}
      </div>

      {/* Delicate ivory paper tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/55 via-ivory/15 to-ivory/65 pointer-events-none" />
    </div>
  )
}
