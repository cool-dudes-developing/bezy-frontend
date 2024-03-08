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
          <th class="w-10 border-none"></th>
        </template>
        <template #main>
          <tr
            class="bg-background-400 border border-border hover:bg-background-500 cursor-pointer"
            @click="$router.push({ name: 'project', params: { project: project.id } })"
            v-for="project in projects"
            :key="project.id"
          >
            <td ref="cells">{{ project.name }}</td>
            <td colspan="2" ref="cells">
              {{ project.description }}
            </td>
            <td ref="cells">{{ project.updated_at }}</td>
            <td 
              class="flex py-3.5 justify-center"
              @click.stop="destroy(project.id)"
              ref="cells"
            >
              <svg-icon name="trashcan"/>
            </td>
          </tr>
          <tr
            class="bg-background-400 border border-border rounded-b-lg hover:bg-background-500 cursor-pointer"
            @click="$router.push({ name: 'createProject' })"
          >
            <td class="text-center text-blue font-bold" colspan="5">+</td>
          </tr>
        </template>
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
import { useRepo } from 'pinia-orm'
import { computed, inject, onMounted, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Project from '@/models/Project'
import { PageSpinnerKey } from '@/symbols'
import TableComponent from '@/components/TableComponent.vue'

const pageSpinner = inject(PageSpinnerKey)
const route = computed(() => useRoute())

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
th,
td {
  text-align: left;
  padding: 10px 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
