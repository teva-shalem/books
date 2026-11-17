import type {Config} from 'vuepress/config'
import type {Page} from 'vuepress-types'

export type UserConfig<T> = Config<T> & {
  extendPageData($page: Page): void
}
