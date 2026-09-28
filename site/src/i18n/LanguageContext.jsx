import { createContext, useContext } from 'react'

export const LanguageContext = createContext('it')

export function useLanguage() {
  return useContext(LanguageContext)
}

export function pick(field, lang) {
  if (field == null) return null
  if (typeof field === 'object' && !Array.isArray(field)) {
    return field[lang] ?? field.it ?? null
  }
  return field
}
