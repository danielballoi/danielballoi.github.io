import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import LanguageSwitch from './LanguageSwitch'
import './Header.css'

const SECTIONS = ['progetti', 'esperienza', 'certificazioni', 'competenze', 'come-lavoro', 'contatti']

export default function Header() {
  const lang = useLanguage()
  const t = useStrings(lang)
  const [open, setOpen] = useState(false)
  const prefix = lang === 'en' ? '/en' : ''
  const navKeyBySection = {
    progetti: 'progetti',
    esperienza: 'esperienza',
    certificazioni: 'certificazioni',
    competenze: 'competenze',
    'come-lavoro': 'comeLavoro',
    contatti: 'contatti',
  }

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <Link to={`${prefix}/`} className="site-header__brand" onClick={() => setOpen(false)}>
          Daniel Balloi
        </Link>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="site-header__toggle-icon" data-open={open} />
          <span className="visually-hidden">{open ? t.nav.menuChiudi : t.nav.menuApri}</span>
        </button>

        <nav id="site-nav" className="site-header__nav" data-open={open}>
          <ul>
            {SECTIONS.map((section) => (
              <li key={section}>
                <Link to={`${prefix}/#${section}`} onClick={() => setOpen(false)}>
                  {t.nav[navKeyBySection[section]]}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  )
}
