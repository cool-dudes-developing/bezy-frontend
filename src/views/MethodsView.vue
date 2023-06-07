<template>
  <div :class="methods?.length != 0 ? NormalStateClass : EmptyStateClass">
    <div class="flex flex-col gap-2.5 p-2.5">
      <header
        v-if="(methods as Method[]).length != 0"
        class="h-12 font-header text-3xl font-bold text-pink"
      >
        Methods
      </header>
      <TableComponent v-if="(methods as Method[]).length != 0">
        <template #headers>
          <th>Name</th>
          <th>Updated</th>
          <th>Fields</th>
          <th>Blocks</th>
        </template>
        <template #main>
          <tr
            class="bg-background-400 border border-border hover:bg-background-500 cursor-pointer"
            @click="$router.push({ name: 'method', params: { method: method.id } })"
            v-for="method in methods"
            :key="method.id"
          >
            <td>{{ method.name }}</td>
            <td>20/03/2023, 04:20:13</td>
            <td>In: 0; Out: 1</td>
            <td></td>
          </tr>
        </template>
      </TableComponent>
      <div v-else class="flex flex-col w-fit gap-2">
        <p>It seems like you have no methods!</p>
        <router-link
          :to="{ name: 'methodCreate' }"
          class="flex h-8 justify-center items-center button"
          >Create new method</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRepo } from 'pinia-orm'
import { computed, inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import Project from '@/models/Project'
import { PageSpinnerKey } from '@/symbols'
import TableComponent from '@/components/TableComponent.vue'
import Method from '@/models/Method'

const route = computed(() => useRoute())

const pageSpinner = inject(PageSpinnerKey)

pageSpinner?.show()
Method.fetchAll(route.value.params.project as string)
  .then(() => console.log(route.value))
  .finally(() => pageSpinner?.hide())

const methods = computed(
  () =>
    useRepo(Project)
      .with('methods')
      .find(route.value.params.project as string)?.methods
)

const EmptyStateClass = ref('flex flex-col justify-center items-center gap-2.5 py-5 px-2.5 h-full')
const NormalStateClass = ref('flex flex-col gap-2.5 py-5 px-2.5')
</script>

<style>
th,
td {
  text-align: left;
  padding: 10px 12px;
}
</style>
