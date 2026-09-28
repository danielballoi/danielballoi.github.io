import { useEffect, useState } from 'react'

function isValidCatalog(data) {
  return (
    data != null &&
    typeof data === 'object' &&
    Array.isArray(data.projects) &&
    Array.isArray(data.certifications)
  )
}

export async function fetchRemoteCatalog(url, { timeoutMs = 5000 } = {}) {
  if (!url) return null
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timer)
    if (!response.ok) return null
    const data = await response.json()
    return isValidCatalog(data) ? data : null
  } catch {
    return null
  }
}

/**
 * Fornisce il catalogo di episodi/certificazioni: parte dai dati locali
 * (sempre presenti, anche pre-renderizzati) e, se VITE_CATALOG_URL e'
 * definita, prova ad aggiornarli con il catalogo remoto. In caso di
 * assenza della variabile o di errore di rete, resta sui dati locali:
 * il sito non si rompe mai se AWS non risponde.
 */
export function useCatalog(localCatalog) {
  const [catalog, setCatalog] = useState(localCatalog)
  const [source, setSource] = useState('local')

  useEffect(() => {
    const url = import.meta.env.VITE_CATALOG_URL
    if (!url) return

    let cancelled = false
    fetchRemoteCatalog(url).then((remote) => {
      if (!cancelled && remote) {
        setCatalog(remote)
        setSource('remote')
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return { catalog, source }
}
