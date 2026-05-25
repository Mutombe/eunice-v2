import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GH_PAGES=true at build time → site is served from the /eunice-v2/ subpath.
  // Without it (local preview / production root domain), it serves from /.
  base: process.env.GH_PAGES === 'true' ? '/eunice-v2/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    // Don't watch the Django backend — its virtualenv has thousands of files
    // and trips the Windows file watcher. Regex handles both path separators.
    watch: { ignored: /[\\/]backend[\\/]/ },
  },
  build: {
    // Vendor chunks cache independently of app code — a content edit doesn't
    // invalidate the (large, stable) react/framer/icons bundles. Combined
    // with React.lazy() route splitting (App.jsx), the initial paint loads
    // only what the homepage actually needs.
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
          'icons': ['@phosphor-icons/react'],
          'helmet': ['react-helmet-async'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
