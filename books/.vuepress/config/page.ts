import type {Page} from 'vuepress-types'

const addClass = ($page: Page): void => {
  if ($page.frontmatter.pageClass)
    return

  const permalink = $page.frontmatter.permalink ?? $page.path

  if (permalink) {
    const cleanClass = permalink.replace(/\//g, '')

    if (cleanClass) {
      $page.frontmatter.pageClass = cleanClass
    }
  }
}

export const extendPageData = ($page: Page): void => {
  addClass($page)

  $page.frontmatter.layout ||= 'ReadingLayout'
}
