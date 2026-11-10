<template>
<div class="poem">
<slot></slot>
<p class="poem-decoration-bottom">*</p>
</div>
</template>

<style lang="stylus" scoped>
.poem
  margin-bottom 2em

.poem-decoration-bottom
  line-height 0
  margin-top 1.7em  
</style>