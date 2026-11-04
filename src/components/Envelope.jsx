import { motion } from 'framer-motion'

export default function Envelope({ open, onOpen }) {
  return (
    <button
      onClick={onOpen}
      aria-expanded={open}
      aria-label="Open the envelope"
      className="relative mx-auto block h-40 w-64 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose sm:h-44 sm:w-72"
    >
      <div className="paper absolute inset-0 bg-cream" />
      <motion.div
        className="absolute inset-x-0 top-0 h-20 origin-top bg-[#E6D8C7] sm:h-24"
        style={{ clipPath: 'polygon(0 0,100% 0,50% 100%)' }}
        animate={{ rotateX: open ? 180 : 0 }}
        transition={{ duration: 0.9 }}
      />
      <span className="absolute left-1/2 top-[62px] -translate-x-1/2 rounded-full bg-rose px-3 py-1 font-hand text-base text-soft shadow sm:top-[70px] sm:text-lg">
        ♡
      </span>
      {!open && (
        <span className="absolute -bottom-8 left-0 right-0 text-center font-hand text-lg text-brown sm:-bottom-9 sm:text-xl">
          tap to open
        </span>
      )}
    </button>
  )
}
