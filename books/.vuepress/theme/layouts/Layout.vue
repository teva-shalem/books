<template>
  <div>
    <header><Navbar /></header>
    <main class="layout" :class="[$page.frontmatter.pageClass]"><Content /></main>
    <ScrollToTop />
  </div>
</template>
