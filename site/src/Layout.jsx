import { Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { LanguageContext } from './i18n/LanguageContext'
import Header from './components/Header'
import LanguagePrompt from './components/LanguagePrompt'
import ScrollToHash from './components/ScrollToHash'

export default function Layout() {
  const location = useLocation()
  const lang = location.pathname.startsWith('/en') ? 'en' : 'it'

  return (
    <LanguageContext.Provider value={lang}>
      <Head>
        <meta charSet="UTF-8" />
        <html lang={lang} />
      </Head>
      <div className="app-shell">
        <ScrollToHash />
        <Header />
        <LanguagePrompt />
        <Outlet />
      </div>
    </LanguageContext.Provider>
  )
}
