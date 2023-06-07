<template>
  <div class="flex flex-col items-center justify-center gap-2.5 w-full h-full">
    <form action="" class="flex flex-col gap-2.5" @submit.prevent="create">
      <header class="h-12 font-header text-3xl font-bold text-pink">Create new method</header>
      <InputComponent name="Method name" v-model="name"></InputComponent>
      <label for="description" class="h-[1.375rem] font-label flex items-center text-white"
        >Method description</label
      >
      <textarea
        v-model="description"
        name="description"
        class="p-[0.625rem] w-[100%] h-[7.5rem] bg-transparent backdrop-brightness-75 drop-shadow-sm border border-blue rounded-[0.9375rem] text-white font-input placeholder:text-white active:backdrop-brightness-50 focus:backdrop-brightness-50 transition"
      />
      <input
        type="submit"
        class="flex justify-center items-center h-[2.5rem] button"
        value="Create"
      />
    </form>
  </div>
</template>

<script lang="ts" setup>
import InputComponent from '@/components/InputComponent.vue'
import Method from '@/models/Method'
import { PageSpinnerKey } from '@/symbols'
import { inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const name = ref('')
const description = ref('')
const pageSpinner = inject(PageSpinnerKey)

function create() {
  console.log(route)
  pageSpinner?.show()
  Method.store(route.params.project as string, {
    name: name.value,
    title: name.value,
    description: description.value
  })
    .then(() => {
      router.push({ name: 'methods' })
    })
    .finally(() => pageSpinner?.hide())
}
</script>
