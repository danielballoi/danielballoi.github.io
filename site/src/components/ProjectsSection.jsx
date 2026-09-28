import { useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import { getFeaturedProject, getOtherProjects } from '../lib/projects'
import FeaturedProject from './FeaturedProject'
import ProjectCard from './ProjectCard'
import './ProjectsSection.css'

export default function ProjectsSection() {
  const lang = useLanguage()
  const t = useStrings(lang)
  const featured = getFeaturedProject()
  const others = getOtherProjects()

  return (
    <section id="progetti" className="projects-section">
      <h2 className="section-title">{t.projects.sectionTitle}</h2>

      {featured && <FeaturedProject project={featured} />}

      {others.length > 0 && (
        <div className="projects-section__others">
          <p className="projects-section__eyebrow">{t.projects.otherEyebrow}</p>
          <ul className="projects-section__grid">
            {others.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
