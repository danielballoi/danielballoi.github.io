import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { LanguageContext } from '../src/i18n/LanguageContext'
import Hero from '../src/components/Hero'
import profile from '../src/content/profile.json'

function renderHero(lang) {
  const html = renderToStaticMarkup(
    <LanguageContext.Provider value={lang}>
      <Hero />
    </LanguageContext.Provider>,
  )
  return { html, downloads: downloadLinks(html) }
}

// Link con attributo download nell'HTML renderizzato (i test girano in node,
// senza DOM): href, nome del file e testo visibile.
function downloadLinks(html) {
  return [...html.matchAll(/<a\b([^>]*\bdownload\b[^>]*)>([\s\S]*?)<\/a>/g)].map(([, attrs, inner]) => ({
    href: attrs.match(/href="([^"]*)"/)?.[1],
    download: attrs.match(/download="([^"]*)"/)?.[1],
    text: inner.replace(/<[^>]+>/g, '').trim(),
  }))
}

describe('pulsante CV nell’Hero', () => {
  it('in italiano scarica il PDF italiano con il testo "Scarica CV"', () => {
    const { downloads } = renderHero('it')
    expect(downloads).toEqual([
      { href: '/cv/cv-daniel-balloi-pm-it.pdf', download: 'CV-Daniel-Balloi-IT.pdf', text: 'Scarica CV' },
    ])
  })

  it('in inglese scarica il PDF inglese con il testo "Download CV"', () => {
    const { downloads } = renderHero('en')
    expect(downloads).toEqual([
      { href: '/cv/cv-daniel-balloi-pm-en.pdf', download: 'CV-Daniel-Balloi-EN.pdf', text: 'Download CV' },
    ])
  })

  it('il pulsante "Scarica CV Tecnico" non esiste più', () => {
    for (const lang of ['it', 'en']) {
      const { html } = renderHero(lang)
      expect(html).not.toMatch(/CV Tecnico|Technical/)
    }
  })

  it('LinkedIn ed email restano nell’Hero', () => {
    const { html } = renderHero('it')
    expect(html).toContain(`href="${profile.links.linkedin}"`)
    expect(html).toContain(`href="mailto:${profile.links.email}"`)
  })

  it('i PDF del CV esistono in public/', () => {
    for (const href of Object.values(profile.cv.href)) {
      expect(existsSync(new URL(`../public${href}`, import.meta.url)), href).toBe(true)
    }
  })
})
