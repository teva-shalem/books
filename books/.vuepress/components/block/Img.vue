<template>
  <img :class="noZoom ? '' : 'img'"
       :src="path ? $withBase('/images/' + path) : url ? url : ''"
       :alt="alt">
</template>

<script lang="ts">
export default {
  props: {
    path  : {type: String, default: ''},
    url   : {type: String, default: ''},
    alt   : {type: String, default: ''},
    noZoom: {type: Boolean, default: false},
  },
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
}
</style>
