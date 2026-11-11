declare module 'vuepress' {
  import Vue, { ComponentOptions } from 'vue'
  
  import VueRouter, { RawLocation as RouterRawLocation } from 'vue-router'
  export type Router = VueRouter
  export type RawLocation = RouterRawLocation

  export interface EnhanceAppContext {
    Vue: typeof Vue;
    options: ComponentOptions<Vue>;
    router: VueRouter;
    siteData: unknown;
    isServer: boolean;
  }
  export type EnhanceApp = (context: EnhanceAppContext) => void
  
  export interface PageData {
    path: string;
    frontmatter: Record<string, string>;
  }
}

declare module 'markdown-it-container' {
  import type MarkdownIt from 'markdown-it'
  const container: (md: MarkdownIt, name: string, options?: unknown) => void
  export default container
}
