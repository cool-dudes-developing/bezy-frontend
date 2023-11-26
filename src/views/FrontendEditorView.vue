<template>
  <div class="flex flex-row">
    <DOMRenderer :node="dom" class="grow" @pass-component="selectComponent"/>
    <textarea v-model="dom.children[divSelector].attrs.style" class="grow text-black resize-none outline-none"></textarea>
    <div class="flex flex-col gap-3">
      <button @click="addDiv" class="bg-blue text-black h-8 px-2">
        <!-- <svg-icon name="plus-small-blue" class="h-4 w-4" /> -->
        Add div 
      </button>
      <button @click="showDOMLog" class="bg-blue text-black h-8 px-2">
        <!-- <svg-icon name="clock" class="h-4 w-4" /> -->
        Show DOM log
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import DOMRenderer from '@/components/DOMRenderer.vue';
import SpinnerLoader from '@/components/SpinnerLoader.vue';

const router = useRouter()
const newDivId = ref(1)
const divSelector = ref(0)

function addDiv(){
  dom.value.children.push({
    tag: 'div', 
    innerText: 'New div ' + newDivId.value.toString(),
    attrs: {
      id: 'newDiv' + newDivId.value.toString(), 
      style: "background-color:#69e5f8;color:black;",
      class: "resize overflow-scroll"
    }})

  newDivId.value++;
}

function selectComponent(id: any) {
  dom.value.children.forEach((el, index) => {
    if(el.attrs.id == id){
      divSelector.value = index
    }
  })
  console.log('divSelector value: ' + divSelector.value)
}

const dom = ref({
  tag:'div',
  attrs: {
    id: 'Dom',
    class: 'h-screen'
  },
  children: [{
    tag:'div',
    attrs: {
      id: 'newDiv0',
      style: "background-color:#375613;color:black;"
    },
    innerText: 'New div 0'
  }]
})

function showDOMLog(){
  console.log(dom.value.children);
}
</script>
