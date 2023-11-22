<template>
  <div>
    <!-- <button @click="addObject" class="bg-blue text-black">
      <svg-icon name="plus-small-blue" class="h-4 w-4" />
      Add div
    </button>
    <div v-for="div in divs" :key="div.id" :style="div.style" draggable="true" class="absolute">
      {{ div.content + div.id }}
    </div> -->

    <DOMRenderer :node="dom"/>
    <button @click="addDiv" class="bg-blue text-black mr-4 h-8 px-2">
      <!-- <svg-icon name="plus-small-blue" class="h-4 w-4" /> -->
      Add div
    </button>
    <button @click="showDOMLog" class="bg-blue text-black mr-4 h-8 px-2">
      <!-- <svg-icon name="clock" class="h-4 w-4" /> -->
      Show DOM log
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import DOMRenderer from '@/components/DOMRenderer.vue';
import SpinnerLoader from '@/components/SpinnerLoader.vue';

const router = useRouter()
const newDivId = ref(0)

function addDiv(){
  dom.value.children.push({
    tag: 'div', 
    innerText: 'New div ' + newDivId.value.toString(),
    attrs: {
      id: 'newDiv' + newDivId.value.toString(), 
      class: 'resize overflow-scroll bg-blue text-black',
    }})

  newDivId.value++;
}

const dom = ref({
  tag:'div',
  attrs: {
    class: 'h-screen'
  },
  children: [{}]
})

function showDOMLog(){
  console.log(dom.value.children);
}
</script>
