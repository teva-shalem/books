import type {UserPlugins, PluginTuple} from '@vuepress/types'

import {components, pwa, ts, zoom} from '../attrs'
// import {headMetaPlugin} from './headMeta'
import {pageMetaPlugin} from './pageMeta'
import {extendPageData} from '../page'

const extendPageDataPlugin = [{name: 'extend-page-data', extendPageData}] as unknown as PluginTuple

export const plugins: UserPlugins = [
  ['@vuepress/register-components', components],
  ['@vuepress/back-to-top'],
  ['@vuepress/medium-zoom', zoom],
  ['vuepress-plugin-typescript', ts],
  ['@vuepress/google-analytics', {ga: 'UA-163403399-1'}],
  ['@vuepress/pwa', pwa],
  // headMetaPlugin,
  extendPageDataPlugin,
  pageMetaPlugin,
]
