<template>
  <span itemscope itemtype="https://schema.org/Quotation">
    <q class="quote" itemprop="text"><slot /></q>
    <span v-if="from">&nbsp;(<span itemprop="author">{{ from }}</span>)</span>
  </span>
</template>

<script lang="ts">
export default {
  name: 'Quote',

  props: {
    from: {
      type   : String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.quote {
  font-style: italic;

  &::before, &::after {
    content: "׳";
  }
}
</style>
