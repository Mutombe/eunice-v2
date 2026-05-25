import { Helmet } from 'react-helmet-async'
import { brand } from '../data/siteData.js'

/* Per-page <head> management. Drop one <Seo> into each page.
   Defers title / description / canonical / OG / Twitter to React so every
   route has its own metadata (the static index.html only holds defaults). */

const SITE_URL = brand.siteUrl
const SITE_NAME = 'Eunice De Campi'
const DEFAULT_TITLE = 'Eunice De Campi — Wellbeing, Reinvention & Intentional Living'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

export default function Seo({
  title,
  description = '',
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
