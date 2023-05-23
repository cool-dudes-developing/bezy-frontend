<template>
  <header class="flex justify-between px-[20px] py-[10px] bg-[#1f1e1e]">
    <figure
      class="flex h-full gap-3 items-center cursor-pointer select-none text-white"
      @click="router.push({ name: 'platform' })"
    >
        <svg-icon name="logo-light" class="h-10 w-10" />
      <h1 class="font-header text-[2rem] text-white">Bezy</h1>
    </figure>
    <div
      class="h-full bg-purplePizzaz aspect-square flex items-center justify-center rounded-full font-header text-3xl"
    >
      {{ User.currentUser?.name.substring(0, 1).toUpperCase() }}
    </div>
  </header>
</template>
<script setup lang="ts">
import User from '@/models/User'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
