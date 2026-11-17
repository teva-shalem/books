import type {PluginTuple} from '@vuepress/types'

import path from 'path'
import fs from 'fs'
import {siteDescription, siteTitle} from '../attrs'

interface PageContext {
  path: string
  frontmatter: ReadingLayoutFrontmatter
}

interface BuildContext {
  outDir: string
  pages: PageContext[]
}

interface HeadEntry {
  tag: string
  attrs: Record<string, string>
  content?: string
}

export interface ReadingLayoutFrontmatter {
  layout?: string
  title?: string
  subtitle?: string
  description?: string
  author?: string
  cover?: string
  coverAlt?: string
  datePublished?: string | number
  series?: [string, number]
}

export const buildHeadMeta = ({frontmatter: fm, path: pagePath}: PageContext): HeadEntry[] => {
  if (!['ReadingLayout', 'EnglishReadingLayout'].includes(fm.layout ?? '')) return []
  const isEnglish = fm.layout === 'EnglishReadingLayout'
  const title = fm.title ?? siteTitle
  const description = fm.description ?? siteDescription
  const authorName = fm.author ?? 'דוד ישראל כהן'
  const baseUrl = 'https://books.tevashalem.com'
  const pageUrl = `${baseUrl}${pagePath}`
  const imageUrl = `${baseUrl}/images/${fm.cover ? fm.cover : 'merkavah-logo.jpg'}`

  const jsonLd: Record<string, unknown> = {
    '@context'  : 'https://schema.org',
    '@type'     : pagePath === '/' ? 'WebSite' : 'Book',
    'name'      : title,
    description,
    'inLanguage': isEnglish ? 'en' : 'he',
    'url'       : pageUrl,
    'image'     : imageUrl,
    'author'    : {
      '@type': 'Person',
      'name' : authorName,
    },
    'publisher': {
      '@type': 'Organization',
      'name' : 'בית ספר פעימה',
      'url'  : 'https://tevashalem.com/',
    },
  }

  if (fm.subtitle) jsonLd.alternativeHeadline = fm.subtitle
  if (fm.datePublished) jsonLd.datePublished = String(fm.datePublished)
  if (Array.isArray(fm.series)) {
    const [seriesName, bookNumber] = fm.series
    jsonLd.isPartOf = {
      '@type': 'CreativeWorkSeries',
      'name' : seriesName,
    }
    jsonLd.position = bookNumber
  }

  const tags: HeadEntry[] = [
    {tag: 'script', attrs: {type: 'application/ld+json'}, content: JSON.stringify(jsonLd)},

    // Canonical & Author
    {tag: 'link', attrs: {rel: 'canonical', href: pageUrl}},
    {tag: 'meta', attrs: {name: 'author', content: authorName}},

    // Open Graph
    {tag: 'meta', attrs: {property: 'og:type', content: pagePath === '/' ? 'website' : 'book'}},
    {tag: 'meta', attrs: {property: 'og:site_name', content: siteTitle}},
    {tag: 'meta', attrs: {property: 'og:locale', content: isEnglish ? 'en_US' : 'he_IL'}},
    {tag: 'meta', attrs: {property: 'og:title', content: title}},
    {tag: 'meta', attrs: {property: 'og:description', content: description}},
    {tag: 'meta', attrs: {property: 'og:url', content: pageUrl}},
    {tag: 'meta', attrs: {property: 'og:image', content: imageUrl}},

    // Twitter / X Card
    {tag: 'meta', attrs: {name: 'twitter:card', content: 'summary_large_image'}},
    {tag: 'meta', attrs: {name: 'twitter:title', content: title}},
    {tag: 'meta', attrs: {name: 'twitter:description', content: description}},
    {tag: 'meta', attrs: {name: 'twitter:image', content: imageUrl}},
  ]

  return tags
}

const escapeAttr = (val: string): string =>
  val.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

export const headMetaPlugin = ((_options: unknown, ctx: BuildContext) => ({
  name           : 'head-meta',
  clientRootMixin: path.resolve(__dirname, 'headMetaMixin.ts'),
  generated() {
    for (const page of ctx.pages) {
      const entries = buildHeadMeta(page)
      if (!entries.length) continue

      const relFile = page.path.endsWith('/') ? `${page.path}index.html` : page.path
      const htmlFile = path.join(ctx.outDir, relFile)
      if (!fs.existsSync(htmlFile)) continue

      const headHtml = entries
        .map(({tag, attrs: tagAttrs, content}) => {
          const attrStr = Object.entries(tagAttrs)
            .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
            .join(' ')
          return tag === 'script'
            ? `<script ${attrStr}>${content ?? ''}</script>`
            : `<${tag} ${attrStr}>`
        })
        .join('\n    ')

      const html = fs.readFileSync(htmlFile, 'utf8')
      fs.writeFileSync(htmlFile, html.replace('</head>', `    ${headHtml}\n  </head>`), 'utf8')
    }
  },
})) as unknown as PluginTuple
