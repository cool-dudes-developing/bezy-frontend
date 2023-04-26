<template>
  <router-link
    :to="link"
    class="flex flex-col justify-between p-2.5 gap-2.5 bg-background-400 rounded-lg w-96 h-48"
  >
    <div class="w-12 h-12 rounded-lg border border-blue"></div>
    <div class="flex flex-col justify-center items-end">
      <p class="font-paragraph text-base text-blue">{{ secondaryText }}</p>
      <p class="font-paragraph text-2xl text-blue">{{ primaryText }}</p>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
const props = defineProps({
  primaryText: {
    type: String,
    required: true
  },
  secondaryText: {
    type: String
  },
  link: {
    type: String,
    required: true
  }
})
</script>
