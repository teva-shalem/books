<template>
<dl>
  <template v-for="def in definitions">
    <dt>{{def[0]}}</dt>
    <dd v-if="def[1]">{{def[1]}}</dd>
  </template>
</dl>
</template>

<script lang="ts">
export default {
  props: {
    definitions: {type: Array, required: true}
  }
}
</script>
<style lang="stylus" scoped>

</style>