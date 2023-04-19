<template>
  <div class="py-16 gap-[2.5rem] w-full h-full relative">
    <div class="absolute noise top-0 left-0 w-full h-full -z-20">
      <gradient-background class="absolute top-0 left-0 -z-10" />
    </div>
    <div class="h-full flex flex-col items-center justify-between">
      <figure class="flex items-center gap-[10px] font-header font-bold text-4xl">
        <img src="@/assets/logo/logo-light.svg" alt="Bezy logo" class="w-[60px]" />
        <figcaption>Bezy</figcaption>
      </figure>
      <div class="p-[1.25rem] bg-purple bg-opacity-75 backdrop-blur-xl drop-shadow-lg rounded-3xl max-w-[320px] w-11/12 transition">
        <router-view v-slot="{ Component }">
          <transition name="slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <p class="font-footer text-white font-bold">
        Made with ♥️ by <span class="font-header decoration-2 hover:underline">Bezy</span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import GradientBackground from '@/components/GradientBackground.vue'
</script>
<style scoped></style>
