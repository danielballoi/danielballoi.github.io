import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import './NotFound.css'

export default function NotFound() {
  const lang = useLanguage()
  const homePath = lang === 'en' ? '/en/' : '/'

  return (
    <>
      <Head>
        <title>{lang === 'en' ? 'Page not found — Daniel Balloi' : 'Pagina non trovata — Daniel Balloi'}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="not-found">
        <p className="not-found__code">// 404</p>
        <h1>{lang === 'en' ? 'Page not found' : 'Pagina non trovata'}</h1>
        <p>
          {lang === 'en'
            ? 'The page you are looking for does not exist or has moved.'
            : 'La pagina che cerchi non esiste o è stata spostata.'}
        </p>
        <Link to={homePath} className="not-found__link">
          {lang === 'en' ? '← Back to home' : '← Torna alla home'}
        </Link>
      </main>
    </>
  )
}
