<template>
  <div class="flex flex-col items-center gap-[2.5rem]">
    <img src="../assets/logo.png" alt="logo" />
    <div
      class="w-[19.8125rem] flex flex-col p-[1.25rem] gap-[1.875rem] bg-purple rounded-[0.625rem]"
    >
      <header class="font-header text-[2rem] text-blue">
        {{ headerText }}
      </header>
      <form id="form" class="flex flex-col gap-2 w-[100%]">
        <router-view />
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
            v-for="buttonRoute in buttonSecondaryRoutes"
            :key="buttonRoute"
            :to="buttonRoute"
            class="flex justify-center items-center h-[2.5rem] w-[50%] bg-purple border border-blue rounded-[0.9375rem] text-blue font-button text-[0.825rem]"
          >
            {{ setButtonName(buttonRoute) }}
          </router-link>
        </div>
      </footer>
    </div>
    <p class="font-footer text-white">Made with ♥ by Bezy</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      headerText: '',
      buttonSecondaryRoutes: ['', '']
    }
  },
  methods: {
    updateVariables(
      headerText: string,
      buttonSecondaryRoutes: [string, string]
    ) {
      this.headerText = headerText
      this.buttonSecondaryRoutes = buttonSecondaryRoutes
    },
    setButtonName(buttonRoute: string) {
      if (buttonRoute == '/auth/login') {
        return 'New to Bezy?'
      }
      if (buttonRoute == '/auth/register') {
        return 'Already in Bezy?'
      }
      if (buttonRoute == '/auth/reset') {
        return 'Forgot Password?'
      }
    },
    updatedRoute() {
      if (this.$route.name == 'login') {
        this.updateVariables('Sign in', ['/auth/register', '/auth/reset'])
      }
      if (this.$route.name == 'register') {
        this.updateVariables('Sign up', ['/auth/login', '/auth/reset'])
      }
      if (this.$route.name == 'reset') {
        this.updateVariables('Password reset', [
          '/auth/login',
          '/auth/register'
        ])
      }
    }
  },
  mounted() {
    this.updatedRoute()
  },
  beforeUpdate() {
    this.updatedRoute()
  }
})
</script>
