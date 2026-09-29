import { getIcon } from '../lib/icons'

const CUSTOM_PATHS = {
  download: 'M12 3v10m0 0l-4-4m4 4l4-4M5 19h14',
  mail: 'M4 6h16v12H4z M4 7l8 6 8-6',
  copy: 'M9 9h10v10H9z M6 15H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1',
}

const FILLED_PATHS = {
  play: 'M7 4l13 8-13 8z',
}

/**
 * Icona monocromatica che segue il colore del testo (currentColor), pensata
 * per stare dentro un pulsante: niente colore di marchio al passaggio del
 * mouse, cambia insieme al resto del pulsante.
 */
export default function Icon({ name, className }) {
  const brand = getIcon(name)

  if (brand) {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path d={brand.path} fill="currentColor" />
      </svg>
    )
  }

  const filled = FILLED_PATHS[name]
  if (filled) {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path d={filled} fill="currentColor" />
      </svg>
    )
  }

  const d = CUSTOM_PATHS[name]
  if (!d) return null

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  )
}
