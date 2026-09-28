import { Head } from 'vite-react-ssg'
import { useLanguage } from '../i18n/LanguageContext'

export default function Privacy() {
  const lang = useLanguage()
  return (
    <>
      <Head>
        <title>{lang === 'en' ? 'Privacy policy — Daniel Balloi' : 'Informativa privacy — Daniel Balloi'}</title>
      </Head>
      <main>
        <h1>{lang === 'en' ? 'Privacy policy' : 'Informativa privacy'}</h1>
      </main>
    </>
  )
}
