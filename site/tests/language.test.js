import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  detectBrowserLanguage,
  getAlternatePath,
  getLanguageFromPath,
  getStoredLanguage,
  setStoredLanguage,
} from '../src/lib/language'

describe('detectBrowserLanguage', () => {
  it('recognises English variants', () => {
    expect(detectBrowserLanguage('en-US')).toBe('en')
    expect(detectBrowserLanguage('en')).toBe('en')
  })

  it('defaults to Italian for anything else, including missing value', () => {
    expect(detectBrowserLanguage('it-IT')).toBe('it')
    expect(detectBrowserLanguage('fr-FR')).toBe('it')
    expect(detectBrowserLanguage(undefined)).toBe('it')
  })
})

describe('getLanguageFromPath', () => {
  it('detects the English prefix', () => {
    expect(getLanguageFromPath('/en/')).toBe('en')
    expect(getLanguageFromPath('/en/projects/balloi-immobiliare')).toBe('en')
  })

  it('defaults to Italian for every other path', () => {
    expect(getLanguageFromPath('/')).toBe('it')
    expect(getLanguageFromPath('/progetti/balloi-immobiliare')).toBe('it')
  })
})

describe('getAlternatePath', () => {
  it('maps the home page both ways', () => {
    expect(getAlternatePath('/')).toBe('/en/')
    expect(getAlternatePath('/en/')).toBe('/')
  })

  it('maps the privacy page both ways', () => {
    expect(getAlternatePath('/privacy')).toBe('/en/privacy')
    expect(getAlternatePath('/en/privacy')).toBe('/privacy')
  })

  it('maps project detail pages both ways, translating the segment', () => {
    expect(getAlternatePath('/progetti/balloi-immobiliare')).toBe('/en/projects/balloi-immobiliare')
    expect(getAlternatePath('/en/projects/balloi-immobiliare')).toBe('/progetti/balloi-immobiliare')
  })

  it('tolerates a trailing slash', () => {
    expect(getAlternatePath('/progetti/balloi-immobiliare/')).toBe('/en/projects/balloi-immobiliare')
  })
})

describe('language preference persistence', () => {
  const store = {}

  beforeEach(() => {
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key) => (key in store ? store[key] : null),
        setItem: (key, value) => {
          store[key] = value
        },
      },
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    Object.keys(store).forEach((key) => delete store[key])
  })

  it('round-trips a stored preference', () => {
    expect(getStoredLanguage()).toBeNull()
    setStoredLanguage('en')
    expect(getStoredLanguage()).toBe('en')
  })

  it('never throws when localStorage is unavailable', () => {
    vi.stubGlobal('window', {
      localStorage: {
        getItem: () => {
          throw new Error('blocked')
        },
        setItem: () => {
          throw new Error('blocked')
        },
      },
    })
    expect(() => setStoredLanguage('it')).not.toThrow()
    expect(getStoredLanguage()).toBeNull()
  })
})
