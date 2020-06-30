import VTooltip from 'v-tooltip'
import Buefy from 'buefy'
import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(VTooltip)
  Vue.use(Buefy)
  Vue.use(VueKatex, {
    globalOptions: {
      //... Define globally applied KaTeX options here
    }
  });
}
