import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { IconContext } from '@phosphor-icons/react'
import App from './App.jsx'
import { SettingsProvider } from './lib/settings.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { ConfirmProvider } from './components/ConfirmDialog.jsx'
import './index.css'

// Atelier-grade icon contract — Phosphor Thin, sized to text, mono-aligned.
const iconContract = { weight: 'thin', size: '1em', mirrored: false }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <SettingsProvider>
        {/* basename lifts the /eunice-v2/ subpath off the URL react-router sees,
            so routes match identically in dev (BASE_URL=/) and on GH Pages
            (BASE_URL=/eunice-v2/). Without this, every route on the deployed
            site fell through to the 404. */}
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <IconContext.Provider value={iconContract}>
            <ToastProvider>
              <ConfirmProvider>
                <App />
              </ConfirmProvider>
            </ToastProvider>
          </IconContext.Provider>
        </BrowserRouter>
      </SettingsProvider>
    </HelmetProvider>
  </StrictMode>,
)
