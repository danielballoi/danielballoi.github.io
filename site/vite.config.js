import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  ssgOptions: {
    script: 'async',
    formatting: 'none',
    dirStyle: 'nested',
    onPageRendered: (_route, renderedHTML) => {
      // react-helmet raggruppa i tag per tipo (title, poi meta, poi link),
      // cosi' <meta charset> finisce dopo <title>. Lo spostiamo subito dopo
      // <head> perche' la dichiarazione della codifica deve venire prima di
      // qualunque contenuto non-ASCII (es. gli accenti nei testi IT).
      const match = renderedHTML.match(/<meta[^>]*charset="UTF-8"[^>]*>/i)
      if (!match) return renderedHTML
      const withoutCharset = renderedHTML.replace(match[0], '')
      return withoutCharset.replace('<head>', `<head>${match[0]}`)
    },
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
