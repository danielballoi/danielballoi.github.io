import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import about from '../content/about.json'
import './CardGrid.css'
import './AboutSection.css'

export default function AboutSection() {
  const lang = useLanguage()
  const t = useStrings(lang)
  const highlights = pick(about.highlights, lang) ?? []

  return (
    <section id="chi-sono" className="card-section">
      <h2 className="section-title">{t.about.sectionTitle}</h2>
      <p className="about-section__intro">{pick(about.intro, lang)}</p>
      <p className="about-section__lead">{pick(about.highlightsLead, lang)}</p>
      <ul className="about-section__highlights">
        {highlights.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="about-section__closing">{pick(about.closing, lang)}</p>
    </section>
  )
}
