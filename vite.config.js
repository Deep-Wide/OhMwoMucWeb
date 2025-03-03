import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  server: {
    proxy: {
      'api': {
        target: 'http://localhost:18000',
        changeOrigin: true
      }
    }
  }
})
