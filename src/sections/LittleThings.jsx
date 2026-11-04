import Reveal from '../components/Reveal'
import { littleThings } from '../data/memories'

export default function LittleThings() {
  return (
    <section className="mx-auto max-w-3xl space-y-12 px-4 py-20 sm:space-y-20 sm:px-6 sm:py-32">
      <Reveal as="h2" className="text-center font-hand text-2xl text-brown sm:text-3xl">
        things I never get tired of
      </Reveal>
      {littleThings.map((t, n) => (
        <Reveal key={n} className={`flex ${n % 2 ? 'justify-end' : 'justify-start'}`}>
          <p
            className="paper max-w-md px-5 py-5 font-hand text-2xl leading-normal text-choc sm:px-8 sm:py-6 sm:text-3xl"
            style={{ transform: `rotate(${n % 2 ? 1.5 : -1.5}deg)` }}
          >
            {t}
          </p>
        </Reveal>
      ))}
    </section>
  )
}
