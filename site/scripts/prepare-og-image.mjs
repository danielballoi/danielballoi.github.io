// Script una tantum (dev-only): genera l'immagine di condivisione social
// (Open Graph, 1200x630) in stile blueprint, una per lingua, come file
// statico in public/og/. Rilancialo se cambi i testi dell'intestazione.
import sharp from 'sharp'

const WIDTH = 1200
const HEIGHT = 630
const GRID = 24

const COPY = {
  it: {
    name: 'Daniel Balloi',
    title: 'DevOps &amp; Release Engineer · AWS Certified Solutions Architect',
    tagline: '3 anni e mezzo di rilasci in produzione per clienti Enterprise',
  },
  en: {
    name: 'Daniel Balloi',
    title: 'DevOps &amp; Release Engineer · AWS Certified Solutions Architect',
    tagline: '3.5 years of production releases for enterprise clients',
  },
}

function buildGridLines() {
  let lines = ''
  for (let x = 0; x <= WIDTH; x += GRID) {
    lines += `<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}" stroke="#dce5f2" stroke-width="1"/>`
  }
  for (let y = 0; y <= HEIGHT; y += GRID) {
    lines += `<line x1="0" y1="${y}" x2="${WIDTH}" y2="${y}" stroke="#dce5f2" stroke-width="1"/>`
  }
  return lines
}

function buildSvg(lang) {
  const copy = COPY[lang]
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#f4f7fb"/>
    ${buildGridLines()}
    <rect x="48" y="48" width="${WIDTH - 96}" height="${HEIGHT - 96}" fill="none" stroke="#1e3a8a" stroke-width="2"/>
    <line x1="48" y1="70" x2="110" y2="70" stroke="#1e3a8a" stroke-width="2"/>
    <line x1="70" y1="48" x2="70" y2="110" stroke="#1e3a8a" stroke-width="2"/>
    <text x="90" y="260" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="#16213a">${copy.name}</text>
    <text x="90" y="320" font-family="Arial, sans-serif" font-size="30" font-weight="600" fill="#1e3a8a">${copy.title}</text>
    <text x="90" y="380" font-family="Arial, sans-serif" font-size="24" fill="#5a6a86">${copy.tagline}</text>
    <text x="90" y="560" font-family="Courier New, monospace" font-size="22" fill="#5a6a86">// danielballoi.github.io</text>
    <rect x="90" y="460" width="14" height="14" fill="#e0582f"/>
    <text x="116" y="472" font-family="Courier New, monospace" font-size="20" fill="#16213a">AWS Certified Solutions Architect</text>
  </svg>`
}

for (const lang of ['it', 'en']) {
  const svg = buildSvg(lang)
  const outPath = `public/og/og-image-${lang}.jpg`
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(outPath)
  console.log(`generated ${outPath}`)
}
