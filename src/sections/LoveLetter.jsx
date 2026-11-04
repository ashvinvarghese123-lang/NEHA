import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Paperclip, Heart } from 'lucide-react'
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
    }, 1200)
  }

  const handleNoDodge = () => {
    setNoIndex((prev) => (prev + 1) % noTexts.length)
    const maxOffset = typeof window !== 'undefined' && window.innerWidth < 640 ? 55 : 120
    const randomX = (Math.random() - 0.5) * maxOffset
    const randomY = (Math.random() - 0.5) * 45
    setNoPos({ x: randomX, y: randomY })
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-32 overflow-hidden">
      <Reveal className="mb-12 sm:mb-16"><Envelope open={open} onOpen={() => setOpen(true)} /></Reveal>
      <AnimatePresence>
        {open && (
          <motion.article
            initial={{ opacity: 0, y: 40, scaleY: 0.7 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top', clipPath: 'polygon(0 1%,4% 0,50% 1%,97% 0,100% 2%,99% 50%,100% 98%,60% 100%,3% 99%,0 96%)' }}
            className="paper relative mt-8 px-5 py-7 font-hand text-xl leading-relaxed text-choc sm:mt-10 sm:px-12 sm:py-12 sm:text-2xl sm:leading-loose"
          >
            <Paperclip className="absolute -top-1 left-6 sm:left-8 text-brown" size={30} />
            <p className="mb-3 text-right text-base text-brown sm:mb-4 sm:text-lg">{letter.date}</p>

            {letter.title && (
              <h3 className="mb-6 text-center font-serif text-xl italic text-rose sm:mb-8 sm:text-3xl">
                {letter.title}
              </h3>
            )}

            <p className="mb-5 font-semibold capitalize text-brown sm:mb-6">{letter.greeting}</p>

            {letter.paragraphs.map((p, n) => {
              const isQuestion = p.trim() === 'Will you be my girlfriend? ♡'
              const isBoldEmphasis = p.startsWith('Neha, I like you.')

              if (isQuestion) {
                return (
                  <div key={n} className="my-8 text-center sm:my-10">
                    <p className="text-2xl font-semibold text-rose drop-shadow-xs sm:text-4xl">
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
                            className="flex items-center justify-center gap-2 rounded-full bg-rose px-6 py-3 font-hand text-xl text-soft shadow-md transition-all hover:bg-[#c88a8a] hover:shadow-lg focus:outline-none sm:px-8 sm:py-3.5 sm:text-2xl"
                          >
                            <Heart size={20} className="fill-soft animate-pulse" />
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
                            className="rounded-full border border-brown/30 bg-cream/70 px-5 py-2.5 font-hand text-lg text-brown shadow-xs transition-colors hover:bg-cream focus:outline-none sm:px-6 sm:py-3 sm:text-xl"
                          >
                            {noTexts[noIndex]}
                          </motion.button>
                        </>
                      ) : (
                        <motion.div
                          initial={{ scale: 0.85, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="rounded-2xl border border-rose/30 bg-rose/10 px-6 py-4 text-center font-hand text-xl text-rose shadow-xs sm:px-8 sm:py-5 sm:text-3xl"
                        >
                          <p>✨ Neha said YES! ♡</p>
                          <p className="mt-1.5 text-base text-brown sm:text-xl">
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
                  className={`mb-5 sm:mb-6 ${isBoldEmphasis ? 'rounded-xl border border-rose/25 bg-rose/5 p-3.5 font-semibold text-choc sm:p-4' : ''}`}
                >
                  {p}
                </p>
              )
            })}

            {letter.postscript && (
              <p className="mt-6 italic text-brown sm:mt-8 sm:text-xl">
                {letter.postscript}
              </p>
            )}

            <p className="mt-8 font-hand text-xl sm:mt-10 sm:text-2xl">{letter.signoff}</p>
            <p className="font-hand text-2xl font-semibold text-rose sm:text-3xl">{letter.name}</p>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  )
}
