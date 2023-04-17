<template>
  <div class="w-[100%] flex flex-col gap-[0.3125rem]">
    <label
      :for="name"
      class="h-[1.375rem] font-label flex items-center text-white"
      >{{ name }}</label
    >
    <input
      :id="name"
      :type="type"
      v-model="input"
      :placeholder="placeholder"
      class="p-[0.625rem] w-[100%] h-[2.5rem] bg-purple border border-blue rounded-[0.9375rem] text-white font-input placeholder:text-white"
    />
    <p
      v-if="isError"
      class="h-[0.9375rem] font-error text-[0.875rem] text-blue flex items-center"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: String,
    name: String,
    placeholder: String,
    errorMessage: String,
    isError: Boolean
  },
  data() {
    return {
      input: ''
    }
  }
})
</script>
