export const STORAGE_KEY = 'db-portfolio-lang'

export function getStoredLanguage() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'it' || value === 'en' ? value : null
  } catch {
    return null
  }
}

export function setStoredLanguage(lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // localStorage non disponibile (privacy mode, quota, ecc.): nessun problema, si continua senza ricordare la scelta.
  }
}

export function detectBrowserLanguage(navigatorLanguage) {
  if (!navigatorLanguage) return 'it'
  return navigatorLanguage.toLowerCase().startsWith('en') ? 'en' : 'it'
}

export function getLanguageFromPath(pathname) {
  return pathname.startsWith('/en') ? 'en' : 'it'
}

/**
 * Calcola l'indirizzo equivalente nell'altra lingua per le rotte del sito:
 * /                         <-> /en/
 * /privacy                  <-> /en/privacy
 * /progetti/<slug>          <-> /en/projects/<slug>
 */
export function getAlternatePath(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'

  if (clean.startsWith('/en')) {
    const rest = clean.slice(3) || '/'
    if (rest === '/' ) return '/'
    if (rest === '/privacy') return '/privacy'
    const projectMatch = rest.match(/^\/projects\/(.+)$/)
    if (projectMatch) return `/progetti/${projectMatch[1]}`
    return '/'
  }

  if (clean === '/') return '/en/'
  if (clean === '/privacy') return '/en/privacy'
  const projectMatch = clean.match(/^\/progetti\/(.+)$/)
  if (projectMatch) return `/en/projects/${projectMatch[1]}`
  return '/en/'
}
