import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, Paperclip } from 'lucide-react'
import Reveal from '../components/Reveal'
import Envelope from '../components/Envelope'
import { futureLetter as L } from '../data/futureLetter'

const target = new Date(L.unlockAt).getTime()
const pad = (n) => String(n).padStart(2, '0')

export default function FutureLetter() {
  const [now, setNow] = useState(Date.now())
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const left = target - now
  const locked = left > 0
  const s = Math.max(0, Math.floor(left / 1000))
  const units = [
    ['days', Math.floor(s / 86400)],
    ['hours', Math.floor((s % 86400) / 3600)],
    ['minutes', Math.floor((s % 3600) / 60)],
    ['seconds', s % 60],
  ]
  const when = new Date(target).toLocaleString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <section id="future-letter" className="mx-auto max-w-2xl px-4 pb-28 pt-16 text-center sm:px-6 sm:pb-40 sm:pt-24 overflow-hidden">
      <Reveal as="h2" className="mb-8 font-hand text-2xl text-brown sm:mb-12 sm:text-3xl">
        a letter for later
      </Reveal>

      {locked ? (
        <Reveal>
          <div className="paper relative mx-auto mb-8 flex h-40 w-64 items-center justify-center bg-cream sm:mb-12 sm:h-44 sm:w-72">
            <div
              className="absolute inset-x-0 top-0 h-20 bg-[#E6D8C7] sm:h-24"
              style={{ clipPath: 'polygon(0 0,100% 0,50% 100%)' }}
            />
            <Lock className="relative z-10 mt-5 text-brown sm:mt-6" size={30} />
          </div>
          <div className="mx-auto grid max-w-sm grid-cols-4 gap-1.5 sm:gap-3" role="timer" aria-label="Time until the letter opens">
            {units.map(([label, v]) => (
              <div key={label} className="paper px-1 py-2 sm:py-3">
                <div className="text-2xl tabular-nums sm:text-4xl">{label === 'days' ? v : pad(v)}</div>
                <div className="font-hand text-sm text-brown sm:text-lg">{label}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 font-hand text-xl text-brown sm:mt-10 sm:text-2xl">This one stays sealed until {when}.</p>
          <p className="mt-1.5 font-hand text-lg text-rose sm:mt-2 sm:text-xl">Come back then. It will be worth the wait.</p>
        </Reveal>
      ) : (
        <>
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
                className="paper relative mt-8 px-5 py-7 text-left font-hand text-xl leading-relaxed text-choc sm:mt-10 sm:px-12 sm:py-12 sm:text-2xl sm:leading-loose"
              >
                <Paperclip className="absolute -top-1 left-6 sm:left-8 text-brown" size={30} />
                <p className="mb-4 text-right text-base text-brown sm:mb-6 sm:text-xl">{L.date}</p>
                <p className="mb-4 font-semibold capitalize sm:mb-6">{L.greeting}</p>
                {L.paragraphs.map((p, n) => (
                  <p key={n} className="mb-4 sm:mb-6">
                    {p}
                  </p>
                ))}
                <p className="mt-8 sm:mt-10">{L.signoff}</p>
                <p className="font-semibold text-rose">{L.name}</p>
              </motion.article>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  )
}
