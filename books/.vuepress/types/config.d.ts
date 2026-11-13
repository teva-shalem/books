import type {Config as OfficialConfig} from 'vuepress/config'
import type {PageData} from 'vuepress'

export type UserConfig<T> = OfficialConfig<T> & {
  extendPageData($page: PageData): void
}
