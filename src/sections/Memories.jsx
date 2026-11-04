import Reveal from '../components/Reveal'
import Polaroid from '../components/Polaroid'
import { memories } from '../data/memories'

export default function Memories() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-32">
      <Reveal as="h2" className="mb-12 text-center text-2xl italic sm:mb-16 sm:text-5xl">
        our little memories
      </Reveal>
      <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
        {memories.map((m, n) => (
          <Reveal key={n} delay={(n % 3) * 0.1} className={`mb-10 sm:mb-14 flex break-inside-avoid justify-center ${n % 2 ? 'sm:pt-7' : ''}`}>
            <Polaroid video={m.type === 'video'} {...m} idx={n} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
