import Reveal from '../components/Reveal'
import PaperPlane from '../components/PaperPlane'
import { hero } from '../data/memories'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center sm:px-6 sm:py-0">
      <PaperPlane top="7%" duration={24} size={36} />

      <div className="relative z-10 mx-auto max-w-3xl rounded-3xl bg-ivory/60 px-6 py-8 sm:px-12 sm:py-12 backdrop-blur-md border border-white/70 shadow-[0_8px_32px_rgba(73,56,50,0.06)]">
        <Reveal as="h1" y={25} className="text-3xl font-serif font-medium italic leading-snug text-choc sm:text-5xl md:text-6xl drop-shadow-[0_1px_8px_rgba(255,255,255,0.7)]">
          {hero.title}
        </Reveal>
        <Reveal delay={0.4} as="p" className="mt-5 max-w-xl mx-auto text-base text-choc/85 sm:mt-6 sm:text-xl font-normal leading-relaxed drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)]">
          {hero.subtitle}
        </Reveal>
      </div>

      <Reveal delay={1.2} className="absolute bottom-6 font-hand text-xl text-choc/75 sm:bottom-10 sm:text-2xl drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]">
        <span className="float inline-block">{hero.hint}</span>
      </Reveal>
    </section>
  )
}

