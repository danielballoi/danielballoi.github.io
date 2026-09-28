const LIMITS = { name: 100, email: 200, message: 2000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Valida i campi del modulo contatti. Non ha effetti collaterali: e' testabile
 * senza montare il componente React. Il campo "website" e' l'honeypot
 * anti-bot: se non e' vuoto, il messaggio va scartato senza mostrare un
 * errore all'utente (probabilmente un bot).
 */
export function validateContactForm({ name, email, message, consent, website }) {
  const errors = {}
  const trimmedName = (name ?? '').trim()
  const trimmedEmail = (email ?? '').trim()
  const trimmedMessage = (message ?? '').trim()

  if (!trimmedName) errors.name = 'required'
  else if (trimmedName.length > LIMITS.name) errors.name = 'tooLong'

  if (!trimmedEmail) errors.email = 'required'
  else if (!EMAIL_RE.test(trimmedEmail)) errors.email = 'invalid'
  else if (trimmedEmail.length > LIMITS.email) errors.email = 'tooLong'

  if (!trimmedMessage) errors.message = 'required'
  else if (trimmedMessage.length > LIMITS.message) errors.message = 'tooLong'

  if (!consent) errors.consent = 'required'

  const isBot = Boolean((website ?? '').trim())

  return { valid: Object.keys(errors).length === 0 && !isBot, errors, isBot }
}

export async function submitContactForm(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return response
}
