<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://tevashalem.com/">
        <Img :path="'david-symbol-transparent.png'" alt="דלת אפס נקודה" no-zoom />טבע שלם
      </a>
    </div>
    <div class="navbar-left">
      <ButtonPrint></ButtonPrint>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  props: {},
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a.navbar-item, .navbar-link {
  font-size: 1.25rem;
  text-decoration: none;
  color: white;
}

.navbar-left {
  margin-left: 1rem;
}
</style>
