import { useState } from 'react'
import Icon from './Icon'

export default function CopyIconButton({ value, label, copiedLabel, className }) {
  const [copied, setCopied] = useState(false)

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API non disponibile: nessun problema, l'indirizzo resta comunque visibile e selezionabile a mano.
    }
  }

  return (
    <button type="button" className={className} onClick={handleClick} aria-label={copied ? copiedLabel : label}>
      <Icon name="copy" className="copy-icon-button__icon" />
      <span className="visually-hidden" aria-live="polite">
        {copied ? copiedLabel : ''}
      </span>
    </button>
  )
}
