import type {UserPlugins} from '@vuepress/types'

import {components, pwa, ts, zoom, siteDomain} from '../attrs'
import {pageMetaPlugin} from './pageMeta'
import {extendPageDataPlugin} from './extendPageData'

export const plugins: UserPlugins = [
  ['@vuepress/register-components', components],
  ['@vuepress/back-to-top'],
  ['@vuepress/medium-zoom', zoom],
  ['vuepress-plugin-typescript', ts],
  ['@vuepress/google-analytics', {ga: 'UA-163403399-1'}],
  ['@vuepress/pwa', pwa],
  ['vuepress-plugin-sitemap', {hostname: siteDomain, exclude: ['/404.html']}],
  extendPageDataPlugin,
  pageMetaPlugin,
]
