import type { EnhanceApp } from 'vuepress'
import VTooltip from 'v-tooltip'
import Buefy from 'buefy'
import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css'

import { handleScroll } from './theme/utils/scrollHandler'
import { handleZoom } from './theme/utils/zoomHandler'
import { handleCaption } from './theme/utils/captionHandler'

const enhanceApp: EnhanceApp = ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  isServer,
}) => {
  Vue.use(VTooltip)
  Vue.use(Buefy)
  Vue.use(VueKatex, {
    globalOptions: {}
  })

  if (isServer) return

  handleScroll(router)
  handleZoom(router)
  handleCaption()
}

export default enhanceApp
