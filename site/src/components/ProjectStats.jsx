import { pick, useLanguage } from '../i18n/LanguageContext'
import './ProjectStats.css'

export default function ProjectStats({ stats }) {
  const lang = useLanguage()

  return (
    <ul className="project-stats">
      {stats.map((stat) => (
        <li key={stat.value} className="project-stats__item">
          <span className="project-stats__value">{stat.value}</span>
          <span className="project-stats__label">{pick(stat.label, lang)}</span>
        </li>
      ))}
    </ul>
  )
}
