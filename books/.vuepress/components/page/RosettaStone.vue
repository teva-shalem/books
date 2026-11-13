<template>
    <DataTable :data="qualities" :columns="columns" />
</template>

<script lang="ts">
import DataTable from '../block/DataTable.vue'

import {columns} from '../../artifacts/rosetta-stone/columns.json'
import {qualities} from '../../artifacts/rosetta-stone/qualities.json'

export default {
  components: {DataTable},
  data() {
    return {qualities, columns}
  },
}
</script>

<style lang="scss">
</style>
