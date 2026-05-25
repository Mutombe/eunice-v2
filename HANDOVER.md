# Eunice De Campi — Studio Handover

A practical guide to running, editing, and deploying the site. Read this once; refer back as needed.

---

## What the site is, in one diagram

```
┌───────────────────────────┐      ┌──────────────────────────┐
│  React + Vite frontend    │ ───▶ │  Django + DRF backend    │
│  (this repo · /src)       │      │  (this repo · /backend)  │
│  → prerendered to static  │      │  → Postgres on Neon      │
│    HTML (Puppeteer)       │      │  → media on DO Spaces    │
└───────────────────────────┘      └──────────────────────────┘
         │                                       │
         ▼                                       ▼
   Public website                          Custom React admin
   eunicedecampi.com                       at /admin
                                                 │
                                                 ▼
                                         Mailerlite (newsletters)
                                         · pushes new subscribers
```

- **Frontend:** React 18 + Vite 6, Tailwind v4, Framer Motion, React Router. 31 routes prerendered to static HTML for SEO. Initial JS is code-split: `react-vendor`, `motion`, `icons`, `helmet`, plus a tiny `index` chunk and per-route lazy chunks.
- **Backend:** Django 5.2 + DRF, Postgres (Neon), DigitalOcean Spaces for uploaded media, first-party analytics, Mailerlite integration for newsletter signups.
- **CMS:** A custom React admin at `/admin` (we do *not* use Django's admin for editing content). All settings, programmes, practice, journal, shop, etc. are edited here.

---

## Editing content (the admin)

1. Visit **`/login`** with your staff credentials. The login screen takes username *or* email + password.
2. You land in the admin at **`/admin`**. The left sidebar groups everything:

| Section | Where to edit what |
|---|---|
| **STUDIO** → Overview · Analytics | Page-view stats, top pages, last 30 days |
| **CONTENT** → Notes & posts · Practice · Programmes · Shop editions | All editorial content. List → edit → save. |
| **COMMERCE** → Inquiries · Orders | Read-only inbox of `/enquire` form submissions; Orders is currently a placeholder |
| **SITE** → Site details · Navigation · Notice bar · Media library | Brand, hero, About/Speaking/Retreats/Legal copy; nav links; top notice bar; image uploads |

**To add a new programme** (or practice, post, shop edition):

- Open the relevant content panel (e.g. `/admin/programmes`)
- Click **+ New** in the top right
- Fill in title, slug, num, etc.
- Image fields take a URL — use the **Media library** to upload, then copy the URL
- Structured fields (modules, inclusions) take JSON. Each panel shows the expected shape
- **Save** persists to the database. Reload the public page to see it live.

**To edit homepage copy / brand info / nav:**

- **`/admin/settings/site`** — brand name, tagline, hero, studio bio, membership pitch, contact channels, About/Speaking/Retreats/Legal copy. Some fields use a JSON editor; the structure is documented inline.
- **`/admin/settings/nav`** — re-order or rename the top nav links.
- **`/admin/settings/notification`** — the small notice bar at the top of every page.
- **`/admin/settings/media`** — upload images; copy the URL into a content panel.

---

## Deploying

The site has **fully automated CI/CD** — push to `main` on GitHub and both halves redeploy.

```
   git push origin main
        │
        ├─────────────────────┐
        ▼                     ▼
   Render watches main    GitHub Actions runs
   → rebuilds Django      → builds Vite + prerenders 31 routes
   → migrates Neon DB     → publishes dist/ to gh-pages branch
   → restarts gunicorn    → GitHub Pages serves it
```

### Frontend (GitHub Pages) — already wired

The workflow lives at `.github/workflows/deploy-frontend.yml`. Every push to `main` that touches `src/`, `public/`, `index.html`, `package.json`, `vite.config.js`, `.env.production`, or `scripts/` triggers a rebuild. You can also fire it manually from the **Actions** tab via "Run workflow".

To redeploy manually from a laptop: `npm run build:gh-pages` then push dist to the gh-pages branch (the workflow does this for you).

### Backend (Render) — first-time setup

**One-time, ~10 minutes.** After this, every push to main auto-redeploys.

1. Open https://render.com and sign in with GitHub.
2. **New → Blueprint** → connect this repo (`Mutombe/eunice-v2`).
3. Render finds `render.yaml` automatically and previews what it will create — one web service called `eunice-backend`. Click **Apply**.
4. Set the secrets in the dashboard (Render's env-var page on the new service). The variables marked `sync: false` in `render.yaml` are intentionally not in git:

   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | The Neon URL from `backend/.env` |
   | `AWS_ACCESS_KEY_ID` | DigitalOcean Spaces access key |
   | `AWS_SECRET_ACCESS_KEY` | DigitalOcean Spaces secret |
   | `MAILERLITE_API_KEY` | Mailerlite token (the long JWT) |
   | `MAILERLITE_GROUP_IDS` | (optional) Comma-separated group IDs |

   `SECRET_KEY` is auto-generated by Render; you don't set it manually.

5. Click **Deploy**. Render runs the build (`pip install` + `collectstatic` + `migrate`) and then `gunicorn`. First deploy takes ~3 minutes.
6. Render assigns a URL like `https://eunice-backend.onrender.com`. Test it: `curl https://eunice-backend.onrender.com/api/health/`.

### Wire the frontend to the live backend

After Render gives you the URL:

- **Quickest** — open `.env.production` in the repo, update `VITE_API_URL` if Render assigned a different subdomain than `eunice-backend`. Commit & push. The GitHub Action rebuilds.
- **Cleaner** — set it as a GitHub **repository variable**:
  - Settings → Secrets and variables → Actions → Variables → New repository variable
  - Name: `VITE_API_URL` · Value: `https://eunice-backend.onrender.com/api`

  The workflow reads this variable, so future deploys never hard-code the URL.

### Enable GitHub Pages (one-time)

Settings → Pages → Source: **Deploy from a branch** → Branch: `gh-pages` → `/ (root)` → Save.

After the first workflow run, the site is at `https://mutombe.github.io/eunice-v2/`.

### Free-tier notes

- **Render free tier** sleeps after 15 min idle. First request after a sleep takes ~30s to wake. Upgrade to $7/mo Starter for no sleep.
- **Neon free tier** sometimes sleeps too — first query after idle takes ~3s. Upgrade ($19/mo) for always-on.
- **Both together cold** ≈ 30s for the very first hit. Subsequent hits are fast. For a quiet personal-brand site that's usually fine.

### Custom domain — `eunicedecampi.com`

Once you have the domain:

1. **Frontend** — In repo Settings → Pages → Custom domain → `eunicedecampi.com`. Add the four GitHub A records + the AAAA records at your DNS provider. Wait for HTTPS provisioning.
2. **Backend** — In Render → Settings → Custom Domain → `api.eunicedecampi.com`. Render gives you a CNAME target; add it at the DNS provider.
3. **Update env vars** — set `VITE_API_URL=https://api.eunicedecampi.com/api`. Push.
4. **Add CORS** — Render dashboard, edit `CORS_ALLOWED_ORIGINS` to include `https://eunicedecampi.com`.

### Available build commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR (use during editing) |
| `npm run build` | SPA build only (~30s) |
| `npm run build:static` | SPA + prerender all 31 routes (~3 min) — for production |
| `npm run build:gh-pages` | Same as `build:static` but with the `/eunice-v2/` base for GitHub Pages |
| `npm run prerender` | Just re-snapshot the existing `dist/` (skip rebuild) |
| `npm run a11y` | Accessibility audit (axe-core via Puppeteer) — outputs `scripts/a11y-report.json` |

Backend:

```bash
cd backend
.venv/Scripts/python.exe manage.py runserver    # Django on :8000
.venv/Scripts/python.exe manage.py migrate      # Apply DB schema changes
.venv/Scripts/python.exe manage.py createsuperuser  # New admin user
```

---

## Credentials & integrations

All keys live in **`backend/.env`** (gitignored). The example file is **`backend/.env.example`**.

| Service | Variable | Used for |
|---|---|---|
| Django secret | `SECRET_KEY` | Session signing, password hashing |
| **Neon Postgres** | `DATABASE_URL` | The database (leave blank to fall back to SQLite) |
| **DigitalOcean Spaces** | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_STORAGE_BUCKET_NAME`, `AWS_S3_ENDPOINT_URL` | Media uploads (set `USE_S3_MEDIA=True`) |
| **Mailerlite** | `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_IDS` (optional) | Newsletter sync — every signup is pushed automatically |
| **Unsplash** | `UNSPLASH_ACCESS_KEY` | Used by `scripts/fetch-unsplash.mjs` to curate cover images |
| Frontend | `VITE_API_URL` (optional) | Override the API base URL the React app talks to |

### ⚠️ Rotate credentials shared in chat

The keys for Neon, DigitalOcean Spaces, Mailerlite, and Unsplash were transmitted via chat during development. They should be rotated before public launch:

- **Neon** — dashboard → Settings → Reset password → paste new URL into `.env`
- **DigitalOcean Spaces** — Spaces → Settings → New token → update `.env`
- **Mailerlite** — Integrations → API → Revoke old token, create new with subscribers scope
- **Unsplash** — Apps → regenerate access key

---

## How content gets to where it shows

The frontend is **data-driven by the API**, with the local file `src/data/siteData.js` as an *offline fallback*:

1. The page loads → React mounts.
2. `SettingsProvider` fetches `/api/settings/` for brand / nav / hero / about / etc.
   - If the API answers, the live data overrides the fallback.
   - If the API doesn't answer, the `siteData.js` defaults are used (so the chrome still renders).
3. List pages (Practice, Journal, Shop, Programmes) use `useCollection(name)` which hits `/api/<name>/`.

When you edit something in the admin, the change persists to the DB → next page load picks it up. There is no separate "publish" step.

---

## Analytics

First-party, anonymous. No third-party tracking is loaded.

- Every public route change pings `/api/analytics/pageview/` with just `path` + `referrer` (no IPs, no cookies, no fingerprints).
- Admin dashboard at `/admin/analytics` shows: total / 7-day / 30-day counters, top-20 pages, daily views (30-day bar chart).
- The cookie banner asks visitors to accept this; decline doesn't break the site.

---

## Newsletter

Footer subscribe form → `/api/newsletter/` → saved locally **and** pushed to Mailerlite as best-effort:

- The local DB has every subscriber (backup list — exportable).
- Mailerlite is the day-to-day tool: Eunice writes campaigns in her dashboard, sends from `studio@eunicedecampi.com`.
- If Mailerlite is unreachable, the local signup still succeeds — no email loss.
- Double opt-in is configured in the Mailerlite dashboard (already enabled per setup).

**Domain authentication (one-time)**: for emails to land in inboxes as "from studio@eunicedecampi.com", you must verify the domain in Mailerlite (Subscribers → Domains → add `eunicedecampi.com`, then paste the 3 DNS records into your registrar). This is the only remaining infrastructure setup before public launch.

---

## File locations (where to find what)

```
src/
  App.jsx                       Routes + lazy loading
  main.jsx                      App entry
  index.html                    Static <head> + JSON-LD + preconnects (in repo root)
  components/
    Nav.jsx, Footer.jsx         Site chrome — driven by SiteSettings.navLinks/brand
    Layout.jsx                  Skip-link, nav, main, ticker, footer
    Seo.jsx                     react-helmet-async wrapper (per-page <head>)
    CookieConsent.jsx           GDPR banner
    AsyncBoundary.jsx           Loading / error fallbacks for routes
  pages/                        One file per route (Studio = homepage)
  data/siteData.js              The offline fallback content + the editorial copy source of truth
  lib/
    api.js                      apiRequest, login/logout, file upload
    settings.jsx                SettingsProvider (live + fallback merge)
    analytics.js                useAnalytics hook
    hooks.js                    useCollection
backend/
  api/
    models.py                   Practice, Programme, JournalPost, Product, SiteSettings, Enquiry, etc.
    serializers.py              DRF serializers (camelCase output)
    views.py                    DRF viewsets + custom endpoints
    integrations/mailerlite.py  Newsletter push
    urls.py                     /api/ routing
  config/settings.py            Django config (DB, CORS, media, etc.)
scripts/
  prerender.mjs                 Puppeteer-based static HTML snapshot
  fetch-unsplash.mjs            Cover-image curation
  apply-unsplash-manifest.mjs   Applies manifest URLs into siteData.js + seed_programmes.py
  build-sitemap.mjs             Regenerates public/sitemap.xml
  a11y-audit.mjs                Axe-core audit (npm run a11y)
  build-seed-fixture.mjs        Regenerates seed.json + site_settings.json from siteData.js
  unsplash-manifest.json        Record of which Unsplash photo lives where
PLAN.md                         Phase log (what's been built, what's left)
AUDIT.md                        Original gap audit vs the BITS brief
```

---

## Common tasks — quick reference

**Reset the database from siteData defaults:**
```bash
cd backend
.venv/Scripts/python.exe manage.py loaddata api/fixtures/seed.json
.venv/Scripts/python.exe manage.py loaddata api/fixtures/site_settings.json
.venv/Scripts/python.exe manage.py shell -c "exec(open('seed_programmes.py').read())"
```

**Regenerate the seed fixture from siteData.js (after editing it):**
```bash
node scripts/build-seed-fixture.mjs
```

**Re-curate cover images from Unsplash (edit queries in fetch-unsplash.mjs first):**
```bash
node scripts/fetch-unsplash.mjs           # writes scripts/unsplash-manifest.json
node scripts/apply-unsplash-manifest.mjs  # applies to siteData.js + seed_programmes.py
```

**Rebuild the sitemap (after adding new content):**
```bash
node scripts/build-sitemap.mjs
```

**Run the a11y audit (after structural HTML changes):**
```bash
npm run build:static && npm run a11y
```

---

## What's still pending (next steps)

In rough priority order:

1. **Mailerlite domain authentication** (`studio@eunicedecampi.com` → working sender) — DNS records into your registrar.
2. **Rotate the credentials** transmitted in chat (see table above).
3. **Cross-browser QA** — Safari iOS, Chrome Android, Firefox, Edge. Use `QA-checklist.md` (next step).
4. **Production hosting for the backend** — Render / Fly.io / DO App Platform — pointing at the same Neon DB.
5. **Phase 5 features** (optional / deferred): cart + checkout, booking calendar, member portal, podcast, on-site search.

---

*Last updated: 2026-05-25. Maintained alongside `PLAN.md`.*
