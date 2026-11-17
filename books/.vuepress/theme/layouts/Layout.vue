<template>
  <div>
    <header><Navbar /></header>

    <main :class="[className, $page.frontmatter.pageClass]" :lang="language" :dir="direction">
      <Content />
    </main>

    <ScrollToTop />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',

  props: {
    className: {type: String, default: null},
  },

  computed: {
    language(): string {
      return this.$page.frontmatter.language || 'he'
    },

    direction(): string {
      return this.language === 'en' ? 'ltr' : 'rtl'
    },
  },
}
</script>
