import { motion } from 'framer-motion'

export default function Envelope({ open, onOpen }) {
  return (
    <button
      onClick={onOpen}
      aria-expanded={open}
      aria-label="Open the envelope"
      className="group relative mx-auto block h-42 w-68 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose sm:h-48 sm:w-80"
    >
      {/* Envelope Back Body */}
      <div className="paper absolute inset-0 rounded-md bg-cream shadow-[0_12px_30px_rgba(73,56,50,0.12)] border border-[#e8dccf]" />

      {/* Flap */}
      <motion.div
        className="absolute inset-x-0 top-0 h-22 sm:h-25 origin-top bg-[#e6d6c3] shadow-inner"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          WebkitBackfaceVisibility: 'hidden',
        }}
        animate={{ rotateX: open ? 180 : 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Embossed Wax Seal */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-1/2 top-[66px] sm:top-[74px] -translate-x-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#d48b8b] to-[#b36b6b] text-soft shadow-[0_3px_10px_rgba(179,107,107,0.4)] border border-[#e8a3a3]"
      >
        <span className="font-serif text-sm sm:text-base select-none">♡</span>
      </motion.div>

      {!open && (
        <span className="absolute -bottom-8 left-0 right-0 text-center font-hand text-lg text-rose sm:-bottom-9 sm:text-xl font-medium transition-colors group-hover:text-choc">
          tap to open your letter ♡
        </span>
      )}
    </button>
  )
}
