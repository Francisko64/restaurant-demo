import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// GitHub Pages serves this project from a /restaurant-demo/ subpath; every
// other target (Vercel, `vite dev`, `vite preview`) serves it from the root.
// npm sets `npm_lifecycle_event` to the running script's name regardless of
// OS/shell, so this only needs the "predeploy" script (gh-pages's build step)
// to opt into the subpath — no reliance on a platform's own env vars.
const isGhPagesBuild = process.env.npm_lifecycle_event === 'predeploy';

export default defineConfig({
  plugins: [react()],
  base: isGhPagesBuild ? '/restaurant-demo/' : '/',
})
