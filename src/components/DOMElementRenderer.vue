<template>
  <component :is="node.tag" v-bind="node.attrs">
    <slot>
      {{ node.innerText }}
    </slot>
  </component>
</template>
<script setup lang="ts">
const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})
</script>
