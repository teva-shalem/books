import {siteDescription, siteTitle} from './attrs'

type Language = 'english' | 'hebrew'

export interface Frontmatter {
  title: string
  subtitle?: string
  description: string
  author: string
  cover: string
  datePublished?: string | number
  series?: [string, number]
  language: Language
}

const LANGUAGES = {
  english: {locale: 'en_IL', lang: 'en'},
  hebrew : {locale: 'he_IL', lang: 'he'},
}

export const getLocale = (language: Language) => {
  return LANGUAGES[language].locale
}
export const getLang = (language: Language) => {
  return LANGUAGES[language].lang
}

const FRONTMATTER_DEFAULTS = {
  language   : 'hebrew',
  title      : siteTitle,
  description: siteDescription,
  author     : 'דוד ישראל כהן',
  cover      : 'merkavah-logo.jpg',
} as const

export const buildFrontmatter = (frontmatter: Partial<Frontmatter>): Frontmatter => {
  return {...FRONTMATTER_DEFAULTS, ...frontmatter}
}
