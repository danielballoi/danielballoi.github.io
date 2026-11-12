import pmDocuments from '../content/pmDocuments.json'
import references from '../content/references.json'

/**
 * Progetti con almeno un documento pubblicato. Un documento conta solo se
 * ha un link: le voci ancora da preparare restano nel JSON ma non compaiono.
 */
export function getPublishedPmDocuments(data = pmDocuments) {
  return data.projects
    .map((project) => ({
      ...project,
      documents: project.documents.filter((doc) => Boolean(doc.href)),
    }))
    .filter((project) => project.documents.length > 0)
}

/** Referenze complete: senza autore e testo non vengono mostrate. */
export function getPublishedReferences(data = references) {
  return data.filter((ref) => Boolean(ref.author) && Boolean(ref.text))
}

/**
 * Voci del menu nell'ordine della pagina. Le sezioni senza contenuto
 * (documenti di PM, referenze) non compaiono finché restano vuote.
 */
export function getNavSections() {
  return [
    'chi-sono',
    'esperienza',
    'competenze',
    getPublishedPmDocuments().length > 0 && 'documenti',
    'progetti',
    'certificazioni',
    getPublishedReferences().length > 0 && 'referenze',
    'contatti',
  ].filter(Boolean)
}
