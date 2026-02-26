import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'decks/master-template',
  build: {
    outDir: '../../dist'
  }
})
