// Postbuild: genera dist/sitemap.xml a partire dalle stesse rotte prodotte
// dalla build (home, privacy, pagine progetto IT/EN), cosi' resta sempre
// sincronizzato quando si aggiunge un progetto, senza doverlo aggiornare a mano.
import { writeFileSync, readdirSync } from 'node:fs'

const SITE_URL = 'https://danielballoi.github.io'

const projectSlugs = readdirSync('src/content/progetti')
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))

const paths = [
  '/',
  '/privacy',
  ...projectSlugs.map((slug) => `/progetti/${slug}`),
  '/en/',
  '/en/privacy',
  ...projectSlugs.map((slug) => `/en/projects/${slug}`),
]

const urls = paths
  .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`)
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

writeFileSync('dist/sitemap.xml', xml)
console.log(`sitemap.xml written with ${paths.length} URLs`)
