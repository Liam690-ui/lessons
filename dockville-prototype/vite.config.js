// vite.config.js
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // Your custom config here
  base: './',
  plugins: [tailwindcss()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist'
  }
})
