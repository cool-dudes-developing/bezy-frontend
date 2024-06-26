<template>
  <div v-if="project">
    <header class="h-12 font-header text-3xl font-bold text-pink">{{ project.name }}</header>

    <div class="flex flex-row gap-2">
      <div>
        <header class="h-10 font-header text-2xl font-bold text-pink">Methods</header>
        <TableComponent>
          <TableHeaderRow>
            <th>Name</th>
            <th>Updated</th>
            <th>Fields</th>
            <th>Blocks</th>
          </TableHeaderRow>
          <!-- <template v-if="!pageSpinner?.visible.value"> -->
            <TableRow
              v-for="method in project.methods"
              :key="method.id"
              @click="
                $router.push({
                  name: 'method',
                  params: { method: method.id }
                })
              "
            >
              <td>{{ method.name }}</td>
              <td>20/03/2023</td>
              <td>In: 0; Out: 1</td>
              <td>{{ method.blocks?.length ?? 0 }}</td>
            </TableRow>
            <TableRow
              @click="$router.push({ name: 'methodCreate' })"
            >
              <td class="text-center text-blue font-bold" colspan="4">Create new method</td>
          </TableRow>
        <!-- </template> -->
        </TableComponent>
      </div>
      <div>
        <header class="h-10 font-header text-2xl font-bold text-pink">Endpoints</header>
        <TableComponent>
          <TableHeaderRow>
            <th>Endpoint</th>
            <th>Logic method</th>
            <th>Type</th>
            <th>Middlewares</th>
          </TableHeaderRow>
            <!-- <template v-if="!pageSpinner?.visible.value"> -->
              <TableRow
                v-for="endpoint in project.endpoints"
                :key="endpoint.id"
                @click="
                  $router.push({
                    name: 'endpoint',
                    params: { endpoint: endpoint.id }
                  })
                "
              >
                <td>{{ endpoint.name }}</td>
                <td>{{ endpoint.method }}</td>
                <td>API</td>
                <td>?</td>
              </TableRow>
              <TableRow
                @click="$router.push({ name: 'endpointCreate' })"
              >
                <td class="text-center text-blue font-bold" colspan="4">Create new endpoint</td>
              </TableRow>
            <!-- </template> -->
        </TableComponent>
      </div>
    </div>
    <!-- <router-link to="/platform/test-editor" class="button w-fit"> Test editor (debug) </router-link> -->
  </div>
  <div v-else>Error</div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useRepo } from 'pinia-orm'
import Project from '@/models/Project'

import { PageSpinnerKey } from '@/symbols'
import TableComponent from '@/components/TableComponent.vue'
import TableHeaderRow from '@/components/TableHeaderRow.vue'
import TableRow from '@/components/TableRow.vue'

const route = computed(() => useRoute())
const router = useRouter()
const pageSpinner = inject(PageSpinnerKey)

onMounted(() => {
  console.log(project.value?.name)
  console.log(project.value?.user_id)
})

const project = computed(() =>
  useRepo(Project)
    .withAll()
    .find(route.value.params.project as string)
)

pageSpinner?.show()

Project.fetch(route.value.params.project as string)
  .catch(() => router.push({ name: '404' }))
  .finally(() => pageSpinner?.hide())
</script>

<style>
th, td {
  text-align: left;
  padding: 10px 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid #69e5f8;
}
</style>
