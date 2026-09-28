// Script una tantum (dev-only): genera l'anteprima JPEG della prima pagina
// di ogni PDF di certificazione con pdftoppm (pacchetto poppler-utils,
// da installare a parte) e la ridimensiona con sharp. Rilancialo se sostituisci
// uno dei PDF in public/certificazioni/.
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import sharp from 'sharp'
import certifications from '../src/content/certifications.json' with { type: 'json' }

const outDir = 'public/certificazioni'

for (const cert of certifications) {
  const pdfPath = `./public${cert.pdf}`
  const previewPath = `./public${cert.preview}`
  const tmp = mkdtempSync(join(tmpdir(), 'cert-preview-'))
  const prefix = join(tmp, 'page')

  try {
    execFileSync('pdftoppm', ['-jpeg', '-r', '120', '-f', '1', '-l', '1', pdfPath, prefix])
    const rendered = readFileSync(`${prefix}-1.jpg`)
    await sharp(rendered).resize({ width: 480 }).jpeg({ quality: 82 }).toFile(previewPath)
    console.log(`generated ${previewPath}`)
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
}

console.log(`done, output in ${outDir}`)
