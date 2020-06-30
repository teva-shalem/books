<template>
  <div v-katex="{ expression: src || '-', options: { 
    throwOnError: true, displayMode: true 
  }}"></div>
</template>

<script lang="ts">
export default {
  props: {
    src: String
  }
};
</script>

<style lang="scss">
.katex-display {
  direction: ltr;
  margin: 0;
}
</style>