<template>
  <header class="font-header text-[2rem] text-blue">Sign up</header>
  <form id="form" class="flex flex-col gap-2 w-[100%]">
    <input-component
      v-model="user.name"
      type="text"
      name="Name"
      placeholder="How can we call you?"
    ></input-component>
    <input-component
      v-model="user.email"
      type="text"
      name="Email"
      placeholder="What's your email?"
    ></input-component>
    <input-component
      v-model="user.password"
      type="password"
      name="Password"
      placeholder="Choose a strong one"
    ></input-component>
    <input-component
      v-model="user.passwordConfirmation"
      type="password"
      name="Repeat your password"
      placeholder="Make sure it's correct"
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
        to="/auth/login"
        class="flex justify-center items-center h-[2.5rem] w-[50%] bg-purple border border-blue rounded-[0.9375rem] text-blue font-button text-[0.825rem]"
      >
        Already in Bezy?
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

<script lang="ts" setup>
import InputComponent from '@/components/InputComponent.vue'
import { ref } from 'vue'

const user = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
})
</script>
