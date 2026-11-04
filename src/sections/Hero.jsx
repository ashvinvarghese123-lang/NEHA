import Reveal from '../components/Reveal'
import PaperPlane from '../components/PaperPlane'
import { hero } from '../data/memories'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 py-12 text-center sm:px-6 sm:py-0">
      <PaperPlane top="14%" duration={22} size={38} />
      <Reveal as="h1" y={30} className="max-w-4xl text-3xl font-medium italic leading-snug sm:text-6xl md:text-7xl">
        {hero.title}
      </Reveal>
      <Reveal delay={0.6} as="p" className="mt-6 max-w-lg text-base text-brown sm:mt-8 sm:text-xl">
        {hero.subtitle}
      </Reveal>
      <Reveal delay={1.4} className="absolute bottom-6 font-hand text-xl text-brown sm:bottom-10 sm:text-2xl">
        <span className="float inline-block">{hero.hint}</span>
      </Reveal>
    </section>
  )
}
