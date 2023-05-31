<template>
  <aside class="flex flex-col gap-[10px] px-[20px] py-[30px] bg-[#1f1e1e]">
    <button @click="toggleDropdown('database')">
      <svg-icon name="database" class="h-4 w-4" />
      Database
    </button>
    <div
      :class="[
        'flex',
        'flex-col',
        'gap-[10px]',
        'bg-[#1f1e1]',
        'dropdown',
        'items-start',
        'justify-start',
        { active: dropdownOpen['database'] }
      ]"
    >
      <router-link :to="{ name: 'recent' }" :is="'div'" class="w-full ml-10">
        <svg-icon name="table" class="h-4 w-4" />
        Users
      </router-link>
      <router-link :to="{ name: 'recent' }" :is="'div'" class="w-full ml-10">
        <svg-icon name="table" class="h-4 w-4" />
        Posts
      </router-link>
      <router-link :to="{ name: 'recent' }" :is="'div'" class="w-full ml-10">
        <svg-icon name="table" class="h-4 w-4" />
        Comments
      </router-link>
    </div>
    <button @click="toggleDropdown('logic')">
      <svg-icon name="logic" class="h-4 w-4" />
      Logic
    </button>
    <div
      :class="[
        'flex',
        'flex-col',
        'gap-[10px]',
        'bg-[#1f1e1]',
        'dropdown',
        { active: dropdownOpen['logic'] }
      ]"
    >
      <router-link :to="{ name: 'recent' }" :is="'div'">
        <svg-icon name="table" class="h-4 w-4" />
        Recent
      </router-link>
      <router-link :to="{ name: 'recent' }" :is="'div'">
        <svg-icon name="table" class="h-4 w-4" />
        Recent
      </router-link>
      <router-link :to="{ name: 'recent' }" :is="'div'">
        <svg-icon name="table" class="h-4 w-4" />
        Recent
      </router-link>
    </div>
    <button @click="toggleDropdown('endpoints')">
      <svg-icon name="endpoints" class="h-4 w-4" />
      Endpoints
    </button>
    <div
      :class="[
        'flex',
        'flex-col',
        'gap-[10px]',
        'bg-[#1f1e1]',
        'dropdown',
        { active: dropdownOpen['endpoints'] }
      ]"
    >
      <router-link :to="{ name: 'recent' }" :is="'div'">
        <svg-icon name="table" class="h-4 w-4" />
        Recent
      </router-link>
      <router-link :to="{ name: 'recent' }" :is="'div'">
        <svg-icon name="table" class="h-4 w-4" />
        Recent
      </router-link>
      <router-link :to="{ name: 'recent' }" :is="'div'">
        <svg-icon name="table" class="h-4 w-4" />
        Recent
      </router-link>
    </div>
    <button @click="toggleDropdown('storage')">
      <svg-icon name="folder" class="h-4 w-4" />
      Storage
    </button>
    <div
      :class="[
        'flex',
        'flex-col',
        'gap-[10px]',
        'bg-[#1f1e1]',
        'dropdown',
        { active: dropdownOpen['storage'] }
      ]"
    >
      <router-link :to="{ name: 'recent' }" :is="'div'">
        <svg-icon name="table" class="h-4 w-4" />
        Recent
      </router-link>
      <router-link :to="{ name: 'recent' }" :is="'div'">
        <svg-icon name="table" class="h-4 w-4" />
        Recent
      </router-link>
      <router-link :to="{ name: 'recent' }" :is="'div'">
        <svg-icon name="table" class="h-4 w-4" />
        Recent
      </router-link>
    </div>
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
  max-height: 100px;
}
.router-link-active {
  @apply text-purplePizzaz;
}
</style>
