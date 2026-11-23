<template>
  <button type="button" class="print-button" @click="openPdf">🖨️</button>
</template>

<script lang="ts">
export default {
  name: 'ButtonPrint',

  methods: {
    openPdf() {
      if (this.$page.path === '/') {
        window.location.href = this.$withBase('/pdfs/tevadynamica.pdf')
      } else {
        window.location.href = this.$withBase(`/pdfs${this.$page.path.replace(/\/$/, '')}.pdf`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.print-button {
  padding: 0.6rem;
  background-color: rgba(255, 255, 255, 20%);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0, 10%);

  &:hover {
    background-color: white;
  }
}
</style>
