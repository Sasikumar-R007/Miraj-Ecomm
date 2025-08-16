
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: [
      '6f34dfda-472b-4d3e-a87a-a29599002383-00-3e6wdecj8i23u.pike.replit.dev',
      'localhost',
      '.replit.dev'
    ]
  }
})
