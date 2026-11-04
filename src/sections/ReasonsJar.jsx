import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, RefreshCw } from 'lucide-react'
import Reveal from '../components/Reveal'
import { reasons } from '../data/reasons'

export default function ReasonsJar() {
  const [index, setIndex] = useState(0)
  const [hasOpened, setHasOpened] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const pullNote = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
    setIndex((prev) => (prev + 1) % reasons.length)
    setHasOpened(true)
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-28 overflow-hidden">
      <Reveal as="h2" className="text-2xl italic sm:text-5xl">a little jar of reasons</Reveal>
      <Reveal as="p" delay={0.2} className="mt-3 font-hand text-xl text-brown sm:text-2xl">
        for all the days you need a gentle reminder of how loved you are, Neha
      </Reveal>

      {/* Interactive Jar */}
      <Reveal delay={0.3} className="mt-10 sm:mt-12 flex flex-col items-center">
        <motion.button
          onClick={pullNote}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          animate={isShaking ? { rotate: [-4, 4, -4, 4, 0], y: [-4, 2, -3, 1, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="group relative cursor-pointer focus:outline-none [touch-action:manipulation]"
          aria-label="Tap the jar to pull a reason"
        >
          {/* Jar graphic */}
          <div className="paper relative flex h-48 w-36 flex-col items-center justify-between rounded-b-3xl rounded-t-xl border-2 border-rose/30 bg-soft/85 p-3.5 shadow-md backdrop-blur-xs transition-shadow group-hover:shadow-xl sm:h-60 sm:w-44 sm:p-4">
            {/* Wooden Cork Lid */}
            <div className="absolute -top-3.5 h-5 w-24 rounded-t-md border-b-2 border-[#b0907d] bg-[#c7a794] shadow-inner sm:-top-4 sm:h-6 sm:w-28" />
            <div className="absolute -top-1 h-2.5 w-28 rounded-xs bg-[#b0907d] shadow-xs sm:h-3 sm:w-32" />

            {/* Little Ribbon Tag */}
            <div className="absolute top-7 sm:top-8 rounded-full border border-rose/40 bg-cream/90 px-2.5 py-0.5 font-hand text-xs text-brown shadow-xs sm:px-3 sm:text-sm">
              tap me ♡
            </div>

            {/* Folded paper notes floating inside the jar */}
            <div className="mt-12 sm:mt-14 flex flex-wrap justify-center gap-1.5 opacity-80 sm:gap-2">
              <span className="h-3.5 w-5 -rotate-12 rounded-xs bg-rose/30 shadow-xs sm:h-4 sm:w-6" />
              <span className="h-4 w-6 rotate-6 rounded-xs bg-[#EADFCF] shadow-xs sm:h-5 sm:w-7" />
              <span className="h-3.5 w-5 rotate-45 rounded-xs bg-rose/40 shadow-xs sm:h-4 sm:w-6" />
              <span className="h-4 w-5 -rotate-6 rounded-xs bg-[#E9D5CB] shadow-xs sm:h-5 sm:w-6" />
              <span className="h-3.5 w-6 rotate-12 rounded-xs bg-[#F1E8DC] shadow-xs sm:h-4 sm:w-7" />
              <span className="h-4 w-4 -rotate-45 rounded-xs bg-rose/25 shadow-xs sm:h-5 sm:w-5" />
            </div>

            {/* Bottom sparkle */}
            <div className="flex items-center gap-1 font-hand text-[11px] text-brown/70 sm:text-xs">
              <Sparkles size={12} className="text-rose" />
              <span>{reasons.length} notes inside</span>
            </div>
          </div>
        </motion.button>
        <span className="mt-3 font-hand text-lg text-brown sm:mt-4 sm:text-xl">tap the jar to pull out a note ↓</span>
      </Reveal>

      {/* Unfolded Note */}
      <AnimatePresence mode="wait">
        {hasOpened && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95, rotate: -1.5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: (index % 2 === 0 ? 1 : -1) }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="paper relative mx-auto mt-8 max-w-lg px-5 py-7 text-left sm:mt-10 sm:px-10 sm:py-9"
          >
            {/* Washi tape on top */}
            <span className="absolute -top-3 left-1/2 h-4 w-20 -translate-x-1/2 rotate-1 bg-rose/50 shadow-xs sm:h-5 sm:w-24" />

            <div className="flex items-center justify-between border-b border-rose/20 pb-2.5">
              <span className="font-hand text-base uppercase tracking-wider text-rose sm:text-lg">
                reason #{index + 1}
              </span>
              <span className="font-hand text-xs text-brown/60 sm:text-sm">
                {index + 1} of {reasons.length}
              </span>
            </div>

            <p className="mt-5 font-hand text-xl leading-relaxed text-choc sm:mt-6 sm:text-2xl">
              &quot;{reasons[index]}&quot;
            </p>

            <div className="mt-6 flex items-center justify-end sm:mt-8">
              <button
                onClick={pullNote}
                className="flex items-center gap-2 rounded-full border border-rose/30 bg-cream/70 px-3.5 py-1.5 font-hand text-base text-brown transition-colors hover:bg-rose/20 focus:outline-none sm:px-4 sm:text-lg"
              >
                <RefreshCw size={14} className="text-rose" />
                <span>read another one</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
