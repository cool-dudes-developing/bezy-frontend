<template>
  <div class="flex flex-col gap-2.5 py-5 px-2.5">
    <div class="flex flex-col gap-2.5 p-2.5 h-full">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRepo } from 'pinia-orm'
import { computed, inject } from 'vue'
import Project from '@/models/Project'
import { useRoute, useRouter } from 'vue-router'
import { PageSpinnerKey } from '@/symbols'
import TableComponent from '@/components/TableComponent.vue'

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
