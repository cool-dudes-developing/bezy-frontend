<template>
  <div class="flex flex-col gap-10">
    <h1 class="text-xl font-bold">{{ table?.name }}
      <small class="font-light text-sm">
        ({{ table?.rows_count }} records)
      </small>
    </h1>
    <table v-if="table" ref="tableElement" class="w-full border-collapse border border-border table-fixed text-sm">
      <thead>
      <tr class="border-b border-border">
        <th v-for="column in table.columns" :key="column.id" class="border-x border-border w-1/6">
          {{ column.name }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row,index) in rows" :key="row.id" :class="[
        getRowState(index)
      ]" tabindex="-1" @click="edit.rowId=index" @keydown.meta.delete="deleteRow(index)">
        <td
          v-for="column in table.columns"
          :key="column.id" :class="[
            getCellState(index,column.id)
          ]" class="border-x border-border overflow-hidden"
          @dblclick="editRecord(index,column.id)">
          <input v-if="edit.rowId === index && edit.columnId === column.id"
                 v-model="row[column.id]"
                 class="w-full text-inherit focus:outline-0 bg-[#1f1e1e]"
                 type="text"
                 @blur="onInputBlur(index,column.id)"
                 @keydown.enter.prevent="editNextRow"
                 @keydown.tab.prevent="editNextInput">
          <span
            v-else
            :class="{
              'opacity-25 font-light': row[column.id] === undefined || row[column.id] === null || row[column.id] === '',
            }"
            class="select-none whitespace-nowrap overflow-ellipsis"
          >
            {{
              row[column.id] === null ? 'NULL' : row[column.id] === undefined || row[column.id] === '' ? 'Empty' : row[column.id]
            }}
          </span>
        </td>
      </tr>
      <tr>
        <td :colspan="table.columns?.length" class="border border-border" @click="addRow">
          <button>
            Add new row
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <database-columns v-if="table?.columns && originalTable" :columns="table.columns" :original-columns="originalTable?.columns"
                      :table-id="table.id" />

<!--    <pre>{{ table?.columns.at(-1) }}</pre>-->

<!--    <pre>{{useRepo(DatabaseTableColumn).all().at(-1)}}</pre>-->
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import DatabaseTable from '@/models/DatabaseTable'
import { useRepo } from 'pinia-orm'
import { onClickOutside, useActiveElement, useMagicKeys, whenever } from '@vueuse/core'
import * as api from '@/utils/api'
import DatabaseColumns from '@/components/DatabaseColumns.vue'
import DatabaseTableColumn from '@/models/DatabaseTableColumn'

const route = computed(() => useRoute())

const activeElement = useActiveElement()
const tableElement = ref<HTMLTableElement | null>(null)
onClickOutside(tableElement, () => {
  edit.value.rowId = -1
  edit.value.columnId = null
})
const table = computed(() => useRepo(DatabaseTable).withAll().find(route.value.params.table as string))
const originalTable = ref(null)
const rows = ref([])
const rowsCopy = ref(JSON.parse(JSON.stringify(rows.value)))
const deleteRows = ref<number[]>([])
const keys = useMagicKeys()

const newAndModifiedRows = computed(() => {
  return rows.value.filter((row, index) => {
    if (index >= rowsCopy.value.length) {
      return true
    } else {
      return Object.keys(row).some(columnId => row[columnId] !== rowsCopy.value[index][columnId])
    }
  })
})

whenever(keys.control_s, () => {
  api.put(`/tables/${route.value.params.table}/rows`, {
    data: newAndModifiedRows.value,
    delete: rowsCopy.value.filter((row, index) => deleteRows.value.includes(index))
  }).then((res) => {
    res.data.data.forEach((row, index) => {
      console.log(newAndModifiedRows.value[index])
      Object.assign(newAndModifiedRows.value[index], row)
      console.log(row)
    })


    rowsCopy.value = JSON.parse(JSON.stringify(rows.value))
    deleteRows.value = []
  })

  Promise.all(
    table.value?.columns.map(column => {
      if (!originalTable.value?.columns.find(originalColumn => originalColumn.id === column.id)) {
        return api.post(`/tables/${route.value.params.table}/columns`, column).then((res) => {
          useRepo(DatabaseTableColumn).where('id', column.id).delete()
          useRepo(DatabaseTableColumn).save(res.data.data)
        })
      }
    }) ?? []
  ).then(() => {
    originalTable.value = JSON.parse(JSON.stringify(table.value))
  })
})

const edit = ref<{ rowId: number, columnId: string | null }>({
  rowId: -1,
  columnId: null
})

function getRowState(rowId: number) {
  if (rowId === edit.value.rowId) {
    return 'bg-secondary-400'
  } else if (rowId >= rowsCopy.value.length) {
    // this is a new row
    return 'bg-green-600'
  } else if (deleteRows.value.includes(rowId)) {
    return 'bg-red-600'
  } else {
    if (rowId % 2 === 0)
      return 'bg-[#1f1e1e]'
    else
      return 'bg-[#2a2a2a]'
  }
}

function getCellState(rowId: number, columnId: string) {
  if (rowId < rowsCopy.value.length && rowsCopy.value[rowId][columnId] !== rows.value[rowId][columnId]) {
    return 'bg-orange-500'
  }
}

function editRecord(rowId: number, columnId: string) {
  edit.value.rowId = rowId
  edit.value.columnId = columnId
  requestAnimationFrame(() => {
    const input = document.querySelector('input')
    input?.focus()
  })
}

function addRow() {
  rows.value.push(Object.fromEntries(table.value.columns.map(column => [column.id, undefined])))
  editRecord(rows.value.length - 1, table.value.columns[0].id)
}

function deleteRow(rowId: number) {
  if (rowId >= rowsCopy.value.length) {
    rows.value.splice(rowId, 1)
  } else {
    deleteRows.value.push(rowId)
    edit.value.rowId++
  }
}

function onInputBlur(rowId: number, columnId: string) {
  if (edit.value.rowId === rowId && edit.value.columnId === columnId) {
    edit.value.columnId = null
  }
}

function editNextInput() {
  if (table.value) {
    const currentColumnIndex = table.value?.columns.findIndex(column => column.id === edit.value.columnId)
    if (currentColumnIndex !== -1) {
      const nextColumn = table.value?.columns[currentColumnIndex + 1]
      if (nextColumn !== undefined) {
        editRecord(edit.value.rowId, nextColumn.id)
      } else {
        const nextRow = rows.value[edit.value.rowId + 1]
        if (nextRow !== undefined) {
          editRecord(edit.value.rowId + 1, table.value?.columns[0].id)
        } else {
          addRow()
        }
      }
    }
  }
}

function editNextRow() {
  if (table.value) {
    const nextRow = rows.value[edit.value.rowId + 1]
    if (nextRow !== undefined) {
      editRecord(edit.value.rowId + 1, table.value?.columns[0].id)
    } else {
      addRow()
    }
  }
}

onMounted(() => {
  DatabaseTable.fetch(route.value.params.project as string, route.value.params.table as string)
    .then(() => {
      table.value?.fetchRows().then(() => {
        rows.value = table.value?.rows ?? []
        rowsCopy.value = JSON.parse(JSON.stringify(rows.value))
        originalTable.value = JSON.parse(JSON.stringify(table.value))
      })
    })
})
</script>

<style scoped>

</style>