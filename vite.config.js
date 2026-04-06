import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    exclude: ['@mediapipe/tasks-vision'],
  },
  build: {
    sourcemap: false,
  },
  server: {
    host: '127.0.0.1',
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
