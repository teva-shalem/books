import type { PageData } from 'vuepress'

export function getBaseUrl(): `/${string}/` | undefined {
  const isProd = process.env.NODE_ENV === 'production'
  const githubRepo = process.env.GITHUB_REPOSITORY // "owner/repo-name"

  return isProd && githubRepo && githubRepo.split('/')[1] === 'books-forever'
    ? '/books-forever/'
    : undefined
}

export function addPageClass($page: PageData): void {
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
