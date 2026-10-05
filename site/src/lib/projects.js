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
    return a.slug.localeCompare(b.slug)
  })

export function getAllProjects() {
  return projects
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
