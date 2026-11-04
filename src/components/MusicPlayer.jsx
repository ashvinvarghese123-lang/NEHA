import { useEffect, useRef } from 'react'
import { music } from '../data/memories'

export default function MusicPlayer() {
  const ref = useRef(null)
  const songSrc = music || '/media/music/song.mp3'
  const wasPlayingRef = useRef(false)

  useEffect(() => {
    const audio = ref.current
    if (!audio) return

    const tryPlay = () => {
      audio.volume = 0.6
      const promise = audio.play()
      if (promise !== undefined) {
        promise
          .then(() => {
            wasPlayingRef.current = true
            cleanup()
          })
          .catch(() => {
            // Autoplay blocked by browser policy until user interacts
          })
      }
    }

    // Try playing immediately
    tryPlay()

    // Trigger on first interaction anywhere on page (click, tap, scroll, key)
    const onInteract = () => {
      if (audio.paused && !document.hidden) {
        tryPlay()
      }
    }

    const events = ['pointerdown', 'touchstart', 'click', 'scroll', 'keydown']
    events.forEach((evt) => window.addEventListener(evt, onInteract, { passive: true, once: true }))

    // Immediately stop audio when screen is locked, user goes to home screen, switches tabs, or minimizes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audio.paused) {
          wasPlayingRef.current = true
          audio.pause()
        }
      } else {
        // When returning back to the site, resume if it was previously playing
        if (wasPlayingRef.current) {
          audio.play().catch(() => {})
        }
      }
    }

    // Immediately stop audio when closing browser / navigating away
    const handleStop = () => {
      audio.pause()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pagehide', handleStop)
    window.addEventListener('beforeunload', handleStop)

    const cleanup = () => {
      events.forEach((evt) => window.removeEventListener(evt, onInteract))
    }

    return () => {
      cleanup()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pagehide', handleStop)
      window.removeEventListener('beforeunload', handleStop)
    }
  }, [songSrc])

  return <audio ref={ref} src={songSrc} loop preload="auto" className="hidden" />
}
