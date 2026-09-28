import { Link } from 'react-router-dom'
import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import TechTag from './TechTag'
import EpisodeCarousel from './EpisodeCarousel'
import './FeaturedProject.css'

export default function FeaturedProject({ project }) {
  const lang = useLanguage()
  const t = useStrings(lang)
  const prefix = lang === 'en' ? '/en/projects' : '/progetti'
  const results = pick(project.results, lang) ?? []

  return (
    <article className="featured-project">
      <p className="featured-project__eyebrow">{t.projects.featuredEyebrow}</p>
      <h3 className="featured-project__title">{pick(project.title, lang)}</h3>
      <p className="featured-project__type">{pick(project.type, lang)}</p>

      <dl className="featured-project__facts">
        <div>
          <dt>{t.projects.problem}</dt>
          <dd>{pick(project.problem, lang)}</dd>
        </div>
        <div>
          <dt>{t.projects.solution}</dt>
          <dd>{pick(project.solution, lang)}</dd>
        </div>
        {results.length > 0 && (
          <div>
            <dt>{t.projects.results}</dt>
            <dd>
              <ul className="featured-project__results">
                {results.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>

      <ul className="featured-project__tags" aria-label={t.projects.technologies}>
        {project.technologies.map((tech) => (
          <li key={tech}>
            <TechTag>{tech}</TechTag>
          </li>
        ))}
      </ul>

      <div className="featured-project__links">
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noreferrer">
            {t.projects.repository}
          </a>
        )}
        {project.links.diario && (
          <a href={project.links.diario} target="_blank" rel="noreferrer">
            {t.projects.diario}
          </a>
        )}
        {project.links.adr && (
          <a href={project.links.adr} target="_blank" rel="noreferrer">
            {t.projects.adr}
          </a>
        )}
        <Link to={`${prefix}/${project.slug}`}>{t.projects.dettaglio} →</Link>
      </div>

      {project.episodes.length > 0 && (
        <div className="featured-project__episodes">
          <h4>{t.projects.episodesTitle}</h4>
          <EpisodeCarousel episodes={project.episodes} subtitlesNote={project.subtitlesNote} />
        </div>
      )}
    </article>
  )
}
