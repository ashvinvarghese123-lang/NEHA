import Reveal from '../components/Reveal'
import PaperPlane from '../components/PaperPlane'
import { finale } from '../data/memories'

export default function Finale() {
  return (
    <section className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 py-12 text-center sm:px-6 sm:py-0">
      <PaperPlane top="25%" duration={34} size={34} />
      <Reveal as="p" className="max-w-3xl text-2xl italic leading-snug text-choc sm:text-5xl">
        {finale.line}
      </Reveal>
      <Reveal delay={1.8} as="p" className="mt-10 font-hand text-xl text-brown sm:mt-16 sm:text-2xl">
        {finale.signoff}
      </Reveal>
    </section>
  )
}
