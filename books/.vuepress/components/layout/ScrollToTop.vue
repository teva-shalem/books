<template>
<div id="scroll-to-top">
  <BackToTop />
</div>
</template>

<style lang="stylus">
#app .go-to-top
  left 2.5rem
  right auto

@media (max-width: 959px) {
  #app .go-to-top {
    display: block;
  }
}
</style>