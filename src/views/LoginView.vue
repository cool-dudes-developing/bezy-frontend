<template>
  <header class="font-header text-[2rem] text-blue">Sign in</header>
  <form id="form" class="flex flex-col gap-2 w-[100%]" @submit.prevent>
    <input-component
      v-model="email"
      type="text"
      name="Email"
      placeholder="What's your email?"
    ></input-component>
    <input-component
      v-model="password"
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
      @click="login"
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

<script lang="ts" setup>
import InputComponent from '@/components/InputComponent.vue'
import User from '@/models/User'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const router = useRouter()

function login() {
  User.login(email.value, password.value).then(() => {
    router.push({ name: 'hub' })
  })
}
</script>
