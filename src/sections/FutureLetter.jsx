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
    ['mins', Math.floor((s % 3600) / 60)],
    ['secs', s % 60],
  ]
  const when = new Date(target).toLocaleString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <section id="future-letter" className="mx-auto max-w-2xl px-4 pb-28 pt-16 text-center sm:px-6 sm:pb-40 sm:pt-24">
      <Reveal as="h2" className="mb-2 font-serif text-2xl italic text-choc sm:text-4xl">
        a letter for later
      </Reveal>
      <Reveal delay={0.2} as="p" className="mb-8 font-hand text-lg text-rose sm:mb-12 sm:text-2xl">
        our little time capsule for the future ♡
      </Reveal>

      {locked ? (
        <Reveal>
          <div className="paper relative mx-auto mb-8 flex h-42 w-68 items-center justify-center rounded-md bg-cream shadow-[0_12px_30px_rgba(73,56,50,0.12)] border border-[#e8dccf] sm:mb-12 sm:h-48 sm:w-80">
            <div
              className="absolute inset-x-0 top-0 h-22 sm:h-25 bg-[#e6d6c3] shadow-inner"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />
            <div className="relative z-10 mt-6 sm:mt-7 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/80 shadow-md border border-rose/30">
              <Lock className="text-rose" size={20} />
            </div>
          </div>

          <div className="mx-auto grid max-w-sm grid-cols-4 gap-2 sm:gap-3" role="timer" aria-label="Time until the letter opens">
            {units.map(([label, v]) => (
              <div key={label} className="paper rounded-xl px-1.5 py-3 sm:py-4 shadow-[0_6px_20px_rgba(73,56,50,0.08)] border border-white/80">
                <div className="font-serif text-2xl font-bold tabular-nums text-choc sm:text-4xl">
                  {label === 'days' ? v : pad(v)}
                </div>
                <div className="mt-0.5 font-hand text-xs text-rose sm:text-sm font-semibold uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 font-hand text-xl text-choc/85 sm:mt-10 sm:text-2xl">
            This one stays sealed until {when}.
          </p>
          <p className="mt-2 font-hand text-lg text-rose sm:text-xl font-medium">
            Come back then. It will be worth the wait ♡
          </p>
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
                className="paper relative mt-8 px-6 py-8 text-left font-hand text-xl leading-relaxed text-choc rounded-xs shadow-[0_20px_50px_rgba(73,56,50,0.14)] border border-white/80 sm:mt-12 sm:px-14 sm:py-14 sm:text-2xl sm:leading-loose"
              >
                <Paperclip className="absolute -top-1.5 left-6 sm:left-8 text-[#b8926a]" size={32} />
                <p className="mb-3 text-right font-hand text-base text-choc/60 sm:mb-4 sm:text-lg font-medium">{L.date}</p>
                <p className="mb-4 font-semibold capitalize sm:mb-6">{L.greeting}</p>
                {L.paragraphs.map((p, n) => (
                  <p key={n} className="mb-4 sm:mb-6">
                    {p}
                  </p>
                ))}
                <p className="mt-8 sm:mt-10">{L.signoff}</p>
                <p className="font-semibold text-rose text-2xl">{L.name}</p>
              </motion.article>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  )
}
