import { useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import { submitContactForm, validateContactForm } from '../lib/contactForm'
import profile from '../content/profile.json'
import './ContactForm.css'

const THROTTLE_MS = 30000
const ERROR_KEY_TO_STRING = {
  required: 'errorRequired',
  invalid: 'errorInvalidEmail',
  tooLong: 'errorTooLong',
}

export default function ContactForm({ apiUrl }) {
  const lang = useLanguage()
  const t = useStrings(lang)
  const privacyHref = lang === 'en' ? '/en/privacy' : '/privacy'
  const [status, setStatus] = useState('idle') // idle | sending | success | error | throttled
  const [errors, setErrors] = useState({})
  const lastSubmitAt = useRef(0)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      consent: form.consent.checked,
      website: form.website.value,
    }

    const now = Date.now()
    if (now - lastSubmitAt.current < THROTTLE_MS) {
      setStatus('throttled')
      return
    }

    const result = validateContactForm(data)
    if (result.isBot) {
      // Comportamento indistinguibile da un invio riuscito: non si da' al bot
      // alcun segnale su cosa lo ha smascherato.
      setStatus('success')
      return
    }
    if (!result.valid) {
      setErrors(result.errors)
      setStatus('idle')
      return
    }

    setErrors({})
    setStatus('sending')
    lastSubmitAt.current = now

    try {
      await submitContactForm(apiUrl, {
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
        consent: data.consent,
        website: data.website,
      })
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__field">
        <label htmlFor="contact-name">{t.contact.name}</label>
        <input id="contact-name" name="name" type="text" maxLength={100} autoComplete="name" />
        {errors.name && <p className="contact-form__error">{t.contact[ERROR_KEY_TO_STRING[errors.name]]}</p>}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">{t.contact.email}</label>
        <input id="contact-email" name="email" type="email" maxLength={200} autoComplete="email" />
        {errors.email && <p className="contact-form__error">{t.contact[ERROR_KEY_TO_STRING[errors.email]]}</p>}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">{t.contact.message}</label>
        <textarea id="contact-message" name="message" rows={5} maxLength={2000} />
        {errors.message && <p className="contact-form__error">{t.contact[ERROR_KEY_TO_STRING[errors.message]]}</p>}
      </div>

      <div className="contact-form__field contact-form__field--honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form__consent">
        <input id="contact-consent" name="consent" type="checkbox" />
        <label htmlFor="contact-consent">
          {t.contact.consent} <a href={privacyHref}>{t.contact.privacyLink}</a>
        </label>
      </div>
      {errors.consent && <p className="contact-form__error">{t.contact.errorRequired}</p>}

      <button type="submit" className="contact-form__submit" disabled={status === 'sending'}>
        {status === 'sending' ? t.contact.sending : t.contact.send}
      </button>

      <div aria-live="polite" className="contact-form__status">
        {status === 'success' && <p className="contact-form__success">{t.contact.success}</p>}
        {status === 'throttled' && <p className="contact-form__note">{t.contact.throttled}</p>}
        {status === 'error' && (
          <p className="contact-form__error-block">
            {t.contact.error} <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
          </p>
        )}
      </div>
    </form>
  )
}
