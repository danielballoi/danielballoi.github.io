import { useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import profile from '../content/profile.json'
import ContactForm from './ContactForm'
import CopyButton from './CopyButton'
import './ContactSection.css'

export default function ContactSection() {
  const lang = useLanguage()
  const t = useStrings(lang)
  const apiUrl = import.meta.env.VITE_CONTACT_API_URL

  return (
    <section id="contatti" className="contact-section">
      <h2 className="section-title">{t.contact.sectionTitle}</h2>
      <p className="contact-section__eyebrow">{t.contact.eyebrow}</p>
      <p className="contact-section__intro">{t.contact.intro}</p>

      {apiUrl ? (
        <ContactForm apiUrl={apiUrl} />
      ) : (
        <div className="contact-section__fallback">
          <p>{t.contact.noApiEmailLead}</p>
          <div className="contact-section__fallback-actions">
            <a className="contact-section__cta" href={`mailto:${profile.links.email}`}>
              {t.contact.writeEmail}
            </a>
            <CopyButton
              className="contact-section__cta contact-section__cta--ghost"
              value={profile.links.email}
              label={t.contact.copyEmail}
              copiedLabel={t.contact.copied}
            />
          </div>
        </div>
      )}

      <div className="contact-section__links">
        <a href={profile.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  )
}
