<template>
  <div :class="projects.length != 0 ? NormalStateClass : EmptyStateClass">
    <div class="flex flex-col gap-2.5 p-2.5">
      <header v-if="projects.length != 0" class="h-12 font-header text-3xl font-bold text-pink">
        Projects
      </header>
      <TableComponent v-if="projects.length != 0">
        <TableHeaderRow>
          <th>Name</th>
          <th colspan="2">Description</th>
          <th>Updated</th>
          <th class="w-10 border-none"></th>
        </TableHeaderRow>
        <TableRow
            @click="$router.push({ name: 'project', params: { project: project.id } })"
            v-for="project in projects"
            :key="project.id"
        >
            <td ref="cells">{{ project.name }}</td>
            <td colspan="2" ref="cells">
              {{ project.description }}
            </td>
            <td ref="cells">{{ project.updated_at.substring(0, 19).replace('T', ' ') }}</td>
            <td 
              class="flex py-3.5 justify-center border-none"
              @click.stop="destroy(project.id)"
              ref="cells"
            >
              <svg-icon name="trashcan"/>
            </td>
          </TableRow>
          <TableRow
            @click="$router.push({ name: 'createProject' })"
          >
            <td class="text-center text-blue font-bold" colspan="5">+</td>
          </TableRow>
      </TableComponent>
      <div v-else class="flex flex-col w-fit gap-2">
        <p>It seems like you have no projects!</p>
        <router-link
          to="/platform/projects/create"
          class="flex h-8 justify-center items-center button"
        >
          Create new project
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useRepo } from 'pinia-orm'
import Project from '@/models/Project'

import { PageSpinnerKey } from '@/symbols'

import TableComponent from '@/components/TableComponent.vue'
import TableHeaderRow from '@/components/TableHeaderRow.vue'
import TableRow from '@/components/TableRow.vue'

const route = computed(() => useRoute())
const pageSpinner = inject(PageSpinnerKey)

const EmptyStateClass = ref('flex flex-col justify-center items-center gap-2.5 py-5 px-2.5')
const NormalStateClass = ref('flex flex-col gap-2.5 py-5 px-2.5')
const cells = ref([])

pageSpinner?.show()
Project.fetchAll().then(() => pageSpinner?.hide())

const projects = computed(() => useRepo(Project).all())

function destroy(id: string) {
  pageSpinner?.show()
  Project.destroy(id).finally(() => pageSpinner?.hide())
}

function log(){
  console.log(cells.value[2])
}

onMounted(() => {
  log()
})


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
