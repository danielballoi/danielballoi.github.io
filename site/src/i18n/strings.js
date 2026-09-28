export const strings = {
  it: {
    nav: {
      progetti: 'Progetti',
      esperienza: 'Esperienza',
      certificazioni: 'Certificazioni',
      competenze: 'Competenze',
      comeLavoro: 'Come lavoro',
      contatti: 'Contatti',
      menuApri: 'Apri il menu',
      menuChiudi: 'Chiudi il menu',
    },
    hero: {
      scaricaCv: 'Scarica CV',
      email: 'Email',
      copiaEmail: 'Copia indirizzo',
      emailCopiata: 'Copiato',
    },
    languagePrompt: {
      message: 'Il tuo browser sembra impostato in inglese. Vuoi vedere il sito in inglese?',
      accept: 'Sì, in inglese',
      dismiss: 'No, resta in italiano',
    },
    languageSwitch: { label: 'Cambia lingua' },
  },
  en: {
    nav: {
      progetti: 'Projects',
      esperienza: 'Experience',
      certificazioni: 'Certifications',
      competenze: 'Skills',
      comeLavoro: 'How I work',
      contatti: 'Contact',
      menuApri: 'Open menu',
      menuChiudi: 'Close menu',
    },
    hero: {
      scaricaCv: 'Download CV',
      email: 'Email',
      copiaEmail: 'Copy address',
      emailCopiata: 'Copied',
    },
    languagePrompt: {
      message: 'Your browser looks set to Italian. Would you like to view the site in Italian?',
      accept: 'Yes, in Italian',
      dismiss: 'No, keep English',
    },
    languageSwitch: { label: 'Switch language' },
  },
}

export function useStrings(lang) {
  return strings[lang] ?? strings.it
}
