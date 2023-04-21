<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useRepo } from 'pinia-orm'
import { RouterView } from 'vue-router'
import User from './models/User'
import data from './data'
import { computed, provide } from 'vue'
import Block from './models/Block'

const userRepo = computed(() => useRepo(User))
const blockRepo = computed(() => useRepo(Block))
userRepo.value.save(data.users)
blockRepo.value.save(data.blocks)

provide('loading', false)
</script>
