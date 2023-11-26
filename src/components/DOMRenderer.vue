<template>
  <DOMElementRenderer :node="node" class="border p-1 flex flex-col gap-1" @select-component="getSelectedComponent">
    <template v-for="child in node.children" :key="child.id">
      <DOMRenderer :node="child" v-if="child.tag === 'div'" @pass-component="passSelectedComponent"/>
      <DOMElementRenderer :node="child" v-else/>
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

const emit = defineEmits(["passComponent"])

function getSelectedComponent(id: any) {
  console.log("component id received and passed with value " + id)
  passSelectedComponent(id)
}

function passSelectedComponent(id: any) {
  emit("passComponent", id)
}
</script>
