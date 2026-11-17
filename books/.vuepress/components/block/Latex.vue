<template>
  <div v-katex="katexConfig" lang="en" />
</template>

<script lang="ts">
import {KatexOptions} from 'katex'

const IGNORED_KATEX_ERRORS = new Set([
  'newLineInDisplayMode',
  'symbolNotInFont',
  'unknownSymbol',
])

export default {
  name: 'Latex',

  props: {
    src: {type: String, required: false, default: null},
  },

  computed: {
    katexConfig(): {expression: string; options: KatexOptions} {
      return {
        expression: this.src || '-',
        options   : {
          throwOnError: true,
          displayMode : true,
          strict      : (errorCode: string) => {
            return IGNORED_KATEX_ERRORS.has(errorCode) ? 'ignore' : 'warn'
          },
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped>
:deep(.katex-display) {
  margin: 0;
}

:deep(.katex .text) {
  font-family: var(--font-serif);
  direction: rtl;
  unicode-bidi: isolate;
}
</style>
