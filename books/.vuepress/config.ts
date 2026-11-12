import type { UserConfig } from './types/config'

import { configureWebpack, chainWebpack } from './config/webpack'
import { addPageClass, getBaseUrl } from './config/utils'
import { markdownConfig } from './config/markdown'
import { head } from './config/head'
import { plugins } from './config/plugins'

const config: UserConfig<object> = {
  title: 'טבע שלם - ספרים',
  description: 'הספרים של דוד ישראל כהן - גוף הידע - 1א2',
  theme: 'derech-hapeima',
  base: getBaseUrl(),
  dest: './dist',
  port: 8082,
  evergreen: true,
  head,
  plugins,
  markdown: markdownConfig,
  extendPageData($page) {
    addPageClass($page)
  },
  configureWebpack,
  chainWebpack,
}

export default config
