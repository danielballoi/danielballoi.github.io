import { Head } from 'vite-react-ssg'
import { useLanguage } from '../i18n/LanguageContext'
import { getLocalizedPaths } from '../lib/language'

const SITE_URL = 'https://danielballoi.github.io'
const SITE_NAME = 'Daniel Balloi'

export default function SeoHead({ title, description, path }) {
  const lang = useLanguage()
  const paths = getLocalizedPaths(path)
  const canonical = `${SITE_URL}${path}`
  const ogImage = `${SITE_URL}/og/og-image-${lang}.jpg`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="it" href={`${SITE_URL}${paths.it}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${paths.en}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${paths.it}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'it_IT'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  )
}
