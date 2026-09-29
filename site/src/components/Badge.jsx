import Icon from './Icon'
import './Badge.css'

export default function Badge({ icon, iconText, children }) {
  return (
    <span className="badge">
      {icon && <Icon name={icon} className="badge__icon" />}
      {!icon && iconText && <span className="badge__icon-text">{iconText}</span>}
      <span>{children}</span>
    </span>
  )
}
