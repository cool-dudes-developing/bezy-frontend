<template>
  <div class="flex flex-col gap-2.5 px-5 py-7">
    <div class="flex flex-col gap-2.5">
      <header class="h-12 font-header text-3xl font-bold text-pink">Recent</header>
      <div class="flex flex-row gap-2.5">
        <HubComponent link="/projects/create" primaryText="Create new project"></HubComponent>
        <HubComponent
          link="/projects/test"
          primaryText="Test project"
          secondaryText="Open project"
        />
      </div>
    </div>
    <div>
      <button class="button p-3" @click="User.logout">logout</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HubComponent from '@/components/HubComponent.vue'
import User from '@/models/User'
import { PageSpinnerKey, SpinnerKey } from '@/symbols'
import { inject } from 'vue'

const spinner = inject(SpinnerKey)
const pageSpinner = inject(PageSpinnerKey)

if (!User.currentUser) {
  pageSpinner?.show()
  User.loadCurrentUser().then(() => {
    pageSpinner?.hide()
  })
}

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
