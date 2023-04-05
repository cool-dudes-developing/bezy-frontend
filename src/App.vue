<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useRepo } from 'pinia-orm'
import { RouterLink, RouterView } from 'vue-router'
import User from './models/User'
import data from './data'
import { computed } from 'vue'
import Block from './models/Block'

const userRepo = computed(() => useRepo(User))
const blockRepo = computed(() => useRepo(Block))
userRepo.value.save(data.users)
blockRepo.value.save(data.blocks)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

body {
  background: #1f1e1e;
}
</style>
