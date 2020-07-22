<template>
  <section>
    <Navbar></Navbar>

    <div class="main-container" :class="className">
      <Content/>
      <ScrollToTop/>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  props: {
    className: String,
  },
}
</script>

<style lang="scss">
@import 'styles/theme';
</style>
