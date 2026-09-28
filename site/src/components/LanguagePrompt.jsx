import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import { detectBrowserLanguage, getAlternatePath, getStoredLanguage, setStoredLanguage } from '../lib/language'
import './LanguagePrompt.css'

const DISMISS_KEY = 'db-portfolio-lang-prompt-dismissed'

export default function LanguagePrompt() {
  const lang = useLanguage()
  const t = useStrings(lang)
  const location = useLocation()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getStoredLanguage()) return
    try {
      if (window.sessionStorage.getItem(DISMISS_KEY)) return
    } catch {
      // ok proseguire comunque: se sessionStorage non è disponibile, si propone la lingua ad ogni visita.
    }
    const browserLang = detectBrowserLanguage(navigator.language)
    if (browserLang !== lang) setVisible(true)
  }, [lang])

  if (!visible) return null

  function accept() {
    const browserLang = detectBrowserLanguage(navigator.language)
    setStoredLanguage(browserLang)
    setVisible(false)
    navigate(getAlternatePath(location.pathname))
  }

  function dismiss() {
    try {
      window.sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // nessun problema: al massimo il suggerimento ricompare alla prossima visita.
    }
    setVisible(false)
  }

  return (
    <div className="language-prompt" role="status">
      <p>{t.languagePrompt.message}</p>
      <div className="language-prompt__actions">
        <button type="button" onClick={accept}>
          {t.languagePrompt.accept}
        </button>
        <button type="button" onClick={dismiss} className="language-prompt__dismiss">
          {t.languagePrompt.dismiss}
        </button>
      </div>
    </div>
  )
}
