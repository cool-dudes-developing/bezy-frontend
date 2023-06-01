<template>
  <DOMElementRenderer :node="node" class="border p-1 flex flex-col gap-1">
    <template v-for="child in node.children" :key="child.id">
      <DOMRenderer :node="child" v-if="child.tag === 'div'" />
      <DOMElementRenderer :node="child" v-else />
    </template>
  </DOMElementRenderer>
</template>
<script setup lang="ts">
import DOMElementRenderer from './DOMElementRenderer.vue'

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})
</script>
