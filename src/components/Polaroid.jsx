import { motion } from 'framer-motion'

const tints = ['#E9D5CB', '#DCC3B9', '#EADFCF', '#D9A9A9']

export default function Polaroid({ src, poster, video, caption, rot = 0, tape, idx = 0, className = '', eager = false }) {
  return (
    <motion.figure
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 20 }}
      whileTap={{ scale: 0.98 }}
      style={{ rotate: rot, WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
      className={`paper relative w-full max-w-xs p-3 pb-4 select-none ${className}`}
    >
      {tape && <span className="absolute -top-3 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2 bg-rose/50 shadow-xs sm:h-6 sm:w-24" />}
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
            className="flex h-full w-full items-center justify-center font-hand text-xl text-brown/70"
            style={{ background: tints[idx % 4] }}
          >
            your {video ? 'video' : 'photo'} here
          </div>
        )}
      </div>
      <figcaption className="mt-2.5 text-center font-hand text-xl text-brown sm:mt-3 sm:text-2xl">
        {caption}
      </figcaption>
    </motion.figure>
  )
}
