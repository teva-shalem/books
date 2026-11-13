import type {PageData} from 'vuepress'

const getGithubRepo = (): string | undefined => {
  return process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
}

export const getBaseUrl = (): `/${string}/` | undefined => {
  if (getGithubRepo() === 'books-forever')
    return '/books-forever/'

  return undefined
}

export const addPageClass = ($page: PageData): void => {
  if ($page.frontmatter.pageClass)
    return

  const permalink = $page.frontmatter.permalink || $page.path

  if (permalink) {
    const cleanClass = permalink.replace(/\//g, '')

    if (cleanClass) {
      $page.frontmatter.pageClass = cleanClass
    }
  }
}
