<template>
  <div>
    <button @click="addObject" class="bg-blue text-black">
      <svg-icon name="plus-small-blue" class="h-4 w-4" />
      Add div
    </button>
    <div v-for="div in divs" :key="div.id" :style="div.style">{{ div.content }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const object = {
  id: '1',
  type: 'div',
  content: 'prekol',
  style: {
    width: '100px',
    height: '100px',
    'background-color': 'blue'
  }
}

const divs = ref([
  {
    id: '0',
    type: 'div',
    content: 'test',
    style: {
      width: '100px',
      height: '100px',
      'background-color': 'blue'
    }
  }
])

const router = useRouter()

function addObject() {
  if (object.type == 'div') {
    divs.value.push(object)
    object.id += 1
  }
}
</script>
