// Importa solo le singole icone usate in skills.json (named import), cosi'
// il bundler include solo queste poche decine di SVG e non l'intero
// pacchetto simple-icons (migliaia di icone).
import {
  siAmazonwebservices,
  siAwslambda,
  siDocker,
  siExpress,
  siGit,
  siGithubactions,
  siGnubash,
  siJavascript,
  siJira,
  siLinux,
  siMongodb,
  siMysql,
  siNginx,
  siNodedotjs,
  siOpenjdk,
  siReact,
  siSpringboot,
  siTerraform,
} from 'simple-icons'

const icons = {
  amazonwebservices: siAmazonwebservices,
  awslambda: siAwslambda,
  docker: siDocker,
  express: siExpress,
  git: siGit,
  githubactions: siGithubactions,
  gnubash: siGnubash,
  javascript: siJavascript,
  jira: siJira,
  linux: siLinux,
  mongodb: siMongodb,
  mysql: siMysql,
  nginx: siNginx,
  nodedotjs: siNodedotjs,
  openjdk: siOpenjdk,
  react: siReact,
  springboot: siSpringboot,
  terraform: siTerraform,
}

export function getIcon(slug) {
  return icons[slug] ?? null
}
