import Reveal from '../components/Reveal'
import { littleThings } from '../data/memories'

export default function LittleThings() {
  return (
    <section className="mx-auto max-w-3xl space-y-10 px-4 py-20 sm:space-y-16 sm:px-6 sm:py-28">
      <div className="text-center mb-6 sm:mb-12">
        <Reveal as="h2" className="text-2xl font-serif italic text-choc sm:text-4xl">
          things I never get tired of
        </Reveal>
        <Reveal delay={0.2} as="p" className="mt-2 font-hand text-lg text-rose sm:text-xl">
          all the little things about you that make every day brighter
        </Reveal>
      </div>

      {littleThings.map((t, n) => (
        <Reveal key={n} className={`flex ${n % 2 ? 'justify-end' : 'justify-start'}`}>
          <div
            className="paper relative max-w-md px-6 py-5 sm:px-8 sm:py-6 rounded-xs shadow-[0_8px_25px_rgba(73,56,50,0.08)] border border-white/80"
            style={{ transform: `rotate(${n % 2 ? 1.8 : -1.8}deg)` }}
          >
            {/* Washi tape pinning the note */}
            <span
              className={`absolute -top-2.5 ${n % 2 ? 'right-8' : 'left-8'} h-3 w-14 rounded-xs bg-rose/45 border border-white/40 shadow-xs sm:-top-3 sm:h-4 sm:w-18`}
              style={{ transform: `rotate(${n % 2 ? -3 : 3}deg)` }}
            />
            <p className="font-hand text-xl leading-relaxed text-choc sm:text-2xl">
              &ldquo;{t}&rdquo;
            </p>
          </div>
        </Reveal>
      ))}
    </section>
  )
}
