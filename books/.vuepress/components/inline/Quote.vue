<template>
  <span itemscope itemtype="https://schema.org/Quotation"><q
    class="quote" itemprop="text"><slot></slot></q><span
      v-if="quoter"> (<span class="quoter" itemprop="author">{{ quoter }}</span>)</span>
  </span>
</template>

<script lang="ts">
export default {
  props: {
    quoter: {
      type   : String,
      default: '',
    },
  },
}
</script>

<style lang="stylus" scoped>
.quote
  font-style italic

.quote::before, .quote::after
    content '׳'
</style>
