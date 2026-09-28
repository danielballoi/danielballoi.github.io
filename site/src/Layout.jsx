import { Outlet, useLocation } from 'react-router-dom'
import { LanguageContext } from './i18n/LanguageContext'

export default function Layout() {
  const location = useLocation()
  const lang = location.pathname.startsWith('/en') ? 'en' : 'it'

  return (
    <LanguageContext.Provider value={lang}>
      <div lang={lang} className="app-shell">
        <Outlet />
      </div>
    </LanguageContext.Provider>
  )
}
