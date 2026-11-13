declare module 'vue-katex' {
  import {PluginObject} from 'vue'
  const VueKatex: PluginObject<{globalOptions: unknown}>
  export default VueKatex
}

declare module '*.css' {
  const content: Record<string, string>
  export default content
}
