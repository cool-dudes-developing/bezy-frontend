<template>
  <div class="h-full flex flex-col items-center justify-center gap-[2.5rem]">
    <img src="../assets/logo.png" alt="logo" />
    <div
      class="w-[19.8125rem] flex flex-col p-[1.25rem] gap-[1.875rem] bg-purple rounded-[0.625rem]"
    >
      <router-view />
    </div>
    <p class="font-footer text-white">Made with ♥️ by Bezy</p>
  </div>
</template>
