import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import { getPublishedReferences } from '../lib/sections'
import './CardGrid.css'

export default function ReferencesSection() {
  const lang = useLanguage()
  const t = useStrings(lang)
  const references = getPublishedReferences()

  if (references.length === 0) return null

  return (
    <section id="referenze" className="card-section">
      <h2 className="section-title">{t.references.sectionTitle}</h2>
      <p className="card-section__eyebrow">{t.references.eyebrow}</p>
      <ul className="card-grid">
        {references.map((ref) => (
          <li key={ref.author} className="card-grid__card">
            <blockquote className="references__quote">
              <p>“{pick(ref.text, lang)}”</p>
            </blockquote>
            <p>
              <strong>{ref.author}</strong>
            </p>
            {ref.role && <p className="card-grid__secondary">{pick(ref.role, lang)}</p>}
            {ref.linkedin && (
              <a href={ref.linkedin} target="_blank" rel="noreferrer">
                {t.references.linkedin}
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
