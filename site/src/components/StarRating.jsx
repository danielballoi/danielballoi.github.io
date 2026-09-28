import { useLanguage } from '../i18n/LanguageContext'
import './StarRating.css'

export default function StarRating({ level, max = 5 }) {
  const lang = useLanguage()
  const label = lang === 'en' ? `${level} out of ${max}` : `${level} su ${max}`

  return (
    <span className="star-rating" role="img" aria-label={label}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className="star-rating__star" data-filled={i < level} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  )
}
