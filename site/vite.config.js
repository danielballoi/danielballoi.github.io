import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  ssgOptions: {
    script: 'async',
    formatting: 'none',
    dirStyle: 'nested',
    onFinished: async (dir) => {
      const fs = await import('node:fs/promises')
      const path = await import('node:path')
      const notFoundNested = path.join(dir, '404', 'index.html')
      const notFoundRoot = path.join(dir, '404.html')
      try {
        await fs.copyFile(notFoundNested, notFoundRoot)
      } catch {
        // ignore if the 404 route was not generated
      }
    },
  },
  test: {
    environment: 'node',
  },
})
