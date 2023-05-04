<template>
  <div class="flex flex-col gap-2.5 py-5 px-2.5">
    <div class="flex flex-col gap-2.5 p-2.5">
      <header class="h-12 font-header text-3xl font-bold text-pink">Projects</header>
      <table class="table-fixed border-separate border border-border rounded-lg">
        <tr class="bg-background-300 border border-border">
          <th>Name</th>
          <th>Description</th>
          <th>Updated</th>
        </tr>
        <tr
          class="bg-background-400 border border-border hover:bg-background-500 cursor-pointer"
          @click="$router.push({ name: 'project', params: { project: project.id } })"
          v-for="project in projects"
          :key="project.id"
        >
          <td>{{ project.name }}</td>
          <td>{{ project.description }}</td>
          <td>{{ project.updated_at }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRepo } from 'pinia-orm'
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import Project from '@/models/Project'
import { PageSpinnerKey } from '@/symbols';

const pageSpinner = inject(PageSpinnerKey)

const route = computed(() => useRoute())

pageSpinner?.show()
Project.fetchAll().then(() => pageSpinner?.hide())

const projects = computed(() => useRepo(Project).all())
</script>

<style>
th,
td {
  text-align: left;
  padding: 10px 12px;
}
</style>
