<template>
<img
  :class="noZoom ? '' : 'img'"
  :src="path ? $withBase('/images/' + path) : url ? url : ''"
  :alt="alt">
</template>

<script lang="ts">
export default {
  props: {
    path: {type: String},
    url: {type: String},
    alt: {type: String},
    noZoom: {type: Boolean},
  },
}
</script>

<style lang="stylus" scoped>
img
  max-width 100%
</style>
