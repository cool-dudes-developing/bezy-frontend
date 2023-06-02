<template>
  <div :class="projects.length != 0 ? NormalStateClass : EmptyStateClass">
    <div class="flex flex-col gap-2.5 p-2.5">
      <header v-if="projects.length != 0" class="h-12 font-header text-3xl font-bold text-pink">
        Projects
      </header>
      <TableComponent v-if="projects.length != 0">
        <template #headers>
          <th>Name</th>
          <th colspan="2">Description</th>
          <th>Updated</th>
        </template>
        <template #main>
          <tr
            class="bg-background-400 border border-border hover:bg-background-500 cursor-pointer"
            @click="$router.push({ name: 'project', params: { project: project.id } })"
            v-for="project in projects"
            :key="project.id"
          >
            <td>{{ project.name }}</td>
            <td colspan="2">{{ project.description }}</td>
            <td class="flex flex-row justify-between items-center">
              {{ project.updated_at }}
              <svg-icon name="trashcan" @click.stop="destroy(project.id)"></svg-icon>
            </td>
          </tr>
        </template>
      </TableComponent>
      <div v-else class="flex flex-col w-fit gap-2">
        <p>It seems like you have no projects!</p>
        <router-link
          to="/platform/projects/create"
          class="flex h-8 justify-center items-center button"
          >Create new project</router-link
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

const pageSpinner = inject(PageSpinnerKey)

const route = computed(() => useRoute())

const EmptyStateClass = ref('flex flex-col justify-center items-center gap-2.5 py-5 px-2.5')
const NormalStateClass = ref('flex flex-col gap-2.5 py-5 px-2.5')

pageSpinner?.show()
Project.fetchAll().then(() => pageSpinner?.hide())

const projects = computed(() => useRepo(Project).all())

function destroy(id: string) {
  pageSpinner?.show()
  Project.destroy(id).finally(() => pageSpinner?.hide())
}
</script>

<style>
th,
td {
  text-align: left;
  padding: 10px 12px;
}
</style>
