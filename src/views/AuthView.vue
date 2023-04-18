<template>
  <div class="h-full flex flex-col items-center justify-between py-16 gap-[2.5rem] w-full noise">
    <figure class="flex items-center gap-[10px] font-header font-bold text-4xl">
      <img src="@/assets/logo/logo-light.svg" alt="Bezy logo" class="w-[60px]" />
      <figcaption>Bezy</figcaption>
    </figure>
    <div class="p-[1.25rem] bg-purple rounded-[0.625rem] max-w-[320px] w-11/12 transition">
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <p class="font-footer text-white font-bold">Made with ♥️ by <span class="font-header decoration-2 hover:underline">Bezy</span></p>
  </div>
</template>
<style scoped>
</style>
