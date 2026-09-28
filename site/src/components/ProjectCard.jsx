import { Link } from 'react-router-dom'
import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import TechTag from './TechTag'
import './ProjectCard.css'

export default function ProjectCard({ project }) {
  const lang = useLanguage()
  const t = useStrings(lang)
  const prefix = lang === 'en' ? '/en/projects' : '/progetti'
  const statusLabel = project.status === 'online' ? t.projects.statusOnline : t.projects.statusInProgress

  return (
    <li className="project-card">
      <p className="project-card__status" data-status={project.status}>
        {statusLabel}
      </p>
      <h4 className="project-card__title">{pick(project.title, lang)}</h4>
      <p className="project-card__type">{pick(project.type, lang)}</p>
      <p className="project-card__summary">{pick(project.summary, lang)}</p>
      <ul className="project-card__tags">
        {project.technologies.slice(0, 4).map((tech) => (
          <li key={tech}>
            <TechTag>{tech}</TechTag>
          </li>
        ))}
      </ul>
      <Link className="project-card__link" to={`${prefix}/${project.slug}`}>
        {t.projects.dettaglio} →
      </Link>
    </li>
  )
}
