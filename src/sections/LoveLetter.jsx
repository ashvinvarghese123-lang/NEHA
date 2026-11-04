import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Paperclip, Heart, Sparkles } from 'lucide-react'
import Envelope from '../components/Envelope'
import Reveal from '../components/Reveal'
import { letter } from '../data/letter'

const noTexts = [
  'No',
  'Are you sure, Neha? 🥺',
  'Think again! 🙈',
  'Look how cute we are! 💕',
  'Button broken, try Yes! 😜',
  'Nice try, Neha! ♡',
  'You can only click Yes! 😉',
]

export default function LoveLetter() {
  const [open, setOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [noIndex, setNoIndex] = useState(0)
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })

  const handleYes = () => {
    setAccepted(true)
    setTimeout(() => {
      const el = document.getElementById('future-letter')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 1400)
  }

  const handleNoDodge = () => {
    setNoIndex((prev) => (prev + 1) % noTexts.length)
    const maxOffset = typeof window !== 'undefined' && window.innerWidth < 640 ? 55 : 120
    const randomX = (Math.random() - 0.5) * maxOffset
    const randomY = (Math.random() - 0.5) * 45
    setNoPos({ x: randomX, y: randomY })
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-32">
      <Reveal className="mb-12 sm:mb-16">
        <Envelope open={open} onOpen={() => setOpen(true)} />
      </Reveal>
      <AnimatePresence>
        {open && (
          <motion.article
            initial={{ opacity: 0, y: 40, scaleY: 0.7 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformOrigin: 'top',
              clipPath: 'polygon(0 1%,4% 0,50% 1%,97% 0,100% 2%,99% 50%,100% 98%,60% 100%,3% 99%,0 96%)',
            }}
            className="paper relative mt-8 px-6 py-8 font-hand text-xl leading-relaxed text-choc rounded-xs shadow-[0_20px_50px_rgba(73,56,50,0.14)] border border-white/80 sm:mt-12 sm:px-14 sm:py-14 sm:text-2xl sm:leading-loose"
          >
            <Paperclip className="absolute -top-1.5 left-6 sm:left-8 text-[#b8926a]" size={32} />
            <p className="mb-3 text-right font-hand text-base text-choc/60 sm:mb-4 sm:text-lg font-medium">
              {letter.date}
            </p>

            {letter.title && (
              <h3 className="mb-6 text-center font-serif text-xl italic text-rose sm:mb-8 sm:text-3xl">
                {letter.title}
              </h3>
            )}

            <p className="mb-5 font-semibold capitalize text-choc/85 sm:mb-6">{letter.greeting}</p>

            {letter.paragraphs.map((p, n) => {
              const isQuestion = p.trim() === 'Will you be my girlfriend? ♡'
              const isBoldEmphasis = p.startsWith('Neha, I like you.')

              if (isQuestion) {
                return (
                  <div key={n} className="my-8 text-center sm:my-10">
                    <p className="text-3xl font-bold text-rose drop-shadow-xs sm:text-4xl">
                      {p}
                    </p>
                    <div className="relative mt-6 flex flex-col items-center justify-center gap-3.5 sm:mt-8 sm:flex-row sm:gap-6">
                      {!accepted ? (
                        <>
                          {/* YES BUTTON */}
                          <motion.button
                            onClick={handleYes}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose to-[#c78282] px-7 py-3.5 font-hand text-xl text-soft shadow-[0_8px_25px_rgba(217,169,169,0.5)] transition-all hover:shadow-[0_12px_30px_rgba(217,169,169,0.65)] focus:outline-none sm:px-9 sm:py-4 sm:text-2xl cursor-pointer"
                          >
                            <Heart size={22} className="fill-soft animate-pulse" />
                            <span>Yes! A million times yes ♡</span>
                          </motion.button>

                          {/* NO BUTTON (playfully evasive) */}
                          <motion.button
                            type="button"
                            onMouseEnter={handleNoDodge}
                            onTouchStart={handleNoDodge}
                            onClick={handleNoDodge}
                            animate={{ x: noPos.x, y: noPos.y }}
                            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                            className="rounded-full border border-rose/30 bg-white/80 px-5 py-2.5 font-hand text-lg text-choc/75 shadow-xs transition-colors hover:bg-cream focus:outline-none sm:px-6 sm:py-3 sm:text-xl cursor-pointer"
                          >
                            {noTexts[noIndex]}
                          </motion.button>
                        </>
                      ) : (
                        <motion.div
                          initial={{ scale: 0.85, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="rounded-2xl border border-rose/40 bg-rose/15 px-6 py-4 text-center font-hand text-xl text-rose shadow-md sm:px-9 sm:py-5 sm:text-3xl"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Sparkles size={24} className="text-rose animate-spin-slow" />
                            <p className="font-bold">✨ Neha said YES! ♡</p>
                          </div>
                          <p className="mt-2 text-base text-choc/80 sm:text-xl font-normal">
                            Taking you to our future letter in a moment... ↓
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )
              }

              return (
                <p
                  key={n}
                  className={`mb-5 sm:mb-6 ${
                    isBoldEmphasis
                      ? 'rounded-xl border border-rose/30 bg-rose/10 p-4 font-semibold text-choc sm:p-5'
                      : ''
                  }`}
                >
                  {p}
                </p>
              )
            })}

            {letter.postscript && (
              <p className="mt-6 italic text-choc/75 sm:mt-8 sm:text-xl">
                {letter.postscript}
              </p>
            )}

            <p className="mt-8 font-hand text-xl sm:mt-10 sm:text-2xl text-choc/85">{letter.signoff}</p>
            <p className="font-hand text-2xl font-bold text-rose sm:text-3xl">{letter.name}</p>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  )
}
