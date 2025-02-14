import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  proxy: {
    "/socket.io": {
      target: "http://localhost:4000",  // Zielserver für WebSockets
      ws: true,  // WebSocket-Verbindungen aktivieren
      changeOrigin: true  // Ändert den Origin für WebSocket-Anfragen
    }
  }
})
