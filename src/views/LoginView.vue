<template>
  <header class="font-header text-[2rem] text-blue">Sign in</header>
  <form id="form" class="flex flex-col gap-2 w-[100%]">
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
  </form>
  <footer class="flex flex-col gap-2 w-[100%]">
    <button
      type="submit"
      form="form"
      class="flex justify-center items-center h-[2.5rem] bg-blue border border-blue rounded-[0.9375rem] text-black font-button"
    >
      Continue
    </button>
    <div class="flex flex-row gap-2 w-[100%]">
      <router-link
        to="/auth/register"
        class="flex justify-center items-center h-[2.5rem] w-[50%] bg-purple border border-blue rounded-[0.9375rem] text-blue font-button text-[0.825rem]"
      >
        New to Bezy?
      </router-link>
      <router-link
        to="/auth/reset"
        class="flex justify-center items-center h-[2.5rem] w-[50%] bg-purple border border-blue rounded-[0.9375rem] text-blue font-button text-[0.825rem]"
      >
        Forgot password?
      </router-link>
    </div>
  </footer>
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
