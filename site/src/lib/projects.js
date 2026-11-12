import { mediaUrl } from './media'

const modules = import.meta.glob('../content/progetti/*.json', { eager: true })

const projects = Object.values(modules)
  .map((mod) => mod.default ?? mod)
  .map((project) => ({
    ...project,
    episodes: (project.episodes ?? []).map((episode) => ({
      ...episode,
      video: mediaUrl(episode.video),
      poster: mediaUrl(episode.poster),
    })),
  }))
  .sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    const orderA = typeof a.order === 'number' ? a.order : Infinity
    const orderB = typeof b.order === 'number' ? b.order : Infinity
    if (orderA !== orderB) return orderA - orderB
    return a.slug.localeCompare(b.slug)
  })

export function getAllProjects() {
  return projects
}

/** Progetti mostrati in home: solo quelli realizzati (online). */
export function getCompletedProjects() {
  return projects.filter((project) => project.status === 'online')
}

export function getFeaturedProject() {
  return projects.find((project) => project.featured) ?? null
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug)
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug) ?? null
}
