import { useState } from 'react'

export default function CopyButton({ value, label, copiedLabel, className }) {
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
    <button type="button" className={className} onClick={handleClick}>
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  )
}
