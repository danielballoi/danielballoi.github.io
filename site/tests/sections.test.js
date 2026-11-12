import { describe, expect, it } from 'vitest'
import { getNavSections, getPmDocumentCards, getPublishedReferences } from '../src/lib/sections'
import { getCompletedProjects } from '../src/lib/projects'
import pmDocuments from '../src/content/pmDocuments.json'

const base = {
  types: { charter: { it: 'Project charter', en: 'Project charter' } },
  statuses: {
    disponibile: { it: 'disponibile', en: 'available' },
    'in-revisione': { it: 'in revisione', en: 'under review' },
    'in-preparazione': { it: 'in preparazione', en: 'in preparation' },
  },
}

describe('documenti di project management', () => {
  it('collega un documento solo se è disponibile e ha un link', () => {
    const data = {
      ...base,
      projects: [
        {
          slug: 'a',
          documents: [
            { type: 'charter', status: 'disponibile', href: '/docs/a/charter.pdf' },
            { type: 'charter', status: 'disponibile', href: null },
            { type: 'charter', status: 'in-revisione', href: '/docs/a/bozza.pdf' },
          ],
        },
      ],
    }
    const [card] = getPmDocumentCards(data)
    expect(card.documents.map((d) => d.href)).toEqual(['/docs/a/charter.pdf', null, null])
    expect(card.documents[2].statusLabel.en).toBe('under review')
  })

  it('tratta uno stato sconosciuto come "in preparazione"', () => {
    const data = { ...base, projects: [{ slug: 'a', documents: [{ type: 'charter', status: 'boh' }] }] }
    expect(getPmDocumentCards(data)[0].documents[0].status).toBe('in-preparazione')
  })

  it('i dati reali hanno tipi e stati validi, in italiano e in inglese', () => {
    for (const project of pmDocuments.projects) {
      for (const doc of project.documents) {
        expect(pmDocuments.types[doc.type], `${project.slug}/${doc.type}`).toBeDefined()
        expect(pmDocuments.statuses[doc.status], `${project.slug}/${doc.status}`).toBeDefined()
        if (doc.href) expect(doc.status).toBe('disponibile')
      }
    }
    for (const label of [...Object.values(pmDocuments.types), ...Object.values(pmDocuments.statuses)]) {
      expect(label.it).toBeTruthy()
      expect(label.en).toBeTruthy()
    }
  })
})

describe('referenze', () => {
  it('ignora le referenze senza autore o senza testo', () => {
    const data = [
      { author: 'A', text: { it: 'ok' } },
      { author: 'B', text: null },
      { author: '', text: { it: 'senza autore' } },
    ]
    expect(getPublishedReferences(data).map((r) => r.author)).toEqual(['A'])
  })
})

describe('menu', () => {
  it('segue l’ordine della pagina e salta le sezioni vuote', () => {
    const sections = getNavSections()
    expect(sections[0]).toBe('chi-sono')
    expect(sections.at(-1)).toBe('contatti')
    expect(sections).not.toContain('documenti')
    if (getPublishedReferences().length === 0) expect(sections).not.toContain('referenze')
  })
})

describe('progetti in home', () => {
  it('mostra solo i progetti realizzati', () => {
    const projects = getCompletedProjects()
    expect(projects.length).toBeGreaterThan(0)
    expect(projects.every((p) => p.status === 'online')).toBe(true)
  })
})
