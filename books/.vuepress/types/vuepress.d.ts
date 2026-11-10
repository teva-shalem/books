declare module 'vuepress' {
  import Vue, { ComponentOptions } from 'vue';
  
  import VueRouter, { RawLocation as RouterRawLocation } from 'vue-router';
  export type Router = VueRouter;
  export type RawLocation = RouterRawLocation;

  export interface EnhanceAppContext {
    Vue: typeof Vue;
    options: ComponentOptions<Vue>;
    router: VueRouter;
    siteData: any;
    isServer: boolean;
  }
  export type EnhanceApp = (context: EnhanceAppContext) => void;
  
  export interface PageData {
    path: string;
    title?: string;
    frontmatter: Record<string, any>;
    headers?: any[];
    [key: string]: any;
  }
}

declare module 'markdown-it-container' {
  import type MarkdownIt from 'markdown-it';
  const container: (md: MarkdownIt, name: string, options?: any) => void;
  export default container;
}
