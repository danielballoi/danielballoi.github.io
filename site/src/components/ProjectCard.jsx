import { Link } from 'react-router-dom'
import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import TechTag from './TechTag'
import Icon from './Icon'
import './ProjectCard.css'

export default function ProjectCard({ project }) {
  const lang = useLanguage()
  const t = useStrings(lang)
  const prefix = lang === 'en' ? '/en/projects' : '/progetti'
  const statusLabels = {
    online: t.projects.statusOnline,
    'in-progress': t.projects.statusInProgress,
    planned: t.projects.statusPlanned,
  }
  const statusLabel = statusLabels[project.status] ?? project.status
  const card = project.card
    ? [
        [t.projects.problem, pick(project.card.problem, lang)],
        [t.projects.choice, pick(project.card.choice, lang)],
        [t.projects.result, pick(project.card.result, lang)],
      ].filter(([, text]) => text)
    : []

  return (
    <li className={`project-card ${project.featured ? 'project-card--featured' : ''}`}>
      <p className="project-card__status" data-status={project.status}>
        {statusLabel}
      </p>
      <h4 className="project-card__title">{pick(project.title, lang)}</h4>
      <p className="project-card__type">{pick(project.type, lang)}</p>
      {card.length > 0 ? (
        <dl className="project-card__story">
          {card.map(([label, text]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="project-card__summary">{pick(project.summary, lang)}</p>
      )}
      <ul className="project-card__tags">
        {project.technologies.slice(0, 4).map((tech) => (
          <li key={tech}>
            <TechTag>{tech}</TechTag>
          </li>
        ))}
      </ul>
      <div className="project-card__actions">
        {project.links.github && (
          <a
            className="project-card__github"
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Icon name="github" className="project-card__github-icon" />
          </a>
        )}
        <Link className="project-card__link" to={`${prefix}/${project.slug}`}>
          <Icon name="play" className="project-card__link-icon" />
          {t.projects.dettaglio}
        </Link>
      </div>
    </li>
  )
}
