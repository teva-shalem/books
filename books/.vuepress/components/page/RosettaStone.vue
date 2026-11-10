<template>
    <DataTable :data="qualities" :columns="columns" />
</template>

<script lang="ts">
import DataTable from '../block/DataTable.vue'

const {columns} = require('../artifacts/rosetta-stone/columns.json')
const {qualities} = require('../artifacts/rosetta-stone/qualities.json')

export default {
    components: {DataTable},
    data() {
        return {qualities, columns}
    }
}
</script>

<style lang="scss">
</style>
