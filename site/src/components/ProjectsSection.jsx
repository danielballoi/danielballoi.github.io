import { useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import { getCompletedProjects } from '../lib/projects'
import PmDocumentCards from './PmDocumentCards'
import ProjectCard from './ProjectCard'
import './ProjectsSection.css'

export default function ProjectsSection() {
  const lang = useLanguage()
  const t = useStrings(lang)
  const projects = getCompletedProjects()

  return (
    <section id="progetti" className="projects-section">
      <h2 className="section-title">{t.projects.sectionTitle}</h2>

      <div className="projects-section__block" id="documenti-pm">
        <h3 className="projects-section__block-title">{t.projects.pmDocumentsTitle}</h3>
        <PmDocumentCards />
      </div>

      <div className="projects-section__block" id="progetti-tecnici">
        <h3 className="projects-section__block-title">{t.projects.technicalTitle}</h3>
        <p className="projects-section__intro">{t.projects.intro}</p>
        <ul className="projects-section__grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ul>
      </div>
    </section>
  )
}
