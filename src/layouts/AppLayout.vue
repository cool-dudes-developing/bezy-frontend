<template>
  <main class="w-full h-screen flex gap-[1px] flex-col m-0 gradient">
    <transition name="fade">
      <spinner-loader
        class="w-screen h-screen absolute top-0 left-0 gradient z-50"
        v-if="spinner?.visible.value"
      >
        <small class="font-footer mt-3">Background color is a subject to change</small>
      </spinner-loader>
    </transition>
    <transition :name="$route.meta.header ? 'header-slide' : 'header-slide-reverse'">
      <component
        :is="$route.meta.header ?? AppHeader"
        class="w-full h-[theme(space.header)] transform-gpu"
      />
    </transition>
    <div class="w-full h-[calc(100vh_-_theme(space.header)_-_1px)] flex gap-[1px] flex-row relative">
      <!-- <div class="h-full basis-52 border-r border-r-electricBlue"></div> -->
      <transition :name="$route.meta.sidebar ? 'sidebar-slide' : 'sidebar-slide-reverse'">
        <component
          :is="$route.meta.sidebar ?? AppSidebar"
          class="h-full w-[theme(space.sidebar)] transform-gpu"
        />
      </transition>
      <!-- <router-view /> -->
      <main class="flex-1 overflow-hidden scrollbar relative w-[calc(100%_-_theme(space.sidebar))]">
        <spinner-loader class="w-full h-full absolute top-0 left-0 z-40" v-if="pageSpinner?.visible.value" />
        <router-view v-slot="{ Component }">
          <transition name="app-slide" mode="out-in" appear>
            <component
              :is="Component"
              class="bg-[#1f1e1e] h-full w-full page overflow-auto transform-gpu"
              :class="[pageSpinner?.visible.value ? 'loading' : '']"
            />
          </transition>
        </router-view>
      </main>
    </div>
  </main>
</template>
<script setup lang="ts">
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import AppHeader from '@/layouts/AppHeader.vue'
import AppSidebar from '@/layouts/AppSidebar.vue'
import User from '@/models/User'
import { SpinnerKey, PageSpinnerKey } from '@/symbols'
import { inject } from 'vue'

const spinner = inject(SpinnerKey)
const pageSpinner = inject(PageSpinnerKey)


if (!User.currentUser) {
  spinner?.show()
  User.loadCurrentUser().then(() => {
    setTimeout(() => {
      spinner?.hide()
    }, 100);
  })
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease-out;
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

.page.loading,
.app-slide-enter-active,
.app-slide-leave-active {
  height: 100%;
}

.page,
.app-slide-enter-active,
.app-slide-leave-active {
  transition: 0.1s ease-in;
  transition-property: transform, filter;
  transform: scale(1);
  filter: blur(0) brightness(1);
}

.page.loading,
.app-slide-leave-to,
.app-slide-enter-from {
  transform: scale(0.98);
  filter: blur(5px) brightness(0.8);
}

.header-slide-leave-active {
  position: absolute;
  transition: 0.25s ease-out;
}
.header-slide-enter-active {
  transition: 0.25s ease-out;
  transition-property: transform;
  transform: translateY(0);
}

.header-slide-enter-from {
  transform: translateY(-100%);
}

.header-slide-leave-to {
  transform: translateY(0);
}

.header-slide-reverse-enter-active {
  position: absolute;
  transition: 0.25s ease-in;
}

.header-slide-reverse-leave-active {
  transition: 0.25s ease-in;
  transition-property: transform;
  transform: translateY(0);
}

.header-slide-reverse-enter-from {
  transform: translateY(0);
  z-index: -1;
}

.header-slide-reverse-leave-to {
  transform: translateY(-100%);
  z-index: 1;
}

.sidebar-slide-leave-active {
  position: absolute;
  transition: 0.25s ease-out;
}
.sidebar-slide-enter-active {
  transition: 0.25s ease-out;
  transition-property: transform;
  transform: translateX(0);
}

.sidebar-slide-enter-from {
  transform: translateX(-100%);
}

.sidebar-slide-leave-to {
  transform: translateX(0);
}

.sidebar-slide-reverse-enter-active {
  position: absolute;
  transition: 0.25s ease-in;
}

.sidebar-slide-reverse-leave-active {
  transition: 0.25s ease-in;
  transition-property: transform;
  transform: translateX(0);
}

.sidebar-slide-reverse-enter-from {
  transform: translateX(0);
  z-index: -1;
}

.sidebar-slide-reverse-leave-to {
  transform: translateX(-100%);
  z-index: 1;
}
</style>
