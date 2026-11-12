import { useLanguage } from '../i18n/LanguageContext'
import SeoHead from '../components/SeoHead'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import Timeline from '../components/Timeline'
import PmSkillsSection from '../components/PmSkillsSection'
import PmDocumentsSection from '../components/PmDocumentsSection'
import ProjectsSection from '../components/ProjectsSection'
import CertificationsSection from '../components/CertificationsSection'
import SkillsSection from '../components/SkillsSection'
import ReferencesSection from '../components/ReferencesSection'
import ContactSection from '../components/ContactSection'

export default function Home() {
  const lang = useLanguage()
  const title = 'Daniel Balloi — IT Project & Release Manager'
  const description =
    lang === 'en'
      ? 'IT Project & Release Manager with over 3 years of releases in banking and payments projects. CAPM (PMI) and AWS Certified Solutions Architect – Associate.'
      : 'IT Project & Release Manager con oltre 3 anni di rilasci in progetti bancari e di pagamento. Certificato CAPM (PMI) e AWS Solutions Architect – Associate.'
  const path = lang === 'en' ? '/en/' : '/'

  return (
    <>
      <SeoHead title={title} description={description} path={path} />
      <main>
        <Hero />
        <AboutSection />
        <Timeline />
        <PmSkillsSection />
        <PmDocumentsSection />
        <ProjectsSection />
        <CertificationsSection />
        <SkillsSection />
        <ReferencesSection />
        <ContactSection />
      </main>
    </>
  )
}
