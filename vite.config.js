import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Thêm dòng này

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Thêm dòng này
  ],
  server: {
    allowedHosts: true, // Cho phép tất cả các host (bao gồm localtunnel) truy cập
  }
})