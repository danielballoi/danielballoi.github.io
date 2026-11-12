import pmDocuments from '../content/pmDocuments.json'
import references from '../content/references.json'

/**
 * Documenti di PM per progetto, pronti per le schede in "Progetti".
 * Un documento ha un link solo se è "disponibile" e ha un href: un link
 * scritto su un documento ancora in preparazione o in revisione viene ignorato.
 * Gli stati sconosciuti diventano "in preparazione".
 */
export function getPmDocumentCards(data = pmDocuments) {
  return data.projects.map((project) => ({
    ...project,
    documents: project.documents.map((doc) => {
      const status = data.statuses[doc.status] ? doc.status : 'in-preparazione'
      const href = status === 'disponibile' && doc.href ? doc.href : null
      return {
        type: doc.type,
        label: data.types[doc.type] ?? { it: doc.type, en: doc.type },
        status,
        statusLabel: data.statuses[status],
        href,
      }
    }),
  }))
}

/** Referenze complete: senza autore e testo non vengono mostrate. */
export function getPublishedReferences(data = references) {
  return data.filter((ref) => Boolean(ref.author) && Boolean(ref.text))
}

/**
 * Voci del menu nell'ordine della pagina. Le referenze non compaiono finché
 * restano vuote; i documenti di PM stanno dentro "Progetti".
 */
export function getNavSections() {
  return [
    'chi-sono',
    'esperienza',
    'competenze',
    'progetti',
    'certificazioni',
    getPublishedReferences().length > 0 && 'referenze',
    'contatti',
  ].filter(Boolean)
}
