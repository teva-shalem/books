<template>
<span>
  <v-popover
    placement="top-end"
    trigger='click'
    :content="this.$slots.default">
    <sup class="tooltip tooltip-target">*</sup>

    <template slot="popover"><slot></slot></template>
  </v-popover>

  <span class="print-footnote-content">[{{ resolvedContent }}]</span>
</span>
</template>

<script lang="ts">
export default {
  name: 'Footnote',
  props: {
    content: {
      type: String,
      required: false,
    },
  },
  computed: {
    resolvedContent() {
      return (this.$slots.default)
        ? this.$slots.default
            .map(vNode => vNode.text || '')
            .join('')
            .replaceAll('\n', ' ')
        : ''
    },
  },
}
</script>

<style lang="stylus">
.v-popover
    display inline

.print-footnote-content
  display none

.tooltip
  cursor pointer
  font-size 1.3em
  line-height 0
  max-width calc(100vw - 10px)
  font-weight 600

  .tooltip-inner
    cursor initial
    font-size 0.7em
    font-weight normal
    line-height 1.2
    background black
    color white
    border-radius 16px
    padding 5px 10px 4px

  .tooltip-arrow
    width 0
    height 0
    border-style solid
    position absolute
    margin 5px
    border-color black
    z-index 1

  &[x-placement^="top"]
    margin-bottom 5px

    .tooltip-arrow
      border-width 5px 5px 0 5px
      border-left-color transparent !important
      border-right-color transparent !important
      border-bottom-color transparent !important
      bottom -5px
      left calc(50% - 5px)
      margin-top 0
      margin-bottom 0

  &[x-placement^="bottom"]
    margin-top 5px

    .tooltip-arrow
      border-width 0 5px 5px 5px
      border-left-color transparent !important
      border-right-color transparent !important
      border-top-color transparent !important
      top -5px
      left calc(50% - 5px)
      margin-top 0
      margin-bottom 0

  &[aria-hidden='true']
    visibility hidden
    opacity 0
    transition opacity .15s, visibility .15s

  &[aria-hidden='false']
    visibility visible
    opacity 1
    transition opacity .15s

@media print
  .v-popover
    display none !important
  
  .print-footnote-content
    display inline
    font-style italic
    font-size 0.8em
</style>
