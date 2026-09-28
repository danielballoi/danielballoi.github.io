import { Head } from 'vite-react-ssg'
import { useLanguage } from '../i18n/LanguageContext'
import Hero from '../components/Hero'
import ProjectsSection from '../components/ProjectsSection'
import Timeline from '../components/Timeline'
import CertificationsSection from '../components/CertificationsSection'
import SkillsSection from '../components/SkillsSection'

export default function Home() {
  const lang = useLanguage()
  const title = 'Daniel Balloi — DevOps & Release Engineer'
  const description =
    lang === 'en'
      ? 'DevOps & Release Engineer, AWS Certified Solutions Architect. 3.5 years of production releases for enterprise clients.'
      : 'DevOps & Release Engineer, AWS Certified Solutions Architect. 3 anni e mezzo di rilasci in produzione per clienti Enterprise.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <main>
        <Hero />
        <ProjectsSection />
        <Timeline />
        <CertificationsSection />
        <SkillsSection />
      </main>
    </>
  )
}
