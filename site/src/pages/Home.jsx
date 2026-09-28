import { useLanguage } from '../i18n/LanguageContext'
import SeoHead from '../components/SeoHead'
import Hero from '../components/Hero'
import ProjectsSection from '../components/ProjectsSection'
import Timeline from '../components/Timeline'
import CertificationsSection from '../components/CertificationsSection'
import SkillsSection from '../components/SkillsSection'
import HowIWorkSection from '../components/HowIWorkSection'
import BeyondWork from '../components/BeyondWork'
import ContactSection from '../components/ContactSection'

export default function Home() {
  const lang = useLanguage()
  const title = 'Daniel Balloi — DevOps & Release Engineer'
  const description =
    lang === 'en'
      ? 'DevOps & Release Engineer, AWS Certified Solutions Architect. 3.5 years of production releases for enterprise clients.'
      : 'DevOps & Release Engineer, AWS Certified Solutions Architect. 3 anni e mezzo di rilasci in produzione per clienti Enterprise.'
  const path = lang === 'en' ? '/en/' : '/'

  return (
    <>
      <SeoHead title={title} description={description} path={path} />
      <main>
        <Hero />
        <ProjectsSection />
        <Timeline />
        <CertificationsSection />
        <SkillsSection />
        <HowIWorkSection />
        <BeyondWork />
        <ContactSection />
      </main>
    </>
  )
}
