<template>
  <div class="flex flex-row">
    <DOMRenderer :node="dom" class="grow" @pass-component="selectComponent"/>
    <textarea v-model="selectedComponent.attrs.style" class="grow text-black resize-none outline-none"></textarea>
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
import DOMRenderer from '@/components/DOMRenderer.vue'

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
    innerContent: 'New div 0',
    children: [{
      tag:'div',
      attrs: {
        id: 'newDiv999',
        style: "background-color:#ff5613;color:black;"
      },
      innerContent: 'New div 999',
      children: []
    },{
      tag:'div',
      attrs: {
        id: 'newDivX',
        style: "background-color:#00ff13;color:black;"
      },
      innerContent: 'New div X',
      children: []
    }
    ]
  }]
})

const router = useRouter()
const newDivId = ref(1)
const divSelector = ref(0)
const selectedComponent = ref(dom.value.children[0])
const isFound = ref(false)

function addDiv(){
  dom.value.children.push({
    tag: 'div', 
    innerContent: 'New div ' + newDivId.value.toString(),
    attrs: {
      id: 'newDiv' + newDivId.value.toString(), 
      style: "background-color:#69e5f8;color:black;"
    },
    children: []
  })

  newDivId.value++;
}

function selectComponent(id: String) {
  selectedComponent.value = null
  isFound.value = false
  dom.value.children.forEach((el) => {
    if(selectedComponent.value != null) {
        return
    }
    findComponent(id, el)
    console.log(selectedComponent.value)
    // if(el.children.length > 0) {
    //   selectedComponent.value = findComponent(id, el)
    // }
    // if(el.attrs.id == id) {
    //   selectedComponent.value = el
    // }
  })
  if(selectedComponent.value != null) {
    console.log('selectedComponent id: ' + selectedComponent.value.attrs.id)
    return 
  }
  console.log('No component was found.')
}

function findComponent(id: String, el: any) {
  if(el.attrs.id == id) {
    selectedComponent.value = el
  }
  if(el.children.length > 0) {
    el.children.forEach((child: any) => {
      findComponent(id, child)
    })
  }
  // console.log(el.attrs.id)
}

function showDOMLog(){
  console.log(dom.value.children);
}
</script>
