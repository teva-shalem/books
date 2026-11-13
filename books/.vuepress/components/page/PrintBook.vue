<template>
  <div>
    <div 
      v-for="page in orderedPages" 
      :key="page.path" 
      :class="getPageClasses(page)">
      <PageContainer :page="page">
        <Content :page-key="page.key" />
      </PageContainer>
    </div>
  </div>
</template>

<script>
const PRINT_CONFIG = {
  LOAD_TIMEOUT_MS: 3000,
  SETTLE_DELAY_MS: 1000,
}

const PageContainer = {
  name: 'PageContainer',
  props: ['page'],
  provide() {
    return {
      pageContext: this.page,
    }
  },
  render(h) {
    return h('div', this.$slots.default)
  },
}

export default {
  name: 'PrintBook',
  components: {
    PageContainer,
  },
  computed: {
    orderedPages() {
      const customOrder = [
        '/',
        // '/intro/',
        '/derech-hapeima/',
        '/sipur-hayahhid/',
        '/sod-haiibur/',
        '/sefer-yetzira/',
        '/composition-book/',
        '/mishvaot-hapeima/',
        '/rosetta-stone/',
        '/slideshow/',
      ]

      return customOrder
        .map(path => this.$site.pages.find(p => p.path === path))
        .filter(Boolean)
    },
  },
  methods: {
    getPageClasses(page) {
      const classes = ['print-book']
      if (!page.frontmatter) return classes

      if (page.frontmatter.pageClass) {
        classes.push(page.frontmatter.pageClass
          .toLowerCase()
          .replace(/\s+/g, '-'))
      }

      if (page.frontmatter.layout) {
        classes.push(page.frontmatter.layout
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase()
          .replace(/\s+/g, '-'))
      }

      return classes
    },
    waitForContentLoaded() {
      return new Promise((resolve) => {
        setTimeout(resolve, PRINT_CONFIG.LOAD_TIMEOUT_MS)
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      const triggerPrintWhenReady = async () => {
        await this.waitForContentLoaded()

        setTimeout(() => {
          const handleAfterPrint = () => {
            window.removeEventListener('afterprint', handleAfterPrint)

            if (window.history.length > 1) {
              this.$router.back()
            } else {
              this.$router.push('/')
            }
          }

          window.addEventListener('afterprint', handleAfterPrint)
          window.print()
        }, PRINT_CONFIG.SETTLE_DELAY_MS)
      }

      triggerPrintWhenReady()
    })
  },
}
</script>

<style lang="scss" scoped>
.print-book {
  break-after: page;

  &:last-child {
    break-after: avoid;
  }
}
</style>
