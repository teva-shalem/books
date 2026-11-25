<template>
  <a :href="$withBase(to)" :target="external ? '_blank' : undefined"><slot /></a>
</template>

<script lang="ts">
export default {
  name: 'Go',

  props: {
    to      : {type: String, default: ''},
    external: {type: Boolean},
  },
}
</script>
