<template>
  <blockquote class="blockquote">
    <div class="quote"><slot></slot></div>
    <footer class="quoter"><slot name="quoter"></slot></footer>
  </blockquote>
</template>

<style lang="stylus" scoped>
.blockquote
  margin: 2em 1em 2em 0
  
.blockquote + .blockquote
  margin-top -2em

.blockquote:has(+ .blockquote)
  padding-bottom 1em
  
.quote
  font-style italic 

.quoter
  font-weight 600
</style>