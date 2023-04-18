<template>
  <h1>hub</h1>
  <spinner-loader
    class="w-screen h-screen absolute top-0 left-0"
    v-if="!User.currentUser"
  />
  <div class="">Hello, {{ User.currentUser?.name }}</div>
  <button class="bg-gray-200 text-slate-900 p-2" @click="User.logout()">
    logout
  </button>
</template>
<script lang="ts" setup>
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import User from '@/models/User'

if (!User.currentUser) {
  User.loadCurrentUser()
}
</script>
