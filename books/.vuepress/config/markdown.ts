import type {MarkdownConfig} from '@vuepress/types'
import MarkdownIt, {type Token} from 'markdown-it'

import container from 'markdown-it-container'
import markdownItAttrs from 'markdown-it-attrs'

const addContainer = (md: MarkdownIt, name: string, el = 'div'): void => {
  md.use(container, name, {render: (tokens: Token[], idx: number) => {
    return tokens[idx].nesting === 1
      ? `<${el} class="container ${name}">\n`
      : `</${el}>\n`
  }})
}

export const markdownConfig: MarkdownConfig = {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  extractHeaders: ['h1' as any, 'h2', 'h3', 'h4'],
  extendMarkdown: (md) => {
    md.set({breaks: true})

    md.use(markdownItAttrs, {allowedAttributes: ['dir']})

    addContainer(md, 'hebrew-list')
  },
}
