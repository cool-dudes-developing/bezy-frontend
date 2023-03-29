<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts" setup>
import { useRepo } from 'pinia-orm'
import { RouterLink, RouterView } from 'vue-router'
import User from './models/User'
import data from './data'
import { computed } from 'vue'

const userRepo = computed(() => useRepo(User))
userRepo.value.save(data.users)
</script>
