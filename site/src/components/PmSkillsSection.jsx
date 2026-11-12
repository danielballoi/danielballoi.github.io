import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import pmSkills from '../content/pmSkills.json'
import './CardGrid.css'

export default function PmSkillsSection() {
  const lang = useLanguage()
  const t = useStrings(lang)

  return (
    <section id="competenze" className="card-section">
      <h2 className="section-title card-section__title">{t.pmSkills.sectionTitle}</h2>
      <ul className="card-grid">
        {pmSkills.map((skill) => (
          <li key={skill.id} className="card-grid__card">
            <h3>{pick(skill.title, lang)}</h3>
            <p>{pick(skill.description, lang)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
