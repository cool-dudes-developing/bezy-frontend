<template>
  <aside class="flex flex-col gap-[15px] px-[20px] py-[30px] bg-[#1f1e1e]">
    <router-link :to="{ name: '404' }" :is="'div'">
      <svg-icon name="database" class="h-4 w-4" />
      Database
    </router-link>
    <router-link :to="{ name: 'projectBackend' }" :is="'div'">
      <svg-icon name="code" class="h-4 w-4" />
      Backend
    </router-link>
    <router-link :to="{ name: '404' }" :is="'div'">
      <svg-icon name="image" class="h-4 w-4" />
      Frontend
    </router-link>
    <router-link :to="{ name: '404' }" :is="'div'">
      <svg-icon name="folder" class="h-4 w-4" />
      Storage
    </router-link>
    <router-link :to="{ name: 'platform' }" :is="'div'" id="hubReturn" class="mt-auto">
      <svg-icon name="log-out" class="h-4 w-4" />
      Go to hub
    </router-link>
  </aside>
</template>

<script setup lang="ts">
import { useRepo } from 'pinia-orm'
import { computed, inject, ref } from 'vue'
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

// const dropdownOpen = ref({ database: false, logic: false, endpoints: false, storage: false })

// function toggleDropdown(key: string) {
//   dropdownOpen.value[key] = !dropdownOpen.value[key]
// }
</script>

<style scoped>
aside > * {
  @apply gap-[5px] flex items-center font-sidebarButton font-medium;
}

.dropdown > * {
  @apply gap-[5px] flex items-center font-sidebarButton font-medium;
}

.dropdown {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.6s ease-out;
}

#hubReturn {
  @apply text-white;
}

.dropdown.active {
  max-height: max-content;
}
.router-link-active {
  @apply text-purplePizzaz;
}
</style>
