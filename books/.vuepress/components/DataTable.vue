<template>
    <section>
        <b-field grouped group-multiline class="column-toggles">
            <div v-for="(column, index) in columns"
                 :key="index"
                 class="control">
                <b-checkbox v-model="column.visible">
                    {{ column.title }}
                </b-checkbox>
            </div>
        </b-field>

        <b-table
                :data="data"
                :bordered="true"
                :striped="true"
                :narrowed="false"
                :hoverable="true"
                :focusable="true"
                :sticky-header="true">

            <template slot-scope="props">
                <b-table-column v-for="(column, index) in columns"
                                :key="index"
                                :label="column.title"
                                :visible="column.visible"
                                :numeric="column.numeric"
                                :centered="column.centered"
                                :sticky="column.sticky"
                                :cell-class="column['cell-class']">
                    {{ props.row[column.field] === null ? '-' : props.row[column.field] }}
                </b-table-column>
            </template>
        </b-table>
    </section>
</template>

<script lang="ts">
export default {
    props: {
        data   : {type: Array, required: true},
        columns: {type: Array, required: true},
    }
}
</script>
<style lang="scss">
.b-table .table td.is-sticky,
.b-table .table th.is-sticky {
    right: 0;
}

.right-aligned {
    text-align: right;
}

.column-toggles {
    display: flex;
    flex-wrap: wrap;
}
</style>
