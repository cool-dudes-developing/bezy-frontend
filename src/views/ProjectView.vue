<template>
  <div>
    <template v-if="project">
      <h1>Methods go here</h1>
      <h1>Endpoints go here</h1>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { useRepo } from 'pinia-orm'
import { computed, inject } from 'vue'
import Project from '@/models/Project'
import { useRoute, useRouter } from 'vue-router'
import { PageSpinnerKey } from '@/symbols';

const route = computed(() => useRoute())
const router = useRouter();
const pageSpinner = inject(PageSpinnerKey)

const project = computed(() =>
  useRepo(Project)
    .withAll()
    .find(route.value.params.project as string)
)

if (!project.value) {
  pageSpinner?.show()
  Project.fetch(route.value.params.project as string)
  .catch((err) => router.push({ name: '404'}))
  .finally(() => pageSpinner?.hide())
}
</script>
