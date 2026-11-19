import type {UserConfig} from './types/config'

import {configureWebpack, chainWebpack} from './config/webpack'
import {getBaseUrl} from './config/baseUrl'
import {siteTitle, siteDescription} from './config/attrs'
import {markdown} from './config/markdown'
import {extendPageData} from './config/page'
import {head} from './config/head'
import {plugins} from './config/plugins'

const config: UserConfig = {
  dest     : './dist',
  base     : getBaseUrl(),
  port     : 8082,
  evergreen: true,
  theme    : 'derech-hapeima',
  locales  : {'/': {
    lang       : 'he',
    title      : siteTitle,
    description: siteDescription,
  }},
  markdown,
  configureWebpack,
  chainWebpack,
  head,
  plugins,
  extendPageData,
}

export default config
