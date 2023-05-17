<template>
  <div>
    <h1>method</h1>
    <div class="w-full" v-if="method && !pageSpinner?.visible.value">
      <!-- <method-editor-component :blocks="method.blocks" /> -->
      <method-editor />
      <pre>{{ method }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MethodEditor from '@/components/MethodEditor.vue'
import { useRepo } from 'pinia-orm'
import { computed, inject } from 'vue'
import Method from '@/models/Method'
import { useRoute } from 'vue-router'
import { PageSpinnerKey } from '@/symbols'
import Block from '@/models/Block'

const route = computed(() => useRoute())
const pageSpinner = inject(PageSpinnerKey)

const method = computed(() =>
  useRepo(Method)
    .with('blocks', (q) => q.with('outPorts').with('inPorts'))
    .find(route.value.params.method as string)
)

pageSpinner?.show()
Promise.all([
  Method.fetch(route.value.params.project as string, route.value.params.method as string),
  Block.fetchAllTemplates()
]).finally(() => pageSpinner?.hide())
</script>
