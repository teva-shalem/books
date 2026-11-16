<template>
  <img :class="[{
         center,
         'disable-zoom'     : noZoom,
         'print-dont-center': printDontCenter,
         'print-fill'       : printFill,
       }]"
       :src="path ? $withBase(`/images/${path}`) : url ? url : ''"
       :alt="alt">
</template>

<script lang="ts">
export default {
  name: 'Pic',

  props: {
    path           : {type: String, default: ''},
    url            : {type: String, default: ''},
    alt            : {type: String, default: ''},
    center         : {type: Boolean},
    noZoom         : {type: Boolean},
    printDontCenter: {type: Boolean},
    printFill      : {type: Boolean},
  },
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
}

.center {
  margin: 0 auto;
  display: block;
}

@media print {
  img {
    max-height: 55vh;
    display: block;
    margin-inline: auto;
  }

  .print-dont-center {
    margin-inline: 0;
  }

  .print-fill {
    max-height: 90vh;
  }
}
</style>
