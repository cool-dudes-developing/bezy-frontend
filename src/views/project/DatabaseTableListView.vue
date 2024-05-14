<template>
  <div class="flex flex-col gap-10">
    <h1>DatabaseTablesView</h1>
    <div class="flex flex-col divide-y">
      <router-link v-for="table in tables"
                   :key="table.id" :to="{
        name: 'table',
        params: {
          project: route.params.project,
          table: table.id
        }
      }" class="px-3 py-2 flex justify-between">
        <h3>
          {{ table.name }}
        </h3>
        <small>
          {{ table.rows_count }} Records
        </small>
      </router-link>
    </div>
    <div class="bg-border flex flex-col gap-1 w-1/2 px-3 items-start">
      <h3>Create new table</h3>
      <input v-model="newTableName" placeholder="table name" type="text" class="text-black">
      <button class="bg-blue text-black" @click="DatabaseTable.store(route.params.project as string,{
      name: newTableName
      })">Create
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DatabaseTable from '@/models/DatabaseTable'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRepo } from 'pinia-orm'

const route = computed(() => useRoute())

const tables = computed(() => useRepo(DatabaseTable).all())

const newTableName = ref('')

onMounted(() => {
  DatabaseTable.fetchAll(route.value.params.project as string)
})
</script>

<style scoped>

</style>