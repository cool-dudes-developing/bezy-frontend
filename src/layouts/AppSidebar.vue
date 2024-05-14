<template>
  <aside class="flex flex-col gap-[10px] px-[20px] py-[30px] bg-[#1f1e1e]">
    <router-link :is="'div'" :to="{ name: 'recent' }">
      <svg-icon class="h-4 w-4" name="clock" />
      Recent
    </router-link>
    <router-link :is="'div'" :to="'/shared'">
      <svg-icon class="h-4 w-4" name="people" />
      Shared with me
    </router-link>
    <router-link :is="'div'" :to="'/likes'">
      <svg-icon class="h-4 w-4" name="heart" />
      Likes
    </router-link>
    <div class="pt-5">
      <small class="font-small font-light text-electricBlue text-sm">Projects</small>
    </div>
    <router-link :is="'div'" :to="{ name: 'projects' }">
      <svg-icon class="h-4 w-4" name="project" />
      My projects
    </router-link>
    <router-link :is="'div'" :to="{name: 'marketplace'}">
      <svg-icon class="h-4 w-4" name="repo" />
      Marketplace
    </router-link>
    <router-link :is="'div'" :to="'/archive'">
      <svg-icon class="h-4 w-4" name="archive" />
      Archived projects
    </router-link>
    <button class="mt-auto" @click="User.logout">
      <svg-icon class="h-4 w-4" name="log-out" />
      Log out
    </button>
  </aside>
</template>
<script lang="ts" setup>
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
