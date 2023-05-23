<template>
  <div class="flex flex-col gap-2.5 py-5 px-2.5">
    <div class="flex flex-col gap-2.5 p-2.5">
      <header class="h-12 font-header text-3xl font-bold text-pink">Methods</header>
      <table class="table-fixed border-separate border border-border rounded-lg">
        <tr class="bg-background-300 border border-border">
          <th>Name</th>
          <th>Updated</th>
          <th>Fields</th>
          <th>Blocks</th>
        </tr>
        <template v-if="!pageSpinner?.visible.value">
          <tr class="bg-background-400 border border-border">
            <td>Get users</td>
            <td>20/03/2023, 04:20:13</td>
            <td>In: 0; Out: 1</td>
            <td>3</td>
          </tr>
          <tr class="bg-background-400 border border-border">
            <td>Get users by id</td>
            <td>21/04/2024, 05:21:14</td>
            <td>In: 1; Out: 1</td>
            <td>2</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRepo } from 'pinia-orm'
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import Project from '@/models/Project'
import { PageSpinnerKey } from '@/symbols'

const route = computed(() => useRoute())

const pageSpinner = inject(PageSpinnerKey)
pageSpinner?.show()
setTimeout(() => {
  pageSpinner?.hide()
}, 1000)

const methods = computed(() =>
  useRepo(Project)
    .with('methods')
    .find(route.value.params.project as string)
)
</script>

<style>
th,
td {
  text-align: left;
  padding: 10px 12px;
}
</style>
