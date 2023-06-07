<template>
  <aside class="flex flex-col gap-[10px] px-[20px] py-[30px] bg-[#1f1e1e]">
    <SidebarDropdown iconName="database" innerText="Database">
      <router-link :to="{ name: '404' }" :is="'div'" class="w-full ml-6">
        <svg-icon name="table" class="h-4 w-4" />
        Test
      </router-link>
      <router-link :to="{ name: '404' }" :is="'div'" class="w-full ml-6">
        <svg-icon name="table" class="h-4 w-4" />
        Test
      </router-link>
      <router-link :to="{ name: '404' }" :is="'div'" class="w-full ml-6">
        <svg-icon name="table" class="h-4 w-4" />
        Test
      </router-link>
    </SidebarDropdown>
    <SidebarDropdown iconName="code" innerText="Backend">
      <router-link :to="{ name: 'methods' }" :is="'div'" class="w-full ml-6">
        <svg-icon name="logic" class="h-4 w-4" />
        Methods
      </router-link>
      <router-link :to="{ name: 'endpoints' }" :is="'div'" class="w-full ml-6">
        <svg-icon name="endpoints" class="h-4 w-4" />
        Endpoints
      </router-link>
    </SidebarDropdown>
    <SidebarDropdown iconName="image" innerText="Frontend">
      <router-link :to="{ name: 'recent' }" :is="'div'" class="w-full ml-6">
        <svg-icon name="browser" class="h-4 w-4" />
        Test
      </router-link>
      <router-link :to="{ name: 'recent' }" :is="'div'" class="w-full ml-6">
        <svg-icon name="browser" class="h-4 w-4" />
        Test
      </router-link>
      <router-link :to="{ name: 'recent' }" :is="'div'" class="w-full ml-6">
        <svg-icon name="browser" class="h-4 w-4" />
        Test
      </router-link>
    </SidebarDropdown>
    <SidebarDropdown iconName="folder" innerText="Storage">
      <div class="w-full ml-6">
        <svg-icon name="file" class="h-4 w-4" />
        Test
      </div>
      <div class="w-full ml-6">
        <svg-icon name="file" class="h-4 w-4" />
        Test
      </div>
      <div class="w-full ml-6">
        <svg-icon name="file" class="h-4 w-4" />
        Test
      </div>
    </SidebarDropdown>
  </aside>
</template>

<script setup lang="ts">
import { useRepo } from 'pinia-orm'
import { computed, inject, ref } from 'vue'
import Project from '@/models/Project'
import { useRoute, useRouter } from 'vue-router'
import { PageSpinnerKey } from '@/symbols'
import SidebarDropdown from '@/components/SidebarDropdown.vue'

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

const dropdownOpen = ref({ database: false, logic: false, endpoints: false, storage: false })

function toggleDropdown(key: string) {
  dropdownOpen.value[key] = !dropdownOpen.value[key]
}
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

.dropdown.active {
  max-height: max-content;
}
.router-link-active {
  @apply text-purplePizzaz;
}
</style>
