<template>
  <pre>{{ project }}</pre>
  <h1>Project</h1>
  <div v-if="project">
    <h2>{{ project.name }}</h2>
    <p>{{ project.description }}</p>
    <h3>Methods</h3>
    <ul>
      <li v-for="method in project.methods" :key="method.id">
        <router-link :to="`/projects/${project.id}/methods/${method.id}`">
          {{ method.name }}
        </router-link>
      </li>
    </ul>
    <h3>Endpoints</h3>
    <ul>
      <li v-for="endpoint in project.endpoints" :key="endpoint.id">
        <router-link :to="`/projects/${project.id}/endpoints/${endpoint.id}`">
          {{ endpoint.name }}
        </router-link>
      </li>
    </ul>
  </div>
  <p v-else>project is null</p>
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
