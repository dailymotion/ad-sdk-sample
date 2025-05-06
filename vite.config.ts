import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    port: 9097,
    host: 'adsdkweb.local.dailymotion.com',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.pem')),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'AdSdk',
      fileName: 'ad-sdk',
      formats: ['iife'], // Use IIFE format for browser compatibility
    },
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.ts'),
    },
  },
})
