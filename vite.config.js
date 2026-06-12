import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    // Tăng ngưỡng cảnh báo lên 1MB vì Firebase SDK khá nặng
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // PERF: Chia nhỏ bundle — Vite 8 (Rolldown) yêu cầu function syntax
        // Trình duyệt chỉ tải lại đúng phần thay đổi, cache phần còn lại.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase'))    return 'vendor-firebase';
            if (id.includes('react-router')) return 'vendor-react';
            if (id.includes('react-dom'))   return 'vendor-react';
            if (id.includes('react-helmet')) return 'vendor-helmet';
            if (id.includes('i18next') || id.includes('react-i18next')) return 'vendor-i18n';
            if (id.includes('react'))       return 'vendor-react';
          }
        },
      },
    },
  },

  server: {
    allowedHosts: true, // Cho phép tất cả host (bao gồm localtunnel)
  },
})