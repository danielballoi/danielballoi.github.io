import { Link, useParams } from 'react-router-dom'
import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import { getProjectBySlug } from '../lib/projects'
import SeoHead from '../components/SeoHead'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import EpisodeCarousel from '../components/EpisodeCarousel'
import ProjectStats from '../components/ProjectStats'
import TechTag from '../components/TechTag'
import Icon from '../components/Icon'
import NotFound from './NotFound'
import '../components/ProjectDetail.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const lang = useLanguage()
  const t = useStrings(lang)
  const project = getProjectBySlug(slug)

  if (!project) return <NotFound />

  const title = pick(project.title, lang)
  const summary = pick(project.summary, lang)
  const results = pick(project.results, lang) ?? []
  const statusLabels = {
    online: t.projects.statusOnline,
    'in-progress': t.projects.statusInProgress,
    planned: t.projects.statusPlanned,
  }
  const statusLabel = statusLabels[project.status] ?? project.status
  const homePath = lang === 'en' ? '/en/' : '/'
  const path = lang === 'en' ? `/en/projects/${project.slug}` : `/progetti/${project.slug}`

  return (
    <>
      <SeoHead title={`${title} — Daniel Balloi`} description={summary ?? title} path={path} />
      <main className="project-detail">
        <Link to={homePath} className="project-detail__back">
          ← {t.projects.backToHome}
        </Link>

        <p className="project-detail__status" data-status={project.status}>
          {statusLabel}
        </p>
        <h1 className="project-detail__title">{title}</h1>
        <p className="project-detail__type">{pick(project.type, lang)}</p>
        {summary && <p className="project-detail__summary">{summary}</p>}

        {project.episodes.length > 0 && (
          <section id="episodi" className="project-detail__section">
            <h2>{t.projects.episodesTitle}</h2>
            <EpisodeCarousel episodes={project.episodes} subtitlesNote={project.subtitlesNote} />
          </section>
        )}

        {project.architecture?.nodes && (
          <section aria-labelledby="architettura-titolo" className="project-detail__section">
            <h2 id="architettura-titolo">{t.projects.architectureTitle}</h2>
            <ArchitectureDiagram nodes={project.architecture.nodes} />
          </section>
        )}

        {(pick(project.problem, lang) || pick(project.solution, lang)) && (
          <section className="project-detail__section">
            {pick(project.problem, lang) && (
              <>
                <h2>{t.projects.problem}</h2>
                <p>{pick(project.problem, lang)}</p>
              </>
            )}
            {pick(project.solution, lang) && (
              <>
                <h2>{t.projects.solution}</h2>
                <p>{pick(project.solution, lang)}</p>
              </>
            )}
          </section>
        )}

        {project.resultsStats?.length > 0 ? (
          <section className="project-detail__section">
            <h2>{t.projects.results}</h2>
            <ProjectStats stats={project.resultsStats} />
          </section>
        ) : (
          results.length > 0 && (
            <section className="project-detail__section">
              <h2>{t.projects.results}</h2>
              <ul>
                {results.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>
          )
        )}

        <section className="project-detail__section">
          <h2>{t.projects.technologies}</h2>
          <ul className="project-detail__tags">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <TechTag>{tech}</TechTag>
              </li>
            ))}
          </ul>
        </section>

        {(project.links.github || project.links.diario || project.links.adr) && (
          <section className="project-detail__section project-detail__links">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer">
                <Icon name="github" className="project-detail__link-icon" />
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
          </section>
        )}
      </main>
    </>
  )
}
