<template>
  <div>
    <header><Navbar /></header>
    <main :class="[className, $page.frontmatter.pageClass]"><Content /></main>
    <ScrollToTop />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',

  props: {
    className: {type: String, default: null},
  },
}
</script>
