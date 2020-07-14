<template>
<img :class="noZoom ? '' : 'img'" :src="path ? $withBase('/images/' + path) : url ? url : ''">
</template>

<script lang="ts">
export default {
  props: {
    path: {type: String},
    url: {type: String},
    noZoom: {type: Boolean}
  },
}
</script>

<style lang="stylus">
img
  max-width 100%
</style>
