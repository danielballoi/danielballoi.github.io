import { describe, expect, it } from 'vitest'
import { getNavSections, getPublishedPmDocuments, getPublishedReferences } from '../src/lib/sections'
import { getCompletedProjects } from '../src/lib/projects'

describe('documenti di project management', () => {
  it('mostra solo i documenti con un link e nasconde i progetti senza documenti', () => {
    const data = {
      projects: [
        { id: 'a', documents: [{ type: 'adr', href: 'https://example.com/adr' }, { type: 'rischi', href: null }] },
        { id: 'b', documents: [{ type: 'runbook' }] },
      ],
    }
    const published = getPublishedPmDocuments(data)
    expect(published).toHaveLength(1)
    expect(published[0].documents).toEqual([{ type: 'adr', href: 'https://example.com/adr' }])
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
    if (getPublishedPmDocuments().length === 0) expect(sections).not.toContain('documenti')
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
