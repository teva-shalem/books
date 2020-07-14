<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://teva-shalem.com/">
        <Img :path="'david-symbol-transparent.png'" no-zoom />טבע שלם
      </a>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  props: {},
}
</script>

<style scoped lang="scss">
.navbar {
  height: 56px;
}
a.navbar-item, .navbar-link {
  font-size: 1.25rem;
  text-decoration: none;
  color: white;
}
.navbar-brand .navbar-item {
  margin-right: 1rem;
}
</style>
