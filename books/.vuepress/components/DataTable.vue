<template>
<section>
  <b-field grouped group-multiline class="column-toggles">
      <div v-for="(column, index) in columnsTemplate"
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
      :focusable="true">

      <template slot-scope="props">
        <b-table-column v-for="(column, index) in columnsTemplate"
            :key="index"
            :label="column.title"
            :visible="column.visible"
            :numeric="column.numeric"
            :centered="column.centered"
            :cell-class="column['cell-class']">
            {{ props.row[column.field] === null ? '-' : props.row[column.field] }}
        </b-table-column>
      </template>
  </b-table>
</section>
</template>

<script lang="ts">
import {data} from '../data/rosetta-stone'

export default {
        data() {
            return {
            data,
                columnsTemplate: [
                    { title: 'איכות', field: 'quality', visible: true },
                    { title: 'ספירה', field: 'sphere', visible: true },
                    { title: 'אות', field: 'hebrew-letter', visible: true },
                    { title: 'ערך מספרי', field: 'numerical-value', visible: true, numeric: true },
                    { title: 'משוואה מתמטית', field: 'mathematical-equation', visible: true },
                    { title: 'ערך גאומטרי', field: 'geometrical-value', visible: true },
                    { title: 'מרכיבי האיכות', field: 'quality-constructs', visible: true, centered: true },
                    { title: 'עולם', field: 'space', visible: true },
                    { title: 'שנה', field: 'time', visible: true },
                    { title: 'נפש', field: 'heart', visible: true },
                    { title: 'תיאור', field: 'description', visible: true, 'cell-class': 'right-aligned' },
                    { title: 'Letter', field: 'english-letter', visible: true },
                    { title: 'Roman', field: 'roman-number', visible: true },
                ]
            }
        }
}
</script>
<style lang="stylus">
.right-aligned {
  text-align: right;
}
.column-toggles {
    display: flex;
    flex-wrap: wrap;
}
</style>
