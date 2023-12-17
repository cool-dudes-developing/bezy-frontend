<template>
  <DOMElementRenderer 
    :node="node" 
    @pass-component-id="passComponentId"
  >
    <DraggableComponent
      :class="globalStates.draggableComponentStyles" 
      v-model="node.children" 
      group="nodes" 
      item-key="id"
      @start="startDrag" 
      @end="endDrag"
      >
      <template #item="{element}">
        <DOMRenderer 
          :node="element" 
          v-if="element.tag === 'div'" 
          @pass-component-id="passComponentId"
        />
        <DOMElementRenderer 
          :node="element" 
          v-else
        />
      </template>
    </DraggableComponent>
  </DOMElementRenderer>
</template>
<script setup lang="ts">
import DOMElementRenderer from './DOMElementRenderer.vue'
import DraggableComponent from 'vuedraggable'
import { ref } from 'vue'
import { globalStates } from '@/global-states'

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  "passComponentId"
])

const drag = ref(false)

function passComponentId(id: string) {
  // console.log("component id received and passed with value " + id)
  emit("passComponentId", id)
}

function startDrag() {
  drag.value = true
  globalStates.draggableComponentStyles = 
    // 'w-full '+ 
    // 'h-full '+
    'min-w-[20px] '+
    'min-h-[20px] '+
    'border '+
    'border-dashed '+
    'border-black '+
    'm-1 '
}

function endDrag() {
  drag.value = false
  globalStates.draggableComponentStyles = ''
}
</script>
