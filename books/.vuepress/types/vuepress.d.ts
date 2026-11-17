declare module 'vuepress' {
  import type Vue, {ComponentOptions} from 'vue'
  import type VueRouter, {RawLocation as RouterRawLocation} from 'vue-router'
  import type {Page} from 'vuepress-types'

  export type Router = VueRouter
  export type RawLocation = RouterRawLocation

  export interface EnhanceAppContext {
    Vue: typeof Vue
    options: ComponentOptions<Vue>
    router: VueRouter
    siteData: {pages: Page[]}
    isServer: boolean
  }
  export type EnhanceApp = (context: EnhanceAppContext)=> void
}

declare module 'markdown-it-container' {
  import type MarkdownIt from 'markdown-it'
  const container: (md: MarkdownIt, name: string, options?: unknown)=> void
  export default container
}
