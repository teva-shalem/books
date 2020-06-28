import VTooltip from 'v-tooltip'
import Buefy from 'buefy'
import './styles/index.scss'
// import 'buefy/src/components/_table.scss'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(VTooltip)
  Vue.use(Buefy)
}
