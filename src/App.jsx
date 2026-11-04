import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import BackgroundVideo from './components/BackgroundVideo'
import FloatingElements from './components/FloatingElements'
import MusicPlayer from './components/MusicPlayer'
import HeartBurst from './components/HeartBurst'
import Hero from './sections/Hero'
import AboutHer from './sections/AboutHer'
import Memories from './sections/Memories'
import ZoomThrough from './sections/ZoomThrough'
import LittleThings from './sections/LittleThings'
import ReasonsJar from './sections/ReasonsJar'
import LoveLetter from './sections/LoveLetter'
import Finale from './sections/Finale'
import FutureLetter from './sections/FutureLetter'

function Cursor() { // decorative ring only; the real cursor stays visible
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { damping: 28, stiffness: 260 }), sy = useSpring(y, { damping: 28, stiffness: 260 })
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    const m = e => { x.set(e.clientX - 14); y.set(e.clientY - 14) }
    addEventListener('mousemove', m); return () => removeEventListener('mousemove', m)
  }, [])
  return <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-50 hidden h-7 w-7 rounded-full border border-rose md:block" />
}

export default function App() {
  return (
    <>
      <BackgroundVideo />
      <FloatingElements />
      <HeartBurst />
      <Cursor />
      <MusicPlayer />
      <div className="grain" aria-hidden />
      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <AboutHer />
        <Memories />
        <ZoomThrough />
        <LittleThings />
        <ReasonsJar />
        <LoveLetter />
        <Finale />
        <FutureLetter />
      </main>
    </>
  )
}
