<template>
  <component :is="node.tag" v-bind="node.attrs" @click.stop="getComponentId">
    {{ node.innerContent }}
    <slot>
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

const emit = defineEmits(["selectComponent"])

function getComponentId() {
  if(props.node.attrs.id != 'Dom'){
    console.log('component id emmited with value ' + props.node.attrs.id)
    emit("selectComponent", props.node.attrs.id)
  }
}
</script>
