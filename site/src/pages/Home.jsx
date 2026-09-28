import { Head } from 'vite-react-ssg'
import { useLanguage } from '../i18n/LanguageContext'

export default function Home() {
  const lang = useLanguage()
  const title = lang === 'en'
    ? 'Daniel Balloi — DevOps & Release Engineer'
    : 'Daniel Balloi — DevOps & Release Engineer'

  return (
    <>
      <Head>
        <title>{title}</title>
        <html lang={lang} />
      </Head>
      <main>
        <h1>Daniel Balloi</h1>
      </main>
    </>
  )
}
