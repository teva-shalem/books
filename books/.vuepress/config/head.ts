import type {HeadTags} from '@vuepress/types'

const THEME_COLOR = '#2B8C96'

export const head: HeadTags = [
  ['link', {rel: 'manifest', href: '/manifest.json'}],
  ['meta', {name: 'theme-color', content: THEME_COLOR}],

  ['meta', {name: 'mobile-web-app-capable', content: 'yes'}],
  ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent'}],
  ['meta', {name: 'apple-mobile-web-app-title', content: 'טבעדינמיקה'}],
  ['link', {rel: 'apple-touch-icon', href: '/images/pwa/apple-touch-icon.png'}],

  ['meta', {name: 'msapplication-TileImage', content: '/images/pwa/icon-144x144.png'}],
  ['meta', {name: 'msapplication-TileColor', content: THEME_COLOR}],

  ['link', {rel: 'icon', href: '/images/favicon.ico', sizes: '48x48'}],
  ['link', {rel: 'icon', href: '/images/pwa/icon-192x192.png', sizes: '192x192', type: 'image/png'}],
  ['link', {rel: 'icon', href: '/images/pwa/icon-512x512.png', sizes: '512x512', type: 'image/png'}],

  ['link', {rel: 'preconnect', href: 'https://googleapis.com'}],
  ['link', {rel: 'preconnect', href: 'https://gstatic.com', crossorigin: 'anonymous'}],
  ['link', {rel : 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&display=swap'}],
]
