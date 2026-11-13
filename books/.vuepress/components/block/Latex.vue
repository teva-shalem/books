<template>
  <div v-katex="{ expression: src || '-', options: {
    throwOnError: true, displayMode: true,
    strict: errorCode => ['newLineInDisplayMode', 'symbolNotInFont', 'unknownSymbol']
      .includes(errorCode) ? 'ignore' : 'warn',
  }}"></div>
</template>

<script lang="ts">
export default {
  props: {
    src: String,
  },
}
</script>

<style lang="scss" scoped>
:deep(.katex-display) {
  direction: ltr;
  margin: 0;
}

:deep(.katex .text) {
  font-family: 'Shofar';
  direction: rtl;
  unicode-bidi: isolate;
}
</style>
