<template>
  <a :href="$withBase(href)"><slot /></a>
</template>

<script lang="ts">
export default {
  props: {
    href: {type: String, default: ''},
  },
}
</script>

<style lang="scss" scoped>
</style>
