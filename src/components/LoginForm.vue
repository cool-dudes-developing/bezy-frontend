<template>
  <input-component
    type="text"
    name="Email"
    placeholder="What's your email?"
  ></input-component>
  <input-component
    type="password"
    name="Password"
    placeholder="Your password"
  ></input-component>
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
