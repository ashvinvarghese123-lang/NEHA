import Reveal from '../components/Reveal'
import Polaroid from '../components/Polaroid'
import { aboutPhotos } from '../data/memories'

export default function AboutHer() {
  return (
    <section className="mx-auto max-w-5xl px-2.5 py-16 sm:px-6 sm:py-32">
      <Reveal as="h2" className="mb-8 text-center text-2xl italic sm:mb-20 sm:text-5xl">
        If I could describe my favourite view...
      </Reveal>
      {/* 3 card grid view on mobile and desktop */}
      <div className="grid grid-cols-3 items-start gap-2 sm:gap-8 md:gap-14">
        {aboutPhotos.map((p, n) => (
          <Reveal
            key={n}
            delay={n * 0.12}
            className={`relative flex flex-col items-center pb-4 sm:pb-10 ${
              n === 1 ? 'mt-3 sm:mt-12 md:mt-20' : n === 2 ? '-mt-1 sm:-mt-3 md:-mt-6' : ''
            }`}
          >
            <Polaroid {...p} idx={n} tape={n !== 1} />
            <span
              className="mt-1.5 text-center font-hand text-[11px] leading-tight text-rose sm:mt-3 sm:text-xl"
              style={{ transform: `rotate(${-p.rot}deg)` }}
            >
              {p.note}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
