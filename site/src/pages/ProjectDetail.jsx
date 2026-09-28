import { useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { useLanguage, pick } from '../i18n/LanguageContext'
import { getProjectBySlug } from '../lib/projects'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const lang = useLanguage()
  const project = getProjectBySlug(slug)

  if (!project) return <NotFound />

  const title = pick(project.title, lang)

  return (
    <>
      <Head>
        <title>{title} — Daniel Balloi</title>
      </Head>
      <main>
        <h1>{title}</h1>
        <p>{pick(project.summary, lang)}</p>
      </main>
    </>
  )
}
