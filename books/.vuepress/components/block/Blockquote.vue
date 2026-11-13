<template>
  <figure class="blockquote-container" itemscope itemtype="https://schema.org/Quotation">
    <blockquote class="blockquote">
      <div class="quote" itemprop="text"><slot></slot></div>
      <figcaption class="quoter" v-if="$scopedSlots.quoter">
        <span itemprop="author"><slot name="quoter"></slot></span>
      </figcaption>
    </blockquote>
  </figure>
</template>

<style lang="stylus" scoped>
.blockquote-container
  margin 2em 1em 2em 0

.blockquote-container + .blockquote-container
  margin-top -2em

.blockquote-container:has(+ .blockquote-container)
  padding-bottom 1em

.blockquote
  margin: 0

.quote
  font-style italic

.quoter
  font-weight 600
</style>
