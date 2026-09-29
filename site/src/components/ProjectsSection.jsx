import { useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import { getAllProjects } from '../lib/projects'
import ProjectCard from './ProjectCard'
import './ProjectsSection.css'

export default function ProjectsSection() {
  const lang = useLanguage()
  const t = useStrings(lang)
  const projects = getAllProjects()

  return (
    <section id="progetti" className="projects-section">
      <h2 className="section-title">{t.projects.sectionTitle}</h2>
      <ul className="projects-section__grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </section>
  )
}
