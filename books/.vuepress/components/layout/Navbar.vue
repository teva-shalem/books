<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://tevashalem.com/">
        <Pic path="david-symbol-transparent.png" alt="דלת אפס נקודה" no-zoom />טבע שלם
      </a>
      <!-- <Go to="/intro/" class="navbar-link is-arrowless">מבוא</Go> -->
      <!-- <Go to="/" class="navbar-link is-arrowless">ספרים</Go> -->
    </div>

    <div v-if="showPrintButton" class="navbar-left">
      <ButtonPrint />
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Navbar',

  computed: {
    showPrintButton(): boolean {
      return process.env.NODE_ENV === 'production'
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  align-items: center;
}

.navbar-item, .navbar-link {
  font-size: 1.25rem;
  text-decoration: none;
  color: white;

  &:hover, &:focus {
    background-color: initial;
    color: white;
  }
}

.navbar-left {
  margin-left: 1rem;
}
</style>
