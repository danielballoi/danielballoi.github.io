import { pick, useLanguage } from '../i18n/LanguageContext'
import { getPmDocumentCards } from '../lib/sections'
import './PmDocumentCards.css'

/** Una scheda per progetto con i documenti di PM e il loro stato. */
export default function PmDocumentCards() {
  const lang = useLanguage()
  const projects = getPmDocumentCards()

  return (
    <ul className="pm-docs">
      {projects.map((project) => (
        <li key={project.slug} className="pm-docs__card">
          <h4 className="pm-docs__title">{pick(project.title, lang)}</h4>
          <ul className="pm-docs__list">
            {project.documents.map((doc) => {
              const label = pick(doc.label, lang)
              return (
                <li key={doc.type} className="pm-docs__item">
                  {doc.href ? (
                    <a href={doc.href} target="_blank" rel="noreferrer">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                  <span className={`pm-docs__status pm-docs__status--${doc.status}`}>
                    {pick(doc.statusLabel, lang)}
                  </span>
                </li>
              )
            })}
          </ul>
        </li>
      ))}
    </ul>
  )
}
