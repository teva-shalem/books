<template>
  <div class="poem">
    <slot />
    <hr class="decoration-bottom" aria-hidden="true" />
  </div>
</template>

<style lang="scss" scoped>
.poem {
  margin-bottom: 2em;
}

.decoration-bottom {
  line-height: 0;
  margin-top: 1.7em;

  &::after {
    content: "*";
  }
}
</style>
