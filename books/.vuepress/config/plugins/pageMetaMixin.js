export default {
  created() {
    if (this.$ssrContext && this.$page && this.$page.jsonLd) {
      const escapedJson = JSON.stringify(this.$page.jsonLd).replace(/</g, '\\u003c')
      this.$ssrContext.userHeadTags = `${this.$ssrContext.userHeadTags || ''}\n    <script type="application/ld+json">${escapedJson}</script>`
    }
  },
}
