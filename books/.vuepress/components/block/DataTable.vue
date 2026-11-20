<template>
  <figure>
    <b-field grouped group-multiline class="column-toggles">
      <div v-for="(column, index) in columns" :key="index" class="control">
        <b-checkbox v-model="column.visible">{{ column.title }}</b-checkbox>
      </div>
    </b-field>

    <div :id="href">
      <b-table :data="data" bordered striped hoverable focusable sticky-header>
        <b-table-column v-for="(column, index) in columns" :key="index"
                        :label="`${column.title}:`"
                        :visible="column.visible"
                        :numeric="column.numeric"
                        :centered="column.centered"
                        :sticky="column.sticky"
                        :cell-class="column['cell-class']">
          <template #default="props">
            <div v-if="column.meta && column.meta.type === 'latexImage'"
                 class="field-type-latex-image">
              <Latex :src="props.row[column.field][0]" />
              <Pic :path="props.row[column.field][1]" :alt="props.row[column.field][2]" />
            </div>

            <div v-else-if="column.meta && column.meta.type === 'latex'">
              <Latex :src="props.row[column.field]" />
            </div>

            <div v-else>
              {{ props.row[column.field] === null ? '-' : props.row[column.field] }}
            </div>
          </template>
        </b-table-column>
      </b-table>
    </div>
  </figure>
</template>

<script lang="ts">
import {PropType} from 'vue'

export interface TableColumn {
  'title': string
  'field': string
  'visible': boolean
  'centered'?: boolean
  'sticky'?: boolean
  'numeric'?: boolean
  'cell-class'?: string
  'meta'?: {type: 'latex' | 'latexImage' | (string & unknown)}
}

export type TableCellValue = string | string[] | null
export type TableRow = Record<string, TableCellValue>

export default {
  name: 'DataTable',

  props: {
    href   : {type: String, required: false, default: null},
    data   : {type: Array as PropType<TableRow[]>, required: true},
    columns: {type: Array as PropType<TableColumn[]>, required: true},
  },
}
</script>

<style lang="scss" scoped>
figure {
  margin: 0;
}

:deep(.b-table) {
  .table {
    .is-sticky {
      right: 0;
    }

    th .th-wrap {
      justify-content: center;
    }

    .has-text-centered {
      vertical-align: middle;
      text-align: center;

      @media (width <= 768px), print {
        display: flex;
        align-items: center;
      }
    }

    .right-aligned {
      text-align: right;
      vertical-align: middle;
    }
  }

  > .table-wrapper:not(:last-child) {
    @media (width >= 768px) {
      margin-bottom: 0;
    }
  }

  .table-wrapper.has-mobile-cards tr:not(.detail, .is-empty, .table-footer) {
    td::before {
      margin: auto 0;

      @media (width <= 768px), print {
        text-align: right;
      }
    }

    .right-aligned div {
      @media (width <= 768px), print {
        margin-right: 1em;
      }
    }
  }
}

.bold {
  font-weight: bold;
}

.column-toggles {
  margin-bottom: 3em;

  :deep(.is-grouped-multiline) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .control {
    margin-right: 0.5em;
  }
}

.field-type-latex-image {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 0 1 30%;
  align-items: center;

  @media (width <= 768px), print {
    flex-direction: row;
  }

  > img {
    @media (width <= 768px), print {
      margin-inline: 1em 0;
    }

    @media (width <= 768px) {
      max-width: 50% !important;
    }

    @media print {
      max-width: 75% !important;
    }
  }
}

/* Adapted from ~node_modules/buefy/src/scss/components/_table.scss */

@mixin table-cards {
  :deep(.b-table) {
    .table-wrapper.has-sticky-header {
      height: initial;
      overflow-y: initial;
    }

    .table {
      background-color: transparent;
    }

    thead tr {
      box-shadow: none;
      border-width: 0;
    }

    th {
      display: none;
    }

    tbody tr {
      box-shadow: 0 2px 3px rgba(0,0,0,10%), 0 0 0 1px rgba(0,0,0,10%);
      max-width: 100%;
      position: relative;
      display: block;
    }

    td {
      border: 0;
      display: flex;
      width: auto;
      justify-content: space-between;
      text-align: right;
      border-bottom: 1px solid rgb(245, 245, 245);

      &::before {
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
