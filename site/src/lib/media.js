export const DEFAULT_MEDIA_BASE_URL = 'https://d1vd6l24zt7s8o.cloudfront.net'

/**
 * Costruisce l'indirizzo di un file media (video, copertine) servito da
 * CloudFront. L'origine si cambia con VITE_MEDIA_BASE_URL; i percorsi nei
 * contenuti restano relativi (es. "/video/balloi-ep1.mp4"). Gli URL gia'
 * assoluti vengono restituiti cosi' come sono.
 */
export function mediaUrl(path, baseUrl = import.meta.env.VITE_MEDIA_BASE_URL || DEFAULT_MEDIA_BASE_URL) {
  if (!path || /^https?:\/\//i.test(path)) return path
  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
}
