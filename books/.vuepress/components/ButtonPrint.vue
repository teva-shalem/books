<template>
  <button @click="triggerPrint" class="print-button">🖨️</button>
</template>

<script lang="ts">
export default {
  name: 'ButtonPrint',
  methods: {
    triggerPrint() {
      if (this.$page.path === '/') {
        this.$router.push('/tevadynamica/');
      } else {
        window.print();
      }
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