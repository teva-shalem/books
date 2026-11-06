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

        <div :id="id || ''">
            <b-table
                :data="data"
                :bordered="true"
                :striped="true"
                :narrowed="false"
                :hoverable="true"
                :focusable="true"
                :sticky-header="true">
                <b-table-column v-for="(column, index) in columns"
                                :key="index"
                                :label="column.title + ':'"
                                :visible="column.visible"
                                :numeric="column.numeric"
                                :centered="column.centered"
                                :sticky="column.sticky"
                                :cell-class="column['cell-class']">
                    <template v-slot="props">
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
                    </template>
                </b-table-column>
            </b-table>
        </div>
    </section>
</template>

<script lang="ts">
export default {
    props: {
        id     : String,
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

.b-table > .table-wrapper:not(:last-child) {
    @media (min-width: 768px) {
        margin-bottom: 0;
    }
}

.b-table .table-wrapper.has-mobile-cards tr:not(.detail):not(.is-empty):not(.table-footer) td {
    &::before {
        margin: auto 0;

        @media (max-width: 768px), print {
            text-align: right;
        }
    }

    &.right-aligned div {
        @media (max-width: 768px), print {
            margin-right: 1em;
        }
    }
}

.table td.has-text-centered {
    vertical-align: middle;
    text-align: center;

    @media (max-width: 768px), print {
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
    margin-bottom: 3em;

    & .is-grouped-multiline {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    & .control {
        margin-right: 0.5em;
    }
}

.katex-display {
    direction: ltr;
    
    @media (max-width: 768px), print {
        margin: 0;
    }
}

.field-type-latex-image {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 0 1 30%;
    align-items: center;

    @media (max-width: 768px), print {
        flex-direction: row;
    }
}
.field-type-latex-image > img {
    margin-inline: 1em 0;

    @media (max-width: 768px) {
        max-width: 50% !important;
    }
    @media print {
        max-width: 75% !important;
    }
}

/* Adapted from ~node_modules/buefy/src/scss/components/_table.scss */
@mixin table-cards {
    .b-table .table-wrapper {
        &.has-sticky-header {
            height: initial;
            overflow-y: initial;
        }
    }

    .table {
        background-color: transparent;
    }

    thead {
        tr {
            box-shadow: none;
            border-width: 0;
            th {
                display: none;
            }
        }
    }

    tr {
        box-shadow: 0 2px 3px rgba(black, 0.1), 0 0 0 1px rgba(black, 0.1);
        max-width: 100%;
        position: relative;
        display: block;
        td {
            border: 0;
            
            display: flex;
            width: auto;
            justify-content: space-between;
            text-align: right;
            border-bottom: 1px solid hsl(0, 0%, 96%);
            &:before {
                content: attr(data-label);
                font-weight: 600;
                padding-right: 0.5em;
                text-align: left;
            }
            &:last-child {
                border-bottom: 0;
            }
        }
        &:not(:last-child) {
            margin-bottom: 1rem;
        }
        &:not([class*="is-"]) {
            background: white;
            &:hover {
                background-color: white;
            }
        }
    }
}

@media print {
    @include table-cards;
}
</style>
