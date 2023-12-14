<template>
  <div class="flex flex-row">
    <DOMRenderer :node="dom" class="grow" @pass-component="selectComponent"/>
    <FrontendElementEditor class="flex flex-col p-2 w-[250px] overflow-hidden">
      <div class="flex flex-row gap-3">
        <div class="flex flex-row gap-3 px-1 w-1/2 h-8 items-center">
          <p>W</p>
          <input 
            class="bg-transparent focus:outline-none overflow-scroll"
            type="text"
            :value="selectedComponentStyle['width']"
            @change ="updateStyle(['width', $event.target.value])">
        </div>
        <div class="flex flex-row gap-3 px-1 w-1/2 h-8 items-center">
          <p>H</p>
          <input 
            class="bg-transparent focus:outline-none overflow-scroll"
            type="text"
            :value="selectedComponentStyle['height']"
            @change ="updateStyle(['height', $event.target.value])">
        </div>
      </div>
      <div class="flex flex-row gap-3">
        <div class="flex flex-row gap-3 px-1 w-1/2 h-8 items-center">
          <p>BGC</p>
          <input 
            class="bg-transparent focus:outline-none overflow-scroll"
            type="text"
            :value="selectedComponentStyle['background-color']"
            @change ="updateStyle(['background-color', $event.target.value])">
        </div>
        <div class="flex flex-row gap-3 px-1 w-1/2 h-8 items-center">
          <p>TC</p>
          <input 
            class="bg-transparent focus:outline-none overflow-scroll"
            type="text"
            :value="selectedComponentStyle['color']"
            @change ="updateStyle(['color', $event.target.value])">
        </div>
      </div>
      <div class="flex flex-row gap-3">
        <div class="flex flex-row gap-3 px-1 w-1/2 h-8 items-center">
          <p>PL</p>
          <input 
            class="bg-transparent focus:outline-none overflow-scroll"
            type="text"
            :value="selectedComponentStyle['padding-left']"
            @change ="updateStyle(['padding-left', $event.target.value])">
        </div>
        <div class="flex flex-row gap-3 px-1 w-1/2 h-8 items-center">
          <p>PR</p>
          <input 
            class="bg-transparent focus:outline-none overflow-scroll"
            type="text"
            :value="selectedComponentStyle['padding-right']"
            @change ="updateStyle(['padding-right', $event.target.value])">
        </div>
      </div>
      <div class="flex flex-row gap-3">
        <div class="flex flex-row gap-3 px-1 w-1/2 h-8 items-center">
          <p>PT</p>
          <input 
            class="bg-transparent focus:outline-none overflow-scroll"
            type="text"
            :value="selectedComponentStyle['padding-top']"
            @change ="updateStyle(['padding-top', $event.target.value])">
        </div>
        <div class="flex flex-row gap-3 px-1 w-1/2 h-8 items-center">
          <p>PB</p>
          <input 
            class="bg-transparent focus:outline-none overflow-scroll"
            type="text"
            :value="selectedComponentStyle['padding-bottom']"
            @change ="updateStyle(['padding-bottom', $event.target.value])">
        </div>
      </div>
      <div class="grow flex flex-col gap-3 justify-end">
        <div class="flex flex-row gap-3">
          <button @click="addDiv" class="bg-blue text-black w-1/2 h-8 px-2 rounded">
            <!-- <svg-icon name="plus-small-blue" class="h-4 w-4" /> -->
            Add div 
          </button>
          <button @click="showDOMLog" class="bg-blue text-black w-1/2 h-8 px-2 rounded">
            <!-- <svg-icon name="clock" class="h-4 w-4" /> -->
            DOM log
          </button>
        </div>
      </div>
    </FrontendElementEditor>
    <!-- <textarea v-model="selectedComponent.attrs.style" class="grow text-black resize-none outline-none"></textarea> -->
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import DOMRenderer from '@/components/DOMRenderer.vue'
import FrontendElementEditor from '@/components/FrontendElementEditor.vue'

const dom = ref({
  tag:'div',
  attrs: {
    id: 'Dom',
    class: 'h-screen'
  },
  children: [
    //{
    // tag:'div',
    // attrs: {
    //   id: 'newDiv0',
    //   style: "background-color:#375613;color:black;width:400px;"
    // },
    // innerContent: 'New div 0',
    // children: [{
    //   tag:'div',
    //   attrs: {
    //     id: 'newDiv999',
    //     style: "background-color:#ff5613;color:black;width:350px;"
    //   },
    //   innerContent: 'New div 999',
    //   children: []
    // },{
    //   tag:'div',
    //   attrs: {
    //     id: 'newDivX',
    //     style: "background-color:#00ff13;color:black;width:350px;"
    //   },
    //   innerContent: 'New div X',
    //   children: []
    // }
    // ]
  //}
]
})

const router = useRouter()
const newDivId = ref(1)
// const divSelector = ref(0)
const strStart = ref()
const strEnd = ref()
const selectedComponent = ref(dom.value.children[0])
const selectedComponentStyle = ref({})

function addDiv() {
  dom.value.children.push({
    tag: 'div', 
    innerContent: 'New div ' + newDivId.value.toString(),
    attrs: {
      id: 'newDiv' + newDivId.value.toString(), 
      style: "background-color:#69e5f8;color:black;width:auto;height:auto;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;"
    },
    children: []
  })

  newDivId.value++;
}

function selectComponent(id: String) {
  selectedComponent.value = null
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
    getComponentStyle()
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

function getComponentStyle() {
  let start = 0
  let end = selectedComponent.value.attrs.style.indexOf(":")
  let key = selectedComponent.value.attrs.style.substring(start, end)
  start = end
  end = selectedComponent.value.attrs.style.indexOf(";", start)
  let value = selectedComponent.value.attrs.style.substring(start+1, end)
  selectedComponentStyle.value[key] = value
  while(true) {
    start = end
    end = selectedComponent.value.attrs.style.indexOf(":", start)
    if(end == -1) {
      break
    }
    key = selectedComponent.value.attrs.style.substring(start+1, end)
    start = end
    end = selectedComponent.value.attrs.style.indexOf(";", start)
    value = selectedComponent.value.attrs.style.substring(start+1, end)
    selectedComponentStyle.value[key] = value
  }
  console.log(selectedComponentStyle.value)
}

function updateStyle(newValue: String) {
  selectedComponentStyle.value[newValue[0]] = newValue[1]
  updateAllStyles()
}

function updateAllStyles() {
  let style = ""
  Object.keys(selectedComponentStyle.value).forEach((key: any) => {
    style += key + ":" + selectedComponentStyle.value[key] +";"
  })
  console.log(style)
  selectedComponent.value.attrs.style = style
}

function showDOMLog(){
  console.log(dom.value.children);
}
</script>
