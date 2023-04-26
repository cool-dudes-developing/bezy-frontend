<template>
  <div class="flex flex-col gap-2.5 px-5 py-7">
    <div class="flex flex-col gap-2.5">
      <header class="h-12 font-header text-3xl font-bold text-pink">Recent</header>
      <div class="flex flex-row gap-2.5">
        <HubComponent link="/projects/create" primaryText="Create new project"></HubComponent>
        <HubComponent
          link="/projects/test"
          primaryText="Test project"
          secondaryText="Open project"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HubComponent from '@/components/HubComponent.vue'
</script>
