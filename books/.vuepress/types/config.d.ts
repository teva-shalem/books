import type { Config as OfficialConfig } from 'vuepress/config'

export type UserConfig<T> = OfficialConfig<T> & {[key: string]: any}
