import Reveal from '../components/Reveal'
import Polaroid from '../components/Polaroid'
import { aboutPhotos } from '../data/memories'

export default function AboutHer() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-32">
      <Reveal as="h2" className="mb-12 text-center text-2xl italic sm:mb-20 sm:text-5xl">
        If I could describe my favourite view...
      </Reveal>
      <div className="grid items-start gap-10 sm:gap-14 md:grid-cols-3">
        {aboutPhotos.map((p, n) => (
          <Reveal key={n} delay={n * 0.15} className={`relative flex justify-center pb-8 sm:pb-10 ${n === 1 ? 'md:mt-20' : n === 2 ? 'md:-mt-6' : ''}`}>
            <Polaroid {...p} idx={n} tape={n !== 1} />
            <span className="absolute bottom-0 font-hand text-lg text-rose sm:text-xl" style={{ transform: `rotate(${-p.rot}deg)` }}>
              {p.note}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
