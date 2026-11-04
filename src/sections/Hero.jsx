import Reveal from '../components/Reveal'
import PaperPlane from '../components/PaperPlane'
import { hero } from '../data/memories'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 py-12 text-center sm:px-6 sm:py-0">
      <PaperPlane top="8%" duration={26} size={36} />

      <div className="relative z-10 mx-auto max-w-4xl px-2">
        <Reveal delay={0.1} as="span" className="mb-3 block font-hand text-xl tracking-wider text-rose sm:text-2xl">
          a little world, made for Neha ♡
        </Reveal>

        <Reveal as="h1" y={25} className="text-3xl font-serif font-medium italic leading-snug tracking-tight text-choc sm:text-6xl md:text-7xl drop-shadow-[0_2px_14px_rgba(248,243,234,0.9)]">
          {hero.title}
        </Reveal>

        <Reveal delay={0.4} className="my-5 sm:my-7 flex items-center justify-center gap-3 opacity-75">
          <span className="h-px w-10 bg-rose/40" />
          <span className="text-rose text-xs">✦</span>
          <span className="h-px w-10 bg-rose/40" />
        </Reveal>

        <Reveal delay={0.6} as="p" className="mx-auto max-w-xl text-base font-serif italic text-choc/85 sm:text-xl leading-relaxed drop-shadow-[0_1px_8px_rgba(248,243,234,0.9)]">
          {hero.subtitle}
        </Reveal>
      </div>

      <Reveal delay={1.2} className="absolute bottom-6 sm:bottom-10 flex flex-col items-center gap-1 font-hand text-lg text-choc/75 sm:text-xl drop-shadow-[0_1px_6px_rgba(248,243,234,0.95)]">
        <span className="float inline-block">{hero.hint}</span>
      </Reveal>
    </section>
  )
}
