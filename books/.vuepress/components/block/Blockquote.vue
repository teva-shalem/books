<template>
  <figure class="blockquote-container" itemscope itemtype="https://schema.org/Quotation">
    <blockquote class="blockquote" itemprop="text"><slot /></blockquote>
    <figcaption v-if="$scopedSlots.quoter" class="quoter">
      <span itemprop="author"><slot name="quoter" /></span>
    </figcaption>
  </figure>
</template>

<style lang="scss" scoped>
.blockquote-container {
  margin: 2em 1em 2em 0;

  + .blockquote-container {
    margin-top: -2em;
  }

  &:has(+ .blockquote-container) {
    padding-bottom: 1em;
  }
}

.blockquote {
  margin: 0;
}

.quote {
  font-style: italic;
}

.quoter {
  font-weight: 600;
}

@media print {
  .blockquote-container {
    break-inside: avoid;
  }
}
</style>
