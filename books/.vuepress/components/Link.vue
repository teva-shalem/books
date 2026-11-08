<template>
<a :href="$withBase(href)"><slot></slot></a>
</template>

<script lang="ts">
export default {
  props: {
    href: {type: String},
  },
}
</script>

<style lang="stylus" scoped>
</style>
