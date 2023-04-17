<template>
  <input-component
    name="Email"
    placeholder="What's your email?"
    error-message="x"
    :is-error="false"
  >
  </input-component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputComponent from '@/components/InputComponent.vue'

export default defineComponent({
  components: {
    InputComponent
  }
})
</script>
