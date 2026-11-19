import type {Config} from 'vuepress/config'

import {configureWebpack, chainWebpack} from './config/webpack'
import {getBaseUrl} from './config/baseUrl'
import {siteTitle, siteDescription} from './config/attrs'
import {markdown} from './config/markdown'
import {head} from './config/head'
import {plugins} from './config/plugins'

const config: Config<object> = {
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
}

export default config
