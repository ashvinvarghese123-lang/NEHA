import Reveal from '../components/Reveal'
import PaperPlane from '../components/PaperPlane'
import { finale } from '../data/memories'

export default function Finale() {
  return (
    <section className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 py-16 text-center sm:px-6 sm:py-0">
      <PaperPlane top="18%" duration={30} size={34} />

      <div className="relative z-10 max-w-3xl px-2">
        <Reveal delay={0.2} as="span" className="mb-4 block font-hand text-xl text-rose sm:text-2xl">
          always &amp; forever ♡
        </Reveal>

        <Reveal as="p" className="text-2xl font-serif italic leading-snug text-choc sm:text-5xl md:text-6xl drop-shadow-[0_2px_14px_rgba(248,243,234,0.9)]">
          {finale.line}
        </Reveal>

        <Reveal delay={0.6} className="my-6 sm:my-8 flex items-center justify-center gap-3 opacity-75">
          <span className="h-px w-12 bg-rose/40" />
          <span className="text-rose text-sm">♡</span>
          <span className="h-px w-12 bg-rose/40" />
        </Reveal>

        <Reveal delay={0.9} as="p" className="mx-auto max-w-xl font-hand text-xl text-choc/85 sm:text-2xl leading-relaxed drop-shadow-[0_1px_6px_rgba(248,243,234,0.9)]">
          {finale.signoff}
        </Reveal>

        <Reveal delay={1.2} className="mt-8 sm:mt-10 inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white/70 px-5 py-2 font-hand text-base text-rose shadow-xs">
          <span>Ashvin</span>
          <span>♡</span>
          <span>Neha</span>
        </Reveal>
      </div>
    </section>
  )
}
