<template>
  <pre>{{ endpoint }}</pre>
  <h1>Endpoint</h1>
  <div v-if="endpoint">
    <h2>{{ endpoint.name }}</h2>
    <p>{{ endpoint.uri }}</p>
    <p>{{ endpoint.method }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useRepo } from 'pinia-orm'
import { computed } from 'vue'
import Endpoint from '@/models/Endpoint'
import { useRoute } from 'vue-router'

const route = computed(() => useRoute())

const endpoint = computed(() =>
  useRepo(Endpoint)
    .withAll()
    .find(route.value.params.endpoint as string)
)
</script>
