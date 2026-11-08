<template>
  <button @click="onClick" class="print-button">🖨️</button>
</template>

<script lang="ts">
export default {
  name: 'ButtonPrint',
  methods: {
    isHome() {
      return this.$page.path === '/'
    },
    onClick() {
      if (process.env.NODE_ENV === 'development') {
        this.triggerPrint()
      } else {
        this.triggerPdf()
      }
    },
    triggerPrint() {
      if (this.isHome()) {
        this.$router.push('/tevadynamica/');
      } else {
        window.print();
      }
    },
    triggerPdf() {
      if (this.isHome()) {
        this.openPdfExternally('/tevadynamica.pdf')
      } else {
        this.openPdfExternally(`${this.$page.path.replace(/\/$/, "")}.pdf`)
      }
    },
    openPdfExternally(url) {
      const absoluteUrl = new URL(this.$withBase(url), window.location.href).href;

      const link = document.createElement('a');
      link.href = absoluteUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>

<style lang="scss" scoped>
.print-button {
  padding: 0.6rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.print-button:hover {
  background-color: white;
}
</style>