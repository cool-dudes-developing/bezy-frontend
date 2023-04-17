<template>
  <input-component
    name="Name"
    placeholder="How can we call you?"
    error-message="x"
    :is-error="false"
  ></input-component>
  <input-component
    name="Email"
    placeholder="What's your email?"
    error-message="x"
    :is-error="false"
  ></input-component>
  <input-component
    name="Password"
    placeholder="Choose a strong one"
    error-message="x"
    :is-error="false"
  ></input-component>
  <input-component
    name="Repeat your password"
    placeholder="Make sure it's correct"
    error-message="x"
    :is-error="false"
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
