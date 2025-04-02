import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    strictPort: true,
    host: true,
    origin: "http://localhost:5000",
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
