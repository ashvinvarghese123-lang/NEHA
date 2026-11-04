import { motion } from 'framer-motion'

const tints = ['#E9D5CB', '#DCC3B9', '#EADFCF', '#D9A9A9']

export default function Polaroid({ src, poster, video, caption, rot = 0, tape, idx = 0, className = '', eager = false }) {
  return (
    <motion.figure
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 20 }}
      whileTap={{ scale: 0.98 }}
      style={{ rotate: rot, WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
      className={`paper relative w-full max-w-xs p-1.5 pb-2.5 sm:p-3 sm:pb-4 select-none ${className}`}
    >
      {tape && (
        <span className="absolute -top-2 left-1/2 h-3.5 w-14 -translate-x-1/2 -rotate-2 bg-rose/50 shadow-xs sm:-top-3 sm:h-6 sm:w-24" />
      )}
      <div className="aspect-[4/5] overflow-hidden rounded-xs bg-cream">
        {video && src ? (
          <video
            src={src}
            poster={poster}
            controls
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="none"
            className="h-full w-full object-cover"
          />
        ) : src ? (
          <img
            src={src}
            alt={caption}
            loading={eager ? 'eager' : 'lazy'}
            decoding={eager ? 'sync' : 'async'}
            draggable="false"
            className="pointer-events-none h-full w-full select-none object-cover transition-transform duration-[4000ms] hover:scale-105"
            style={{ WebkitTouchCallout: 'none' }}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center font-hand text-xs sm:text-xl text-brown/70"
            style={{ background: tints[idx % 4] }}
          >
            your {video ? 'video' : 'photo'} here
          </div>
        )}
      </div>
      <figcaption className="mt-1 text-center font-hand text-xs sm:mt-2.5 sm:text-2xl leading-tight text-brown">
        {caption}
      </figcaption>
    </motion.figure>
  )
}
