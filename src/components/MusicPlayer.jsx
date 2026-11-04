import { useEffect, useRef } from 'react'
import { music } from '../data/memories'

export default function MusicPlayer() {
  const ref = useRef(null)
  const songSrc = music || '/media/music/song.mp3'

  useEffect(() => {
    const audio = ref.current
    if (!audio) return

    const tryPlay = () => {
      audio.volume = 0.6
      const promise = audio.play()
      if (promise !== undefined) {
        promise
          .then(() => {
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
      if (audio.paused) {
        tryPlay()
      }
    }

    const events = ['pointerdown', 'touchstart', 'click', 'scroll', 'keydown']
    events.forEach((evt) => window.addEventListener(evt, onInteract, { passive: true, once: true }))

    const cleanup = () => {
      events.forEach((evt) => window.removeEventListener(evt, onInteract))
    }

    return () => cleanup()
  }, [songSrc])

  return <audio ref={ref} src={songSrc} loop preload="auto" className="hidden" />
}
