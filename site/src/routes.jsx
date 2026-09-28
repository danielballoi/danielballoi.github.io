import Layout from './Layout'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'
import { getProjectSlugs } from './lib/projects'

export const routes = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'privacy', Component: Privacy },
      {
        path: 'progetti/:slug',
        Component: ProjectDetail,
        getStaticPaths: () => getProjectSlugs().map((slug) => `progetti/${slug}`),
      },
      { path: '404', Component: NotFound },
    ],
  },
  {
    path: '/en',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'privacy', Component: Privacy },
      {
        path: 'projects/:slug',
        Component: ProjectDetail,
        getStaticPaths: () => getProjectSlugs().map((slug) => `projects/${slug}`),
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]
