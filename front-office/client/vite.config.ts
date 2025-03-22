import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200,
    strictPort: true,
    host: true,
    origin: "http://localhost:4200",
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
