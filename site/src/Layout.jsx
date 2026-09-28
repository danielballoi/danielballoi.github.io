import { Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { LanguageContext } from './i18n/LanguageContext'
import Header from './components/Header'
import LanguagePrompt from './components/LanguagePrompt'

export default function Layout() {
  const location = useLocation()
  const lang = location.pathname.startsWith('/en') ? 'en' : 'it'

  return (
    <LanguageContext.Provider value={lang}>
      <Head>
        <html lang={lang} />
      </Head>
      <div className="app-shell">
        <Header />
        <LanguagePrompt />
        <Outlet />
      </div>
    </LanguageContext.Provider>
  )
}
