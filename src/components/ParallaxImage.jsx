import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * ParallaxImage — every image in the site goes through this component.
 *
 * `ratio` (preferred) sets a formal aspect ratio:
 *   "cinematic" 21/9 · "hero" 16/9 · "spread" 4/3 · "plate" 4/3
 *   "cover" 4/5 · "tall" 3/4 · "square" 1/1 · "portrait" 2/3
 */
export default function ParallaxImage({
  src, alt = '',
  ratio,
  wrapperClass = '',
  className = '',
  intensity = 0.18,
  scaleOnEnter = true,
  objectPosition = 'center',
  wipe = false,
  width,
  height,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-intensity * 100}%`, `${intensity * 100}%`])
  const scale = useTransform(scrollYProgress, [0, 1], scaleOnEnter ? [1.08, 1] : [1, 1])
  const ratioClass = ratio ? `img-${ratio}` : ''
  return (
    <div ref={ref} className={`overflow-hidden ${ratioClass} ${wrapperClass}`}>
      <motion.div
        initial={wipe ? { clipPath: 'inset(0 100% 0 0)' } : {}}
        whileInView={wipe ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={wipe ? { duration: 1.4, ease: [0.7, 0, 0.3, 1] } : {}}
        viewport={{ once: true, margin: '-60px' }}
        className="w-full h-full"
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          width={width}
          height={height}
          style={{ y, scale, objectPosition }}
          className={`w-full h-full object-cover ${className}`}
        />
      </motion.div>
    </div>
  )
}
