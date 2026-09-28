import { describe, expect, it } from 'vitest'
import { getAllProjects, getFeaturedProject, getProjectBySlug, getProjectSlugs } from '../src/lib/projects'

describe('projects content loader', () => {
  it('finds exactly one featured project', () => {
    const featured = getAllProjects().filter((p) => p.featured)
    expect(featured).toHaveLength(1)
    expect(getFeaturedProject().slug).toBe(featured[0].slug)
  })

  it('exposes every project slug found on disk', () => {
    const slugs = getProjectSlugs()
    expect(slugs).toContain('balloi-immobiliare')
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('returns null for an unknown slug instead of throwing', () => {
    expect(getProjectBySlug('non-esiste')).toBeNull()
  })
})
