import Reveal from '../components/Reveal'
import Polaroid from '../components/Polaroid'
import { memories } from '../data/memories'

export default function Memories() {
  return (
    <section className="mx-auto max-w-5xl px-3 py-16 sm:px-6 sm:py-32">
      <Reveal as="h2" className="mb-10 text-center text-2xl italic sm:mb-16 sm:text-5xl">
        our little memories
      </Reveal>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
        {memories.map((m, n) => (
          <Reveal
            key={n}
            delay={(n % 3) * 0.1}
            className={`flex justify-center pb-2 sm:pb-4 ${n === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
          >
            <Polaroid video={m.type === 'video'} {...m} idx={n} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
