import Vue from 'vue'
import {buildHeadMeta} from './headMeta'

const MANAGED_SELECTOR = [
  'link[rel="canonical"]',
  'meta[name="author"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'script[type="application/ld+json"]',
].join(', ')

export default Vue.extend({
  mounted() {
    if (!document.querySelector('script[type="application/ld+json"]')) {
      this.syncHead()
    }
  },

  watch: {
    '$route.path'() {
      this.syncHead()
    },
  },

  methods: {
    syncHead(): void {
      document.querySelectorAll(MANAGED_SELECTOR).forEach((el) => { el.remove() })

      const entries = buildHeadMeta(this.$page)

      for (const {tag, attrs, content} of entries) {
        const el = document.createElement(tag)
        Object.entries(attrs).forEach(([k, v]) => { el.setAttribute(k, v) })
        if (content) el.textContent = content
        document.head.appendChild(el)
      }
    },
  },
})
