import type {Page, PageFrontmatter, Plugin} from 'vuepress-types'
import type {PluginTuple} from '@vuepress/types'

import {type Frontmatter, buildFrontmatter, getLang, getLocale} from '../frontmatter'
import {siteTitle} from '../attrs'
import path from 'path'

const DOMAIN = 'https://books.tevashalem.com'
const getPageUrl = (pagePath: string) => `${DOMAIN}${pagePath}`
const getImageUrl = (coverPath: string) => `${DOMAIN}/images/${coverPath}`

const buildMeta = (fm: Frontmatter): PageFrontmatter['meta'] => {
  const existingMeta = fm.meta ?? []

  const {
    permalink, language, title, description, author, cover,
  } = buildFrontmatter(fm)

  const dynamicMeta: Record<string, string>[] = []

  const hasMeta = (key: string) =>
    existingMeta.some(m => m.name === key || m.property === key)

  const addMeta = (tag: Record<string, string>) => {
    const key = tag.name || tag.property
    if (key && tag.content && !hasMeta(key)) {
      dynamicMeta.push(tag)
    }
  }

  addMeta({name: 'author', content: author})
  addMeta({property: 'og:type', content: permalink === '/' ? 'website' : 'book'})
  addMeta({property: 'og:site_name', content: siteTitle})
  addMeta({property: 'og:locale', content: getLocale(language)})
  addMeta({property: 'og:title', content: title})
  addMeta({property: 'og:description', content: description})
  addMeta({property: 'og:url', content: getPageUrl(permalink)})
  addMeta({property: 'og:image', content: getImageUrl(cover)})
  addMeta({name: 'twitter:card', content: 'summary_large_image'})
  addMeta({name: 'twitter:title', content: title})
  addMeta({name: 'twitter:description', content: description})
  addMeta({name: 'twitter:image', content: getImageUrl(cover)})

  return [...existingMeta, ...dynamicMeta]
}

const buildJsonLd = (fm: Frontmatter) => {
  const {
    permalink, language, title, description, author, cover, datePublished, series, subtitle,
  } = buildFrontmatter(fm)

  const jsonLd: Record<string, unknown> = {
    '@context'  : 'https://schema.org',
    '@type'     : permalink === '/' ? 'WebSite' : 'Book',
    'name'      : title,
    description,
    'inLanguage': getLang(language),
    'url'       : getPageUrl(permalink),
    'image'     : getImageUrl(cover),
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
      '@type': 'BookSeries',
      'name' : seriesName,
    }
    jsonLd.position = bookNumber
  }

  return jsonLd
}

const plugin: Plugin = () => ({
  name           : 'page-meta-plugin',
  clientRootMixin: path.resolve(__dirname, 'pageMetaMixin.js'),
  extendPageData($page: Page & {jsonLd?: Record<string, unknown>}) {
    const fm = $page.frontmatter as Frontmatter
    fm.meta = buildMeta(fm)
    $page.jsonLd = buildJsonLd(fm)
  },
})

export const pageMetaPlugin = [plugin] as unknown as PluginTuple
