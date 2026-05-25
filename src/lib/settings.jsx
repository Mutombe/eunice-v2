import { createContext, useContext, useState, useEffect } from 'react'
import { apiRequest } from './api.js'
import {
  brand as defaultBrand,
  navLinks as defaultNav,
  hero as defaultHero,
  studio as defaultStudio,
  membership as defaultMembership,
  contact as defaultContact,
  about as defaultAbout,
  speaking as defaultSpeaking,
  retreats as defaultRetreats,
  legal as defaultLegal,
} from '../data/siteData.js'

/* Site-wide settings (brand, nav, hero, notice bar, etc.) from /api/settings/.
   `siteData.js` provides the defaults — so the chrome renders instantly and
   stays working even if the API is unreachable, then upgrades once it loads. */

export const DEFAULT_NOTIFICATION = {
  enabled: false,
  message: 'The Quiet Report · Q1 has arrived. By application only.',
  linkLabel: 'Open the report',
  linkTo: '/shop/quiet-report-q1',
}

const FALLBACK = {
  brand: defaultBrand,
  navLinks: defaultNav,
  hero: defaultHero,
  studio: defaultStudio,
  membership: defaultMembership,
  contact: defaultContact,
  notification: DEFAULT_NOTIFICATION,
  about: defaultAbout,
  speaking: defaultSpeaking,
  retreats: defaultRetreats,
  legal: defaultLegal,
}

const SettingsContext = createContext(FALLBACK)

function pick(value, fallback) {
  if (Array.isArray(value)) return value.length ? value : fallback
  if (value && typeof value === 'object') return Object.keys(value).length ? value : fallback
  return value ?? fallback
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(FALLBACK)

  useEffect(() => {
    let alive = true
    apiRequest('/settings/')
      .then((data) => {
        if (!alive || !data) return
        setSettings({
          brand: pick(data.brand, defaultBrand),
          navLinks: pick(data.navLinks, defaultNav),
          hero: pick(data.hero, defaultHero),
          studio: pick(data.studio, defaultStudio),
          membership: pick(data.membership, defaultMembership),
          contact: pick(data.contact, defaultContact),
          notification: pick(data.notification, DEFAULT_NOTIFICATION),
          about: pick(data.about, defaultAbout),
          speaking: pick(data.speaking, defaultSpeaking),
          retreats: pick(data.retreats, defaultRetreats),
          legal: pick(data.legal, defaultLegal),
        })
      })
      .catch(() => { /* unreachable — keep the fallback */ })
    return () => { alive = false }
  }, [])

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  return useContext(SettingsContext)
}
