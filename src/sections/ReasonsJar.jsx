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
    <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <Reveal as="h2" className="text-2xl font-serif italic text-choc sm:text-5xl">
        a little jar of reasons
      </Reveal>
      <Reveal as="p" delay={0.2} className="mt-2 font-hand text-xl text-rose sm:text-2xl">
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
          className="group relative cursor-pointer focus:outline-none"
          aria-label="Tap the jar to pull a reason"
        >
          {/* Jar graphic */}
          <div className="paper relative flex h-52 w-38 flex-col items-center justify-between rounded-b-3xl rounded-t-xl border-2 border-rose/35 bg-white/60 p-3.5 shadow-[0_12px_32px_rgba(73,56,50,0.12)] backdrop-blur-xs transition-all duration-300 group-hover:shadow-[0_18px_45px_rgba(73,56,50,0.18)] sm:h-64 sm:w-48 sm:p-4">
            {/* Wooden Cork Lid */}
            <div className="absolute -top-3.5 h-5 w-26 rounded-t-md border-b-2 border-[#a68673] bg-[#c2a28f] shadow-inner sm:-top-4 sm:h-6 sm:w-32" />
            <div className="absolute -top-1 h-2.5 w-30 rounded-xs bg-[#a68673] shadow-xs sm:h-3 sm:w-36" />

            {/* Glass reflection highlight */}
            <div className="pointer-events-none absolute left-3 top-6 h-36 w-3 rounded-full bg-white/40 blur-[1px] sm:h-44 sm:w-4" />

            {/* Little Ribbon Tag */}
            <div className="absolute top-7 sm:top-8 rounded-full border border-rose/40 bg-cream px-3 py-0.5 font-hand text-xs font-medium text-choc shadow-xs sm:text-sm">
              tap me ♡
            </div>

            {/* Folded paper notes floating inside the jar */}
            <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-1.5 opacity-90 sm:gap-2">
              <span className="h-3.5 w-5 -rotate-12 rounded-xs bg-rose/40 shadow-xs sm:h-4 sm:w-6" />
              <span className="h-4 w-6 rotate-6 rounded-xs bg-[#EADFCF] shadow-xs sm:h-5 sm:w-7" />
              <span className="h-3.5 w-5 rotate-45 rounded-xs bg-rose/50 shadow-xs sm:h-4 sm:w-6" />
              <span className="h-4 w-5 -rotate-6 rounded-xs bg-[#E9D5CB] shadow-xs sm:h-5 sm:w-6" />
              <span className="h-3.5 w-6 rotate-12 rounded-xs bg-[#F1E8DC] shadow-xs sm:h-4 sm:w-7" />
              <span className="h-4 w-4 -rotate-45 rounded-xs bg-rose/35 shadow-xs sm:h-5 sm:w-5" />
            </div>

            {/* Bottom sparkle badge */}
            <div className="flex items-center gap-1 font-hand text-xs text-choc/70 sm:text-sm font-medium">
              <Sparkles size={13} className="text-rose animate-spin-slow" />
              <span>{reasons.length} reasons inside</span>
            </div>
          </div>
        </motion.button>
        <span className="mt-4 font-hand text-lg text-choc/75 sm:text-xl">tap the jar to pull out a note ↓</span>
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
            className="paper relative mx-auto mt-8 max-w-lg px-6 py-8 text-left rounded-xs shadow-[0_12px_35px_rgba(73,56,50,0.12)] border border-white/80 sm:mt-10 sm:px-10 sm:py-9"
          >
            {/* Washi tape on top */}
            <span className="absolute -top-3 left-1/2 h-4 w-22 -translate-x-1/2 rotate-1 rounded-xs bg-rose/50 border border-white/40 shadow-xs sm:h-5 sm:w-26" />

            <div className="flex items-center justify-between border-b border-rose/25 pb-2.5">
              <span className="font-hand text-base uppercase tracking-wider text-rose sm:text-lg font-bold">
                reason #{index + 1}
              </span>
              <span className="font-hand text-xs text-choc/60 sm:text-sm font-medium">
                {index + 1} of {reasons.length}
              </span>
            </div>

            <p className="mt-5 font-hand text-xl leading-relaxed text-choc sm:mt-6 sm:text-2xl">
              &ldquo;{reasons[index]}&rdquo;
            </p>

            <div className="mt-6 flex items-center justify-end sm:mt-8">
              <button
                onClick={pullNote}
                className="flex items-center gap-2 rounded-full border border-rose/40 bg-cream/80 px-4 py-1.5 font-hand text-base text-choc transition-colors hover:bg-rose/25 focus:outline-none sm:text-lg cursor-pointer"
              >
                <RefreshCw size={14} className="text-rose" />
                <span>read another one ♡</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
