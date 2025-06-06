import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
const pkg = JSON.parse(
    fs.readFileSync(
        path.resolve(__dirname, 'node_modules/@dailymotion/ad-sdk-web/package.json'),
        'utf-8'
    )
)
export default defineConfig({
  base: '/ad-sdk-sample',
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
  define: {
    'import.meta.env.VITE_AD_SDK_WEB_PKG_VERSION': JSON.stringify(pkg.version),
  },
})