import { getIcon } from '../lib/icons'
import './SkillIcon.css'

function GenericIcon() {
  return (
    <svg className="skill-icon skill-icon--generic" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="7" y1="2" x2="7" y2="7" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="2" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" />
      <line x1="17" y1="2" x2="17" y2="7" stroke="currentColor" strokeWidth="1.5" />
      <line x1="7" y1="17" x2="7" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <line x1="17" y1="17" x2="17" y2="22" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function SkillIcon({ slug }) {
  const icon = getIcon(slug)
  if (!icon) return <GenericIcon />

  return (
    <svg
      className="skill-icon"
      viewBox="0 0 24 24"
      role="img"
      aria-label={icon.title}
      style={{ '--brand-color': `#${icon.hex}` }}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  )
}
