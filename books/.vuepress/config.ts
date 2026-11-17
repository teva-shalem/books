import type {UserConfig} from './types/config'

import {configureWebpack, chainWebpack} from './config/webpack'
import {getBaseUrl} from './config/utils'
import {siteTitle, siteDescription} from './config/attrs'
import {markdown} from './config/markdown'
import {extendPageData} from './config/page'
import {head} from './config/head'
import {plugins} from './config/plugins'

const config: UserConfig<object> = {
  title      : siteTitle,
  description: siteDescription,
  theme      : 'derech-hapeima',
  base       : getBaseUrl(),
  dest       : './dist',
  port       : 8082,
  evergreen  : true,
  markdown,
  configureWebpack,
  chainWebpack,
  head,
  plugins,
  extendPageData,
}

export default config
