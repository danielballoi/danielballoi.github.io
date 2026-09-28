import { describe, expect, it } from 'vitest'
import { validateContactForm } from '../src/lib/contactForm'

const validPayload = {
  name: 'Mario Rossi',
  email: 'mario.rossi@example.com',
  message: 'Ciao, vorrei saperne di più sul tuo lavoro.',
  consent: true,
  website: '',
}

describe('validateContactForm', () => {
  it('accepts a well-formed submission', () => {
    const result = validateContactForm(validPayload)
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual({})
    expect(result.isBot).toBe(false)
  })

  it('requires name, email and message', () => {
    const result = validateContactForm({ ...validPayload, name: '', email: '', message: '' })
    expect(result.valid).toBe(false)
    expect(result.errors).toEqual({ name: 'required', email: 'required', message: 'required' })
  })

  it('rejects a malformed email', () => {
    const result = validateContactForm({ ...validPayload, email: 'not-an-email' })
    expect(result.valid).toBe(false)
    expect(result.errors.email).toBe('invalid')
  })

  it('requires explicit consent', () => {
    const result = validateContactForm({ ...validPayload, consent: false })
    expect(result.valid).toBe(false)
    expect(result.errors.consent).toBe('required')
  })

  it('enforces maximum field lengths', () => {
    const result = validateContactForm({ ...validPayload, name: 'a'.repeat(101) })
    expect(result.valid).toBe(false)
    expect(result.errors.name).toBe('tooLong')
  })

  it('silently flags a filled honeypot as a bot without a user-facing field error', () => {
    const result = validateContactForm({ ...validPayload, website: 'http://spam.example' })
    expect(result.valid).toBe(false)
    expect(result.isBot).toBe(true)
    expect(result.errors).toEqual({})
  })
})
