<template>
  <div class="flex flex-col gap-2.5 py-5 px-2.5">
    <div class="flex flex-col gap-2.5 p-2.5">
      <template v-if="project">
        <header class="h-12 font-header text-3xl font-bold text-pink">{{ project.name }}</header>
        <h1>Methods go here</h1>
        <div>
          <router-link
            class="button p-3"
            v-for="method in project.methods"
            :key="method.id"
            :to="{ name: 'method', params: { project: project.id, method: method.id } }"
          >
            {{ method.name }}
          </router-link>
        </div>
        <h1>Endpoints go here</h1>
        <router-link to="/platform/test-editor"> editor </router-link>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRepo } from 'pinia-orm'
import { computed, inject } from 'vue'
import Project from '@/models/Project'
import { useRoute, useRouter } from 'vue-router'
import { PageSpinnerKey } from '@/symbols'

const route = computed(() => useRoute())
const router = useRouter()
const pageSpinner = inject(PageSpinnerKey)

const project = computed(() =>
  useRepo(Project)
    .withAll()
    .find(route.value.params.project as string)
)

pageSpinner?.show()
Project.fetch(route.value.params.project as string)
  .catch((err) => router.push({ name: '404' }))
  .finally(() => pageSpinner?.hide())
</script>
