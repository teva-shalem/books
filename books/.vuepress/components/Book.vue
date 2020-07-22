<template>
  <section>
{{content}}
  </section>
</template>

<script lang="ts">
export default {
  props: {
    bookId: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      content: null
    }
  },
  mounted() {
    import('../artifacts/sefer-yetzira/he.ts').then(_ => {this.content = _})
  },
  computed: {
    test() {
      return
    },
  },
}
</script>

<style lang="scss">

</style>
