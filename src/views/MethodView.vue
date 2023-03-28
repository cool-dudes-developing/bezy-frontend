<template>
  <h1>method</h1>
  <div class="container" v-if="method">
    <!-- <method-editor-component :blocks="method.blocks" /> -->
    <method-editor/>
  </div>
</template>

<script lang="ts" setup>
import MethodEditorComponent from '@/components/MethodEditorComponent.vue'
import MethodEditor from '@/components/MethodEditor.vue'
import { useRepo } from 'pinia-orm'
import { computed } from 'vue'
import Method from '@/models/Method'
import { useRoute } from 'vue-router'

const route = computed(() => useRoute())

const method = computed(() =>
  useRepo(Method)
    .withAllRecursive()
    .find(route.value.params.method as string)
)
</script>
<style scoped>
.container{
  position: relative;
  width: 600px;
  height: 600px;
}
</style>
