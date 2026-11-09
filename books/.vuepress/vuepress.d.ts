declare module 'vuepress' {
  import Vue, { ComponentOptions } from 'vue';
  import VueRouter, { Route } from 'vue-router';

  export interface EnhanceAppContext {
    Vue: typeof Vue;
    options: ComponentOptions<Vue>;
    router: VueRouter;
    siteData: any;
    isServer: boolean;
  }

  export type EnhanceApp = (context: EnhanceAppContext) => void;
  export type Router = VueRouter;
}
