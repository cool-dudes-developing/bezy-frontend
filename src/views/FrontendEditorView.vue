<template>
  <div>
    <button @click="addObject" class="bg-blue text-black">
      <svg-icon name="plus-small-blue" class="h-4 w-4" />
      Add div
    </button>
    <div v-for="div in divs" :key="div.id" :style="div.style" draggable="true" class="absolute">
      {{ div.content + div.id }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const object = {
  id: 1,
  type: 'div',
  content: 'test',
  style: {
    width: '100px',
    height: '100px',
    'background-color': 'lime'
  }
}

const divs = ref([
  {
    id: 0,
    type: 'div',
    content: 'test',
    style: {
      width: '100px',
      height: '100px',
      'background-color': 'blue'
    }
  }
])

function addObject() {
  if (object.type == 'div') {
    divs.value.push(object)
    object.id += 1
  }
}
</script>
