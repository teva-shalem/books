<template>
  <section>
    <Navbar></Navbar>

    <div class="main-container" :class="className" :data-font="font">
      <Content/>
      <ScrollToTop/>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { ComponentOptions } from 'vue'

interface LayoutComponent extends Vue {
  font?: string
  className: string
}

const Layout: ComponentOptions<Vue> = {
  name: 'Layout',
  props: {
    className: String
  },
  computed: {
      font(this: LayoutComponent): string | null {
        return this.$frontmatter.customFont
      }
  },
}

export default Layout
</script>

<style lang="scss">
@import 'styles/theme';
</style>
