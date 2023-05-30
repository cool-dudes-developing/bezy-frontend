<template>
  <aside class="flex flex-col gap-[10px] px-[20px] py-[30px] bg-[#1f1e1e]">
    <router-link :to="{ name: 'recent' }" :is="'div'">
      <svg-icon name="clock" class="h-4 w-4" />
      Recent
    </router-link>
    <router-link :to="'/shared'" :is="'div'">
      <svg-icon name="people" class="h-4 w-4" />
      Shared with me
    </router-link>
    <router-link :to="'/likes'" :is="'div'">
      <svg-icon name="heart" class="h-4 w-4" />
      Likes
    </router-link>
    <router-link :to="{ name: 'test-frontend' }" :is="'div'">
      <svg-icon name="table" class="h-4 w-4" />
      Frontend builder
    </router-link>
    <div class="pt-5">
      <small class="font-small font-light text-electricBlue text-sm">Projects</small>
    </div>
    <router-link :to="{ name: 'projects' }" :is="'div'">
      <svg-icon name="project" class="h-4 w-4" />
      My projects
    </router-link>
    <router-link :to="'/templates'" :is="'div'">
      <svg-icon name="repo" class="h-4 w-4" />
      My templates
    </router-link>
    <router-link :to="'/archive'" :is="'div'">
      <svg-icon name="archive" class="h-4 w-4" />
      Archived projects
    </router-link>
    <button @click="User.logout" class="mt-auto">
      <svg-icon name="log-out" class="h-4 w-4" />
      Log out
    </button>
  </aside>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import User from '@/models/User'

const router = useRouter()
</script>
<style scoped>
aside > * {
  @apply gap-[5px] flex items-center font-sidebarButton font-medium;
}
.router-link-active {
  @apply text-purplePizzaz;
}
</style>
