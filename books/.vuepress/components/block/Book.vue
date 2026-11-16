<template>
  <article>
    <header v-if="$slots.header">
      <slot name="header" />
    </header>
    <slot />
  </article>
</template>

<style lang="scss" scoped>
@media print {
  header h1 {
    break-before: avoid;
  }

  p {
    text-align: justify;
  }
}
</style>
