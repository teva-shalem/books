import type {Config} from 'vuepress/config'
import type {Page} from 'vuepress-types'

export type UserConfig = Config<object> & {
  extendPageData($page: Page): void
}
