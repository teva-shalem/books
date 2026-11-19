import type {UserPlugins} from '@vuepress/types'

import {components, pwa, ts, zoom} from '../attrs'
import {headMetaPlugin} from './headMeta'

export const plugins: UserPlugins = [
  ['@vuepress/register-components', components],
  ['@vuepress/back-to-top'],
  ['@vuepress/medium-zoom', zoom],
  ['vuepress-plugin-typescript', ts],
  ['@vuepress/google-analytics', {ga: 'UA-163403399-1'}],
  ['@vuepress/pwa', pwa],
  headMetaPlugin,
]
