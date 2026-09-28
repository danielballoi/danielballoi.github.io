import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import { getLocalizedPaths, setStoredLanguage } from '../lib/language'
import './LanguageSwitch.css'

export default function LanguageSwitch() {
  const lang = useLanguage()
  const t = useStrings(lang)
  const location = useLocation()
  const paths = getLocalizedPaths(location.pathname)

  return (
    <div className="language-switch" role="group" aria-label={t.languageSwitch.label}>
      <Link
        to={paths.it}
        aria-current={lang === 'it' ? 'page' : undefined}
        className={`language-switch__link ${lang === 'it' ? 'is-current' : ''}`}
        onClick={() => setStoredLanguage('it')}
      >
        IT
      </Link>
      <Link
        to={paths.en}
        aria-current={lang === 'en' ? 'page' : undefined}
        className={`language-switch__link ${lang === 'en' ? 'is-current' : ''}`}
        onClick={() => setStoredLanguage('en')}
      >
        EN
      </Link>
    </div>
  )
}
