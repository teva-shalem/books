import type {PluginTuple} from '@vuepress/types'
import {type Frontmatter, buildFrontmatter, getLang, getLocale} from '../frontmatter'
import path from 'path'
import fs from 'fs'

interface PageContext {
  path: string
  frontmatter: Partial<Frontmatter>
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

export const buildHeadMeta = ({frontmatter, path: pagePath}: PageContext): HeadEntry[] => {
  const {
    language, title, description, author, cover, datePublished, series, subtitle,
  } = buildFrontmatter(frontmatter)

  const baseUrl = 'https://books.tevashalem.com'
  const pageUrl = `${baseUrl}${pagePath}`
  const imageUrl = `${baseUrl}/images/${cover}`

  const jsonLd: Record<string, unknown> = {
    '@context'  : 'https://schema.org',
    '@type'     : pagePath === '/' ? 'WebSite' : 'Book',
    'name'      : title,
    description,
    'inLanguage': getLang(language),
    'url'       : pageUrl,
    'image'     : imageUrl,
    'author'    : {
      '@type': 'Person',
      'name' : author,
    },
    'publisher': {
      '@type': 'Organization',
      'name' : 'בית ספר פעימה',
      'url'  : 'https://tevashalem.com',
    },
  }

  if (subtitle) jsonLd.alternativeHeadline = subtitle
  if (datePublished) jsonLd.datePublished = String(datePublished)
  if (Array.isArray(series)) {
    const [seriesName, bookNumber] = series
    jsonLd.isPartOf = {
      '@type': 'CreativeWorkSeries',
      'name' : seriesName,
    }
    jsonLd.position = bookNumber
  }

  return [
    {tag: 'script', attrs: {type: 'application/ld+json'}, content: JSON.stringify(jsonLd)},

    // Canonical & Author
    {tag: 'link', attrs: {rel: 'canonical', href: pageUrl}},
    {tag: 'meta', attrs: {name: 'author', content: author}},

    // Open Graph
    {tag: 'meta', attrs: {property: 'og:type', content: pagePath === '/' ? 'website' : 'book'}},
    {tag: 'meta', attrs: {property: 'og:site_name', content: title}},
    {tag: 'meta', attrs: {property: 'og:locale', content: getLocale(language)}},
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
