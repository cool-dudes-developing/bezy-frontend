<template>
  <div class="flex flex-col gap-2.5 px-5 py-7">
    <div class="flex flex-col gap-2.5">
      <header class="h-12 font-header text-3xl font-bold text-pink">Recent</header>
      <div class="flex flex-wrap double-gap">
        <CardComponent
          v-if="projects.length == 0"
          link="/platform/projects/create"
          primaryText="Create new project"
          iconName="plus"
        />
        <CardComponent
          v-for="project in projects"
          :key="project.id"
          :link="'/platform/projects/' + project.id"
          :primaryText="project.name"
          secondaryText="Open project"
          :iconName="'folder-big'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardComponent from '@/components/CardComponent.vue'
import Project from '@/models/Project'
import { PageSpinnerKey, SpinnerKey } from '@/symbols'
import { useRepo } from 'pinia-orm'
import { inject, computed, onMounted } from 'vue'

onMounted(() => {
  console.log(projects.value)
})

const spinner = inject(SpinnerKey)
const pageSpinner = inject(PageSpinnerKey)

pageSpinner?.show()
Project.fetchAll().then(() => pageSpinner?.hide())

const projects = computed(() => useRepo(Project).all())

function appLoaderTest() {
  spinner?.show()
  setTimeout(() => {
    spinner?.hide()
  }, 2000)
}

function pageLoaderTest() {
  pageSpinner?.show()
  setTimeout(() => {
    pageSpinner?.hide()
  }, 2000)
}
</script>

<style>
.hub-container {
  overflow-x: scroll;
}

.hub-content {
  display: flex;
  gap: 2.5rem;
  min-width: fit-content;
  white-space: nowrap;
}

.double-gap {
  gap: 0.75rem 1%;
}
</style>
