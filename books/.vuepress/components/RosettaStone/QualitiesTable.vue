<template>
    <div id="table-of-qualities">
        <DataTable :data="qualities" :columns="columns" class="regular-layout" />
    </div>
</template>

<script lang="ts">
import DataTable from '../DataTable.vue'

const {columns} = require('../../artifacts/rosetta-stone/columns.json')
const {qualities} = require('../../artifacts/rosetta-stone/qualities.json')

export default {
    components: {DataTable},
    data() {
        return {qualities, columns}
    }
}
</script>

<style lang="scss">
</style>
