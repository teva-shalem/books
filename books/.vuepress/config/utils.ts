import type { PageData } from 'vuepress'
import type MarkdownIt from 'markdown-it'
import type { Token } from 'markdown-it'

import container from 'markdown-it-container'

export function addContainer(md: MarkdownIt, name: string, el = 'div') {
  md.use(container, name, {
    render: (tokens: Token[], idx: number) => tokens[idx].nesting === 1 
      ? `<${el} class="container ${name}">\n` 
      : `</${el}>\n`
  })
}

export function addPageClass($page: PageData) {
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
