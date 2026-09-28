import { Head } from 'vite-react-ssg'
import { useLanguage } from '../i18n/LanguageContext'

export default function NotFound() {
  const lang = useLanguage()
  return (
    <>
      <Head>
        <title>{lang === 'en' ? 'Page not found — Daniel Balloi' : 'Pagina non trovata — Daniel Balloi'}</title>
      </Head>
      <main>
        <h1>404</h1>
        <p>{lang === 'en' ? 'Page not found.' : 'Pagina non trovata.'}</p>
      </main>
    </>
  )
}
