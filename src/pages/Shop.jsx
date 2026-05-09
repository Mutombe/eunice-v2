import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import HairlineDivider from '../components/HairlineDivider.jsx'
import ProductCover from '../components/ProductCover.jsx'
import { shop } from '../data/siteData.js'

export default function Shop() {
  const featured = shop.products.find((p) => p.featured) || shop.products[0]
  const rest = shop.products.filter((p) => p.slug !== featured.slug)

  return (
    <PageTransition>
      <section className="container-edge pt-20 md:pt-28 pb-16">
        <Heading num="05" label="Shop · Printed & digital editions" />
        <h1 className="mt-10 display-thin text-[clamp(3rem,10vw,9rem)] leading-[0.92]">
          Reading, <br /><span className="display-italic">printed</span> &amp; posted.
        </h1>
        <p className="mt-8 max-w-xl text-lg md:text-xl text-ink/80 leading-relaxed">
          {shop.intro}
        </p>
      </section>

      {/* Featured — full cover left, museum-label copy right */}
      <section className="container-edge pb-16 md:pb-24">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-stretch">
            <div className="md:col-span-7">
              <ProductCover product={featured} size="large" />
            </div>
            <div className="md:col-span-5 flex flex-col justify-center md:py-4">
              <span className="mono text-clay-500">— The studio's first edition</span>
              <h2 className="mt-5 display-thin text-3xl md:text-5xl leading-[1.0]">
                On the {featured.italicTitle ? <span className="display-italic">{featured.italicTitle.toLowerCase()}</span> : 'edition'}
                <br />that begins the shelf.
              </h2>
              <p className="mt-7 text-base md:text-lg leading-[1.65] text-ink/85">{featured.blurb}</p>
              <div className="mt-10 border-t border-ink/15 pt-6 flex items-end justify-between flex-wrap gap-4">
                <div>
                  <div className="mono-sm text-ink/55">{featured.format}</div>
                  <div className="display-thin text-3xl tabular mt-1">{featured.price}</div>
                </div>
                <Link
                  to={`/shop/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink-500 text-paper-warm hover:bg-clay-500 transition-colors mono"
                >
                  Open the edition <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <HairlineDivider num="—" label="The full catalogue" />

      <section className="container-edge pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <ProductCover product={p} size="compact" />
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
