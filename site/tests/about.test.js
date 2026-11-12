import { describe, expect, it } from 'vitest'
import about from '../src/content/about.json'

describe('chi sono', () => {
  it('ogni testo esiste in italiano e in inglese', () => {
    for (const key of ['intro', 'highlightsLead', 'closing']) {
      expect(about[key].it, `${key}.it`).toBeTruthy()
      expect(about[key].en, `${key}.en`).toBeTruthy()
    }
  })

  it('la lista ha gli stessi punti nelle due lingue', () => {
    expect(about.highlights.it).toHaveLength(5)
    expect(about.highlights.en).toHaveLength(about.highlights.it.length)
    expect(about.highlights.en.every(Boolean)).toBe(true)
  })

  it('la chiusura mantiene "hands-on" tra virgolette in entrambe le lingue', () => {
    expect(about.closing.it).toContain('"hands-on"')
    expect(about.closing.en).toContain('"hands-on"')
  })
})
