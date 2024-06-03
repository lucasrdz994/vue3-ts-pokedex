import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    minify: 'esbuild',
    cssMinify: 'esbuild'
  },

  esbuild: {
    drop: mode === 'production' ? ['console'] : []
  },

  test: {
    environment: 'jsdom'
  }
}))
