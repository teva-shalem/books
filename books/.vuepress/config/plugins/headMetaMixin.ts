import Vue from 'vue'
import {buildHeadMeta} from './headMeta'

const MANAGED_SELECTOR = [
  'link[rel="canonical"]',
  'meta[name="author"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
].join(', ')

export default Vue.extend({
  mounted() {
    this.syncMetaAndLinks()
  },

  watch: {
    '$route.path'() {
      this.syncMetaAndLinks()
      this.syncJsonLd()
    },
  },

  methods: {
    syncMetaAndLinks(): void {
      document.querySelectorAll(MANAGED_SELECTOR).forEach((el) => { el.remove() })

      for (const {tag, attrs} of buildHeadMeta(this.$page)) {
        if (tag === 'script') continue
        const el = document.createElement(tag)
        Object.entries(attrs).forEach(([k, v]) => { el.setAttribute(k, v) })
        document.head.appendChild(el)
      }
    },

    syncJsonLd(): void {
      document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => { el.remove() })

      const scriptEntry = buildHeadMeta(this.$page).find(({tag}) => tag === 'script')
      if (!scriptEntry?.content) return

      const el = document.createElement('script')
      el.setAttribute('type', 'application/ld+json')
      el.textContent = scriptEntry.content
      document.head.appendChild(el)
    },
  },
})
