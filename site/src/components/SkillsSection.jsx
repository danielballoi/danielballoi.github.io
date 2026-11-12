import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import skills from '../content/skills.json'
import SkillItem from './SkillItem'
import './SkillsSection.css'

export default function SkillsSection() {
  const lang = useLanguage()
  const t = useStrings(lang)

  return (
    <section id="competenze-tecniche" className="skills-section">
      <h2 className="section-title">{t.techSkills.sectionTitle}</h2>
      <p className="skills-section__intro">{t.techSkills.intro}</p>

      {skills.groups.map((group) => (
        <div key={group.id} className="skills-section__group">
          <h3>{pick(group.name, lang)}</h3>
          <ul className="skills-section__list">
            {group.skills.map((skill) => (
              <SkillItem key={skill.id} skill={skill} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
