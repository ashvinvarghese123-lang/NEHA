import { motion } from 'framer-motion'

const tints = ['#E9D5CB', '#DCC3B9', '#EADFCF', '#D9A9A9']

export default function Polaroid({ src, poster, video, caption, rot = 0, tape, idx = 0, className = '', eager = false }) {
  return (
    <motion.figure
      whileHover={{ rotate: 0, scale: 1.035, zIndex: 25 }}
      whileTap={{ scale: 0.98 }}
      style={{ rotate: rot, WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
      className={`paper relative w-full max-w-xs p-2 pb-3.5 sm:p-3.5 sm:pb-5 select-none transition-shadow duration-300 hover:shadow-[0_16px_35px_-5px_rgba(73,56,50,0.2)] ${className}`}
    >
      {tape && (
        <span
          className="absolute -top-2.5 left-1/2 h-3.5 w-14 -translate-x-1/2 -rotate-2 rounded-xs bg-gradient-to-r from-rose/40 via-rose/55 to-rose/40 border border-white/40 shadow-xs sm:-top-3 sm:h-5 sm:w-22"
          style={{ backdropFilter: 'blur(2px)' }}
        />
      )}
      <div className="aspect-[4/5] overflow-hidden rounded-xs bg-cream shadow-inner">
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
            className="pointer-events-none h-full w-full select-none object-cover transition-transform duration-[3000ms] ease-out hover:scale-105"
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
      <figcaption className="mt-1.5 text-center font-hand text-sm sm:mt-2.5 sm:text-2xl leading-tight text-choc/85 tracking-wide">
        {caption}
      </figcaption>
    </motion.figure>
  )
}
