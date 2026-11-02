<template>
  <figure class="blockquote-container">
    <blockquote class="blockquote">
      <div class="quote"><slot></slot></div>
      <figcaption class="quoter" v-if="$scopedSlots.quoter">
        <cite><slot name="quoter"></slot></cite>
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
  padding-bottom 2em

.blockquote
  margin: 0

.quote
  font-style italic 

.quoter
  font-weight 600
</style>