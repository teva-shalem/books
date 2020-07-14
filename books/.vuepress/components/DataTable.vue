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
                :id="id || ''"
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
                                :label="column.title + ':'"
                                :visible="column.visible"
                                :numeric="column.numeric"
                                :centered="column.centered"
                                :sticky="column.sticky"
                                :cell-class="column['cell-class']">
                    <div v-if="column.meta && column.meta.type === 'latexImage'" class="field-type-latex-image">
                        <Latex :src="props.row[column.field][0]"/>
                        <Img :path="props.row[column.field][1]"/>
                    </div>
                    <div v-else-if="column.meta && column.meta.type === 'latex'">
                        <Latex :src="props.row[column.field]"/>
                    </div>
                    <div v-else>
                        {{ props.row[column.field] === null ? '-' : props.row[column.field] }}
                    </div>
                </b-table-column>
            </template>
        </b-table>
    </section>
</template>

<script lang="ts">
export default {
    props: {
        id: String,
        data   : {type: Array, required: true},
        columns: {type: Array, required: true},
    },
}
</script>

<style lang="scss">
.b-table .table td.is-sticky,
.b-table .table th.is-sticky {
    right: 0;
}

.b-table .table th .th-wrap {
    justify-content: center;
}

.b-table .table-wrapper.has-mobile-cards tr:not(.detail):not(.is-empty):not(.table-footer) td {
    &::before {
        margin: auto 0;

        @media (max-width: 768px) {
            text-align: right;
        }
    }

    &.right-aligned div {
        @media (max-width: 768px) {
            margin-right: 1em;
        }
    }
}

.table td.has-text-centered {
    vertical-align: middle;
    text-align: center;
    @media (max-width: 768px) {
        display: flex;
        align-items: center;
    }
}

.table td.right-aligned {
    text-align: right;
    vertical-align: middle;
}

.bold {
    font-weight: bold;
}

.column-toggles {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 3em;

    & > .control {
        margin-right: 0.5em;
    }
}

.field-type-latex-image {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 0 1 30%;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: row;

        & > img {
            max-width: 30%;
            margin-right: 1em;
        }
    }
}
</style>
