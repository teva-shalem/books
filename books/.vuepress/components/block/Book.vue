<template>
  <article :lang="language" :dir="direction">
    <header v-if="$slots.header">
      <slot name="header" />
    </header>
    <slot />
  </article>
</template>

<script lang="ts">
export default {
  name: 'Layout',

  computed: {
    language(): string {
      return this.$page.frontmatter.language === 'english' ? 'en' : 'he'
    },

    direction(): string {
      return this.language === 'english' ? 'ltr' : 'rtl'
    },
  },
}
</script>

<style lang="scss" scoped>
@media print {
  p {
    text-align: justify;
  }
}
</style>
