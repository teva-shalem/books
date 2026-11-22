import type {MarkdownConfig} from '@vuepress/types'
import MarkdownIt, {type Token} from 'markdown-it'

import container from 'markdown-it-container'
import markdownItAttrs from 'markdown-it-attrs'

const registerContainer = (md: MarkdownIt, name: string, el = 'div'): void => {
  md.use(container, name, {render: (tokens: Token[], idx: number) => {
    return tokens[idx].nesting === 1
      ? `<${el} class="container ${name}">\n`
      : `</${el}>\n`
  }})
}

export const markdown: MarkdownConfig = {
  extractHeaders: ['h2', 'h3', 'h4', 'h5'],
  extendMarkdown: (md) => {
    md.set({breaks: true})

    md.use(markdownItAttrs, {allowedAttributes: ['lang', 'class']})

    registerContainer(md, 'full-width')
    registerContainer(md, 'hebrew-list')
  },
}
