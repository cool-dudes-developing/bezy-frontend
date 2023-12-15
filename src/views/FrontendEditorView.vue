<template>
  <div class="flex flex-row">
    <DOMRenderer :node="dom" class="grow" @pass-component="selectComponent"/>
    <FrontendElementEditor>
      <InputContainer>
        <Input
          label="W" 
          :model-value="selectedComponentStyle['width']"
          @update:model-value="newValue => updateStyle('width', newValue)"/>
        <Input 
          label="H" 
          :model-value="selectedComponentStyle['height']"
          @update:model-value="newValue => updateStyle('height', newValue)"/>
      </InputContainer>
      <InputContainer>
        <Input 
          label="BGC" 
          :model-value="selectedComponentStyle['background-color']"
          @update:model-value="newValue => updateStyle('background-color', newValue)"/>
        <Input 
          label="TC" 
          :model-value="selectedComponentStyle['color']"
          @update:model-value="newValue => updateStyle('color', newValue)"/>
      </InputContainer>
      <!-- <InputContainer>
        <Input 
          label="PL" 
          :model-value="selectedComponentStyle['padding-left']"
          @update:model-value="newValue => updateStyle(['padding-left', newValue])"/>
        <Input 
          label="PR" 
          :model-value="selectedComponentStyle['padding-right']"
          @update:model-value="newValue => updateStyle(['padding-right', newValue])"/>
      </InputContainer>
      <InputContainer>
        <Input 
            label="PT" 
            :model-value="selectedComponentStyle['padding-top']"
            @update:model-value="newValue => updateStyle(['padding-top', newValue])"/>
        <Input 
            label="PB" 
            :model-value="selectedComponentStyle['padding-bottom']"
            @update:model-value="newValue => updateStyle(['padding-bottom', newValue])"/>
      </InputContainer> -->
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
import Input from '@/components/FrontendElementEditorInput.vue'
import InputContainer from '@/components/FrontendElementEditorInputContainer.vue'

const dom = ref({
  tag: 'div',
  attrs: {
    id: 'Dom',
    class: 'h-screen'
  },
  children: [
    {
      tag: 'div',
      innerContent: 'Test div',
      attrs: {
        id: 'testDiv',
        style: 
          'width:auto;'+
          'height:auto;'+ 
          'background-color:#69e5f8;'+
          'color:black;'
      },
      children: []
    }
]
})

const router = useRouter()
const newDivId = ref(0)
const isNewSelected = ref(false)
const selectedComponent = ref(dom.value.children[0])
type Style = { [propKey: string]: string }
const selectedComponentStyle = ref<Style>({})

function addDiv() {
  dom.value.children.push({
    tag: 'div', 
    innerContent: 'New div ' + newDivId.value.toString(),
    attrs: {
      id: 'newDiv' + newDivId.value.toString(), 
      style:
        'width:auto;'+
        'height:auto;'+
        'background-color:#69e5f8;'+
        'color:black;'
    },
    children: []
  })
  newDivId.value++;
}

function selectComponent(id: String) {
  isNewSelected.value = false
  dom.value.children.forEach((el) => {
    if(isNewSelected.value) {
        return
    }
    findComponent(id, el)
    console.log(selectedComponent.value)
  })
  if(isNewSelected.value) {
    getComponentStyle()
    console.log('selectedComponent id: ' + selectedComponent.value.attrs.id)
    return 
  }
  console.log('No component was found.')
}

function findComponent(id: String, el: any) {
  if(el.attrs.id == id) {
    selectedComponent.value = el
    isNewSelected.value = true
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

function updateStyle(key: string, value: string) {
  selectedComponentStyle.value[key] = value
  updateAllStyles()
}

function updateAllStyles() {
  let style = ""
  Object.keys(selectedComponentStyle.value).forEach((key: string) => {
    style += key + ":" + selectedComponentStyle.value[key] +";"
  })
  console.log(style)
  selectedComponent.value.attrs.style = style
}

function showDOMLog(){
  console.log(dom.value.children);
}
</script>
