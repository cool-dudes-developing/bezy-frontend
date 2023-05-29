<template>
  <div class="flex flex-col gap-2.5 px-5 py-7">
    <div class="flex flex-col gap-2.5">
      <header class="h-12 font-header text-3xl font-bold text-pink">Recent</header>
      <div class="overflow-x-scroll">
        <div class="flex gap-3 min-w-fit whitespace-nowrap">
          <HubComponent
            link="/platform/projects/create"
            primaryText="Create new project"
            iconName="plus"
          ></HubComponent>
          <HubComponent
            v-for="project in projects"
            :key="project.id"
            :link="'/platform/projects/' + project.id"
            :primaryText="project.name"
            secondaryText="Open project"
            iconName="folder-big"
          />
        </div>
      </div>
    </div>
    <div>
      <button class="button p-3" @click="User.logout">logout</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HubComponent from '@/components/HubComponent.vue'
import Project from '@/models/Project'
import User from '@/models/User'
import { PageSpinnerKey, SpinnerKey } from '@/symbols'
import { useRepo } from 'pinia-orm'
import { inject, computed } from 'vue'

const spinner = inject(SpinnerKey)
const pageSpinner = inject(PageSpinnerKey)

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
</style>
