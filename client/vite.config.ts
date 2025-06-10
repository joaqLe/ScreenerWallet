import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Make all environment variables starting with "VITE_" available to the
  // client-side code.
  envPrefix: 'VITE_',
})
