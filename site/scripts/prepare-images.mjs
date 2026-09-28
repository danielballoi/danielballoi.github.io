// Script una tantum (dev-only): genera le varianti WebP/AVIF con fallback JPG
// della foto dell'intestazione, così a runtime non serve alcuna dipendenza
// di elaborazione immagini. Rilancialo se sostituisci public/img/foto.jpg.
import sharp from 'sharp'

const source = 'public/img/foto.jpg'
const outDir = 'public/img'
const widths = [240, 480]

for (const width of widths) {
  const base = `${outDir}/foto-${width}`
  await sharp(source).resize({ width }).toFormat('avif', { quality: 60 }).toFile(`${base}.avif`)
  await sharp(source).resize({ width }).toFormat('webp', { quality: 82 }).toFile(`${base}.webp`)
  await sharp(source).resize({ width }).toFormat('jpeg', { quality: 85, mozjpeg: true }).toFile(`${base}.jpg`)
  console.log(`generated ${base}.{avif,webp,jpg}`)
}
