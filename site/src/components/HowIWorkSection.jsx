import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import howIWork from '../content/howIWork.json'
import './HowIWorkSection.css'

export default function HowIWorkSection() {
  const lang = useLanguage()
  const t = useStrings(lang)

  return (
    <section id="come-lavoro" className="how-i-work">
      <h2 className="section-title">{t.howIWork.sectionTitle}</h2>
      <p className="how-i-work__eyebrow">{t.howIWork.eyebrow}</p>
      <ul className="how-i-work__grid">
        {howIWork.map((item) => (
          <li key={item.id} className="how-i-work__card">
            <h3>{pick(item.title, lang)}</h3>
            <p>{pick(item.description, lang)}</p>
            <p className="how-i-work__example">{pick(item.example, lang)}</p>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noreferrer">
                {t.howIWork.linkLabel} →
              </a>
            ) : (
              <span className="how-i-work__link-missing">{t.howIWork.linkMissing}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
