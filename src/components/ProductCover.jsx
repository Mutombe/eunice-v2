import { Link } from 'react-router-dom'

/**
 * ProductCover (v2 · Atelier) — every shop product is a published *object*
 * and deserves a cover that reads as such. This is the architectural sibling
 * of v1's Living-Journal cover: same idea, drawn through Atelier's voice —
 * Italiana display, JetBrains Mono index strips, drafting rules, and a
 * museum-label spec foot.
 *
 * Tone is per-product so the catalogue feels like six distinct editions, not
 * one template repeated.
 */

// Wash colour over the photo. Sourced from v2's palette (ink/olive/clay/stone).
const TONES = {
  ink: {
    wash: 'rgba(26, 26, 25, 0.72)',     // ink-500
    text: 'text-paper-warm',
    soft: 'text-paper-warm/60',
    rule: 'border-paper-warm/22',
    ruleBg: 'bg-paper-warm/22',
    spine: 'bg-paper-warm/10',
    stamp: 'text-paper-warm/12',
  },
  'ink-soft': {
    wash: 'rgba(63, 61, 56, 0.65)',     // ink-400
    text: 'text-paper-warm',
    soft: 'text-paper-warm/65',
    rule: 'border-paper-warm/22',
    ruleBg: 'bg-paper-warm/22',
    spine: 'bg-paper-warm/12',
    stamp: 'text-paper-warm/14',
  },
  olive: {
    wash: 'rgba(93, 106, 63, 0.68)',    // olive-500
    text: 'text-paper-warm',
    soft: 'text-paper-warm/72',
    rule: 'border-paper-warm/28',
    ruleBg: 'bg-paper-warm/28',
    spine: 'bg-paper-warm/18',
    stamp: 'text-paper-warm/16',
  },
  'olive-deep': {
    wash: 'rgba(46, 55, 31, 0.78)',     // olive-700
    text: 'text-paper-warm',
    soft: 'text-paper-warm/65',
    rule: 'border-paper-warm/22',
    ruleBg: 'bg-paper-warm/22',
    spine: 'bg-paper-warm/14',
    stamp: 'text-paper-warm/14',
  },
  clay: {
    wash: 'rgba(169, 108, 63, 0.65)',   // clay-500
    text: 'text-paper-warm',
    soft: 'text-paper-warm/75',
    rule: 'border-paper-warm/28',
    ruleBg: 'bg-paper-warm/28',
    spine: 'bg-paper-warm/18',
    stamp: 'text-paper-warm/16',
  },
  stone: {
    wash: 'rgba(214, 207, 196, 0.62)',  // stone-300
    text: 'text-ink-500',
    soft: 'text-ink/55',
    rule: 'border-ink/22',
    ruleBg: 'bg-ink/22',
    spine: 'bg-ink/14',
    stamp: 'text-ink/12',
  },
}

function renderTitle(name, italic) {
  if (!italic) return name
  const idx = name.toLowerCase().indexOf(italic.toLowerCase())
  if (idx === -1) return name
  return (
    <>
      {name.slice(0, idx)}
      <span className="display-italic">{name.slice(idx, idx + italic.length)}</span>
      {name.slice(idx + italic.length)}
    </>
  )
}

export default function ProductCover({
  product,
  size = 'compact',          // 'compact' | 'large' | 'hero'
  asLink = true,
  showRibbon = true,
  className = '',
}) {
  const tone = TONES[product.tone] || TONES.ink
  const Tag = asLink ? Link : 'div'
  const linkProps = asLink ? { to: `/shop/${product.slug}` } : {}

  // Type scale per size — display-thin is Italiana 400, very precise.
  const titleClass = {
    compact: 'text-3xl md:text-4xl',
    large:   'text-4xl md:text-6xl',
    hero:    'text-5xl md:text-7xl',
  }[size]

  const subtitleClass = {
    compact: 'text-base md:text-lg',
    large:   'text-lg md:text-xl',
    hero:    'text-xl md:text-2xl',
  }[size]

  const padClass = {
    compact: 'p-6 md:p-7',
    large:   'p-8 md:p-12',
    hero:    'p-8 md:p-14',
  }[size]

  const stampClass = {
    compact: 'text-[8rem] md:text-[10rem]',
    large:   'text-[12rem] md:text-[16rem]',
    hero:    'text-[14rem] md:text-[20rem]',
  }[size]

  // Aspect ratio per size — large (featured spread) gets a much shorter ratio.
  const aspectClass = {
    compact: 'aspect-[4/5]',
    large:   'aspect-[5/6] md:aspect-[6/7]',
    hero:    'aspect-[4/5]',
  }[size]

  return (
    <Tag
      {...linkProps}
      className={`group relative block overflow-hidden ${aspectClass} ${className}`}
    >
      {/* Photograph (the cover artwork) */}
      <img
        src={product.cover}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
      />

      {/* Tone wash */}
      <div className="absolute inset-0" style={{ backgroundColor: tone.wash }} />

      {/* Soft top + foot vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35 pointer-events-none" />

      {/* Drafting cross-hatch — extremely faint architectural texture */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(4deg, rgba(255,255,255,0.7) 0 1px, transparent 1px 7px)',
        }}
      />

      {/* Drafting rule on the binding edge — vertical hairline + a thin spine */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 md:w-2 ${tone.spine}`} />
      <div className={`absolute left-1.5 md:left-2 top-0 bottom-0 w-px ${tone.ruleBg}`} />

      {/* Vertical mono label — series name running up the binding edge */}
      {product.series && size !== 'compact' && (
        <span
          className={`absolute left-3.5 md:left-5 top-1/2 -translate-y-1/2 select-none pointer-events-none ${tone.soft}`}
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg) translateX(50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          {product.series}
        </span>
      )}

      {/* Giant ghost stamp — Atelier index numeral in the foot-right */}
      {product.stamp && (
        <span
          aria-hidden
          className={`absolute right-3 -bottom-8 md:right-6 md:-bottom-12 select-none pointer-events-none display-italic leading-none ${stampClass} ${tone.stamp}`}
        >
          {product.stamp}
        </span>
      )}

      {/* === Cover content === */}
      <div className={`relative h-full flex flex-col ${tone.text} ${padClass}`}>
        {/* Top — mono index strip */}
        <div className="flex items-baseline justify-between gap-4">
          <span className={`mono ${tone.soft}`}>
            {product.num} · {product.edition || product.kind}
          </span>
          <span className={`mono-sm tabular ${tone.soft}`}>{product.price}</span>
        </div>

        {/* Centre — title + subtitle */}
        <div className="flex-1 flex flex-col justify-center mt-6">
          <h3 className={`display-thin leading-[0.9] ${titleClass}`}>
            {renderTitle(product.name, product.italicTitle)}
          </h3>
          {product.subtitle && (
            <p className={`mt-3 display-italic leading-snug ${subtitleClass} ${tone.soft}`}>
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Foot — museum-label spec strip */}
        <div className={`mt-auto pt-4 border-t ${tone.rule} grid grid-cols-3 gap-3 items-end`}>
          <div className="col-span-2 mono-sm leading-[1.7] text-[0.55rem]">
            <div>{product.format || product.kind}</div>
            <div className={`opacity-80 ${tone.soft}`}>
              {[product.pages, product.binding].filter(Boolean).join(' · ')}
            </div>
          </div>
          <span
            className={`text-right tabular display-thin leading-none ${size === 'compact' ? 'text-2xl' : 'text-3xl md:text-4xl'}`}
          >
            {product.price}
          </span>
        </div>
      </div>

      {/* Featured ribbon — atelier-style: simple bar in clay */}
      {showRibbon && product.featured && (
        <span className="absolute top-4 right-4 mono-sm text-[0.55rem] bg-clay-500 text-paper-warm px-2.5 py-1.5">
          ★ Featured
        </span>
      )}
    </Tag>
  )
}
