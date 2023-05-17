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

provide('loading', false)
</script>
