<template>
  <span itemscope itemtype="https://schema.org/Quotation">
    <q class="quote" itemprop="text"><slot /></q>
    <cite v-if="from">&nbsp;(<span itemprop="isPartOf">{{ from }}</span>)</cite>
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
