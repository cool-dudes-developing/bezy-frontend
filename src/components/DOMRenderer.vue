<template>
  <DOMElementRenderer :node="node" @pass-component-id="passComponentId">
    <draggableComponent class="w-full h-full min-w-[20px] min-h-[20px]" v-model="node.children" group="nodes" @start="drag = true" @end="drag = false" item-key="id">
      <template #item="{element}">
        <DOMRenderer :node="element" v-if="element.tag === 'div'" @pass-component-id="passComponentId"/>
        <DOMElementRenderer :node="element" v-else/>
      </template>
      <!-- <template v-for="child in node.children" :key="child.id">
        <DOMRenderer :node="child" v-if="child.tag === 'div'" @pass-component="passSelectedComponent"/>
        <DOMElementRenderer :node="child" v-else/>
      </template> -->
    </draggableComponent>
  </DOMElementRenderer>
</template>
<script setup lang="ts">
import DOMElementRenderer from './DOMElementRenderer.vue'
import draggableComponent from 'vuedraggable'
import { ref } from 'vue'

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})

const drag = ref(false)

const emit = defineEmits(["passComponentId"])

function passComponentId(id: any) {
  // console.log("component id received and passed with value " + id)
  emit("passComponentId", id)
}
</script>
