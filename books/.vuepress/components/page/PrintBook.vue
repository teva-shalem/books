<template>
  <div>
    <article v-for="page in orderedPages"
             :key="page.path"
             :class="getPageClasses(page)">
      <PageContainer :page="page">
        <Content :page-key="page.key" />
      </PageContainer>
    </article>
  </div>
</template>

<script lang="ts">
import {PageComputed} from 'vuepress-types'
import PageContainer from './PageContainer.vue'

const PRINT_CONFIG = {
  LOAD_TIMEOUT_MS: 3000,
  SETTLE_DELAY_MS: 1000,
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
        .filter(path => path !== undefined)
    },
  },

  mounted() {
    this.$nextTick().then(() => {
      const triggerPrintWhenReady = async() => {
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

  methods: {
    getPageClasses(page: PageComputed) {
      const classes = []

      if (page.frontmatter.layout) {
        classes.push(page.frontmatter.layout
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase()
          .replace(/\s+/g, '-'))
      }

      if (page.frontmatter.pageClass) {
        classes.push(page.frontmatter.pageClass
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
}
</script>

<style lang="scss" scoped>
article {
  break-after: page;

  &:last-child {
    break-after: avoid;
  }
}
</style>
