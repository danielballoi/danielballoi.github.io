import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import SkillIcon from './SkillIcon'
import './SkillItem.css'

export default function SkillItem({ skill }) {
  const lang = useLanguage()
  const t = useStrings(lang)
  const contextLabels = {
    work: t.techSkills.contextWork,
    personal: t.techSkills.contextPersonal,
    both: t.techSkills.contextBoth,
  }

  return (
    <li className="skill-item">
      <div className="skill-item__icons">
        {skill.icons.length > 0 ? (
          skill.icons.map((slug) => <SkillIcon key={slug} slug={slug} />)
        ) : (
          <SkillIcon slug={null} />
        )}
      </div>
      <span className="skill-item__name">{pick(skill.name, lang)}</span>
      <span className="skill-item__context">{contextLabels[skill.context]}</span>
      <span className="skill-item__evidence">
        {skill.evidence.map((ev, i) => (
          <span key={ev.href}>
            {i > 0 && ' · '}
            <a href={ev.href}>{pick(ev.label, lang)}</a>
          </span>
        ))}
      </span>
    </li>
  )
}
