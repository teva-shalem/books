import 'katex/dist/katex.min.css'
import './theme/styles/theme.scss'

import type {EnhanceApp} from 'vuepress'
import VTooltip from 'v-tooltip'
import Buefy from 'buefy'
import VueKatex from 'vue-katex'

import {handleScroll} from './handlers/scroll'
import {handleZoom} from './handlers/zoom'
import {handleCaption} from './handlers/caption'

const enhanceApp: EnhanceApp = ({
  Vue,
  router,
  isServer,
}) => {
  Vue.use(VTooltip)
  Vue.use(Buefy)
  Vue.use(VueKatex, {
    globalOptions: {},
  })

  if (isServer || typeof window === 'undefined') return

  handleScroll(router)
  handleZoom(router)
  handleCaption()
}

export default enhanceApp
