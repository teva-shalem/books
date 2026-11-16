<template>
  <figure class="blockquote-container" itemscope itemtype="https://schema.org/Quotation">
    <blockquote class="blockquote" itemprop="text"><slot /></blockquote>
    <figcaption v-if="$scopedSlots.by || $scopedSlots.from" class="attribution">
      <span v-if="$scopedSlots.by" itemprop="author"><slot name="by" /></span>
      <template v-if="$scopedSlots.by && $scopedSlots.from"><br /></template>
      <cite v-if="$scopedSlots.from" itemprop="isPartOf"><slot name="from" /></cite>
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

.attribution {
  font-weight: 600;
}

@media print {
  .blockquote-container {
    break-inside: avoid;
  }
}
</style>
