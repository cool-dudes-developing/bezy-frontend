<template>
  <div class="flex flex-col items-center justify-center gap-2.5 w-full h-full">
    <form action="" class="flex flex-col gap-2.5">
      <header class="h-12 font-header text-3xl font-bold text-pink">Create new project</header>
      <InputComponent name="Project name"></InputComponent>
      <label for="description" class="h-[1.375rem] font-label flex items-center text-white"
        >Project description</label
      >
      <textarea
        name="description"
        class="p-[0.625rem] w-[100%] h-[7.5rem] bg-transparent backdrop-brightness-75 drop-shadow-sm border border-blue rounded-[0.9375rem] text-white font-input placeholder:text-white active:backdrop-brightness-50 focus:backdrop-brightness-50 transition"
      />
      <input
        type="submit"
        class="flex justify-center items-center h-[2.5rem] button"
        value="Create"
      />
    </form>
  </div>
</template>

<script lang="ts" setup>
import InputComponent from '@/components/InputComponent.vue'
</script>
