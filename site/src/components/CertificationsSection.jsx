import { useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import certifications from '../content/certifications.json'
import CertificationCard from './CertificationCard'
import './CertificationsSection.css'

export default function CertificationsSection() {
  const lang = useLanguage()
  const t = useStrings(lang)

  return (
    <section id="certificazioni" className="certifications-section">
      <h2 className="section-title">{t.certifications.sectionTitle}</h2>
      <p className="certifications-section__eyebrow">{t.certifications.eyebrow}</p>
      <ul className="certifications-section__grid">
        {certifications.map((certification) => (
          <CertificationCard key={certification.id} certification={certification} />
        ))}
      </ul>
    </section>
  )
}
