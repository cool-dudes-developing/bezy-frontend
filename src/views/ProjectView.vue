<template>
  <router-view />
</template>
<script lang="ts" setup>
import { useRepo } from 'pinia-orm'
import { computed } from 'vue'
import Project from '@/models/Project'
import { useRoute } from 'vue-router'

const route = computed(() => useRoute())

const project = computed(() =>
  useRepo(Project)
    .withAll()
    .find(route.value.params.project as string)
)
</script>
