import Icon from './Icon'
import './Badge.css'

export default function Badge({ icon, children }) {
  return (
    <span className="badge">
      {icon && <Icon name={icon} className="badge__icon" />}
      <span>{children}</span>
    </span>
  )
}
