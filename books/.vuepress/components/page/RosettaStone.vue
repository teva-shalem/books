<template>
  <DataTable :href="href" :data="qualities" :columns="columns" />
</template>

<script lang="ts">
import DataTable from '../block/DataTable.vue'

import {columns} from '../../artifacts/rosetta-stone/columns.json'
import {qualities} from '../../artifacts/rosetta-stone/qualities.json'

export default {
  name      : 'RosettaStone',
  components: {DataTable},

  props: {
    href: {type: String, required: false, default: null},
  },

  data() {
    return {qualities, columns}
  },
}
</script>
