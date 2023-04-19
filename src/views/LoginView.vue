<template>
  <div class="flex flex-col gap-[1.875rem] w-full">
    <header class="font-header text-[2rem] text-blue">Sign in</header>
    <form id="form" class="flex flex-col gap-2 w-[100%]" @submit.prevent="login">
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
      <router-link to="/auth/reset" class="text-blue underline font-button text-sm">
        Forgot password?
      </router-link>
    </form>
    <footer class="flex flex-col gap-2 w-[100%]">
      <button type="submit" form="form" class="flex justify-center items-center h-[2.5rem] button">
        Continue
      </button>
      <router-link
        to="/auth/register"
        class="flex justify-center items-center h-[2.5rem] button-secondary"
      >
        New to Bezy?
      </router-link>
    </footer>
  </div>
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
