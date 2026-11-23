<template>
  <article :lang="language" :dir="direction">
    <header v-if="$slots.header">
      <slot name="header" />
    </header>
    <div class="book"><slot /></div>
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
header p {
  line-height: 1.25;
}

@media print {
  p:not(:where(header p)) {
    text-align: justify;
  }
}
</style>
