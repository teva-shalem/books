import type {Page} from 'vuepress-types'

const addClass = ($page: Page): void => {
  if ($page.frontmatter.pageClass)
    return

  const cleanClass = ($page.frontmatter.permalink ?? '').replace(/\//g, '')

  if (cleanClass) {
    $page.frontmatter.pageClass = cleanClass
  }
}

export const extendPageData = ($page: Page): void => {
  const fm = $page.frontmatter
  fm.canonicalUrl = `https://books.tevashalem.com${fm.permalink}`

  addClass($page)
}
