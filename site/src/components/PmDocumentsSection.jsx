import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import pmDocuments from '../content/pmDocuments.json'
import { getPublishedPmDocuments } from '../lib/sections'
import './CardGrid.css'

export default function PmDocumentsSection() {
  const lang = useLanguage()
  const t = useStrings(lang)
  const projects = getPublishedPmDocuments()

  if (projects.length === 0) return null

  return (
    <section id="documenti" className="card-section">
      <h2 className="section-title">{t.pmDocuments.sectionTitle}</h2>
      <p className="card-section__eyebrow">{t.pmDocuments.eyebrow}</p>
      <ul className="card-grid">
        {projects.map((project) => (
          <li key={project.id} className="card-grid__card">
            <h3>{pick(project.title, lang)}</h3>
            <ul className="card-grid__list">
              {project.documents.map((doc) => (
                <li key={doc.href}>
                  <a href={doc.href} target="_blank" rel="noreferrer">
                    {pick(doc.title, lang) ?? pick(pmDocuments.types[doc.type], lang)}
                  </a>
                  {doc.description && <p className="card-grid__secondary">{pick(doc.description, lang)}</p>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
