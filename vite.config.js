import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project from a /restaurant-demo/ subpath;
  // Vercel serves it from the domain root, so skip the base override there.
  base: process.env.VERCEL ? '/' : '/restaurant-demo/',
})
