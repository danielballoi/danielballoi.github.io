import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import experience from '../content/experience.json'
import './Timeline.css'

function TimelineEntry({ entry }) {
  const lang = useLanguage()
  const highlights = pick(entry.highlights, lang) ?? []

  return (
    <details id={`esperienza-${entry.id}`} className="timeline-entry" open={entry.open}>
      <summary className="timeline-entry__summary">
        <span className="timeline-entry__role">{pick(entry.role, lang)}</span>
        <span className="timeline-entry__company">{entry.company}</span>
        <span className="timeline-entry__meta">
          {pick(entry.location, lang)}
          {pick(entry.period, lang) ? ` · ${pick(entry.period, lang)}` : ''}
        </span>
      </summary>

      {highlights.length > 0 && (
        <ul className="timeline-entry__highlights">
          {highlights.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}

      {entry.projects?.length > 0 && (
        <div className="timeline-entry__projects">
          {entry.projects.map((p) => (
            <div key={p.name} className="timeline-entry__project">
              <p className="timeline-entry__project-heading">
                <strong>{p.name}</strong> — {pick(p.role, lang)} · {pick(p.period, lang)}
              </p>
              {p.description && <p className="timeline-entry__project-description">{pick(p.description, lang)}</p>}
            </div>
          ))}
        </div>
      )}
    </details>
  )
}

export default function Timeline() {
  const lang = useLanguage()
  const t = useStrings(lang)

  return (
    <section id="esperienza" className="timeline-section">
      <h2 className="section-title">{t.experience.sectionTitle}</h2>
      <p className="timeline-section__eyebrow">{t.experience.eyebrow}</p>

      <div className="timeline-section__group">
        <h3>{t.experience.workTitle}</h3>
        {experience.work.map((entry) => (
          <TimelineEntry key={entry.id} entry={entry} />
        ))}
      </div>

      <div className="timeline-section__group">
        <h3>{t.experience.educationTitle}</h3>
        {experience.education.map((entry) => (
          <TimelineEntry key={entry.id} entry={entry} />
        ))}
      </div>

      <div className="timeline-section__group">
        <h3>{t.experience.languagesTitle}</h3>
        <ul className="timeline-section__languages">
          {experience.languages.map((item) => (
            <li key={item.name.it}>
              {pick(item.name, lang)} — {pick(item.level, lang)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
