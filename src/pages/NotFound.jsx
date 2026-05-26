import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'

/* 404 — soft, considered, brand-voiced. Renders inside the public Layout
 * so chrome (Nav + Footer + Cookie banner) stays consistent.
 *
 * `noindex` is set so search engines don't try to rank this page. */

export default function NotFound() {
  return (
    <PageTransition>
      <Seo
        title="Not found"
        path=""
        description="The page you were looking for is not here."
        noindex
      />
      <section className="container-edge py-32 md:py-44 text-center">
        <p className="mono text-clay-500 tracking-[0.2em]">— 404</p>
        <h1 className="mt-8 display-thin text-[clamp(3rem,9vw,8rem)] leading-[0.9]">
          A door, <span className="display-italic">unmarked.</span>
        </h1>
        <p className="mt-10 max-w-xl mx-auto text-lg md:text-xl text-ink/80 leading-relaxed">
          The page you were looking for is not here. It may have moved, or it may
          never have existed — both are fine. Try one of the rooms below, or write
          to the studio if you arrived by a broken link.
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {[
            { to: '/',           label: 'Studio'     },
            { to: '/about',      label: 'About'      },
            { to: '/practice',   label: 'Practice'   },
            { to: '/programmes', label: 'Programmes' },
            { to: '/journal',    label: 'Journal'    },
            { to: '/shop',       label: 'Shop'       },
            { to: '/membership', label: 'Membership' },
            { to: '/enquire',    label: 'Enquire'    },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="mono-sm text-ink/80 hover:text-clay-500 border border-ink/15 hover:border-clay-500 py-3 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <p className="mt-16 mono-sm text-ink/60">
          Or write to{' '}
          <a href="mailto:studio@eunicedecampi.com" className="atelier-link text-ink hover:text-clay-500">
            studio@eunicedecampi.com
          </a>
          .
        </p>
      </section>
    </PageTransition>
  )
}
