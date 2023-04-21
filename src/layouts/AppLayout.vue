<template>
  <main class="w-full h-screen flex flex-col m-0">
    <transition name="fade">
      <spinner-loader
        class="w-screen h-screen absolute top-0 left-0 bg-slate-800 z-50"
        v-if="spinner?.visible.value"
      >
        <small class="font-footer mt-3">Background color is a subject to change</small>
      </spinner-loader>
    </transition>
    <app-header class="w-full border h-[theme(space.header)]" />
    <div class="w-full h-[calc(100vh_-_theme(space.header))] flex flex-row">
      <app-sidebar class="border h-full basis-40" />
      <main class="flex-1 overflow-auto">
        <router-view />
      </main>
    </div>
  </main>
</template>
<script setup lang="ts">
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import AppHeader from '@/layouts/AppHeader.vue'
import AppSidebar from '@/layouts/AppSidebar.vue'
import { SpinnerKey } from '@/symbols'
import { inject } from 'vue'

const spinner = inject(SpinnerKey)
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.15s ease-out;
  transition-property: transform opacity;
  transform: scale(1);
  opacity: 1;
}
.fade-enter-from,
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
