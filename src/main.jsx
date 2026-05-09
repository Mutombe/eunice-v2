import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { IconContext } from '@phosphor-icons/react'
import App from './App.jsx'
import './index.css'

// Atelier-grade icon contract — Phosphor Thin, sized to text, mono-aligned.
const iconContract = { weight: 'thin', size: '1em', mirrored: false }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <IconContext.Provider value={iconContract}>
        <App />
      </IconContext.Provider>
    </BrowserRouter>
  </StrictMode>,
)
