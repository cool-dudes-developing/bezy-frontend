<template>
    <div class="w-1/2 h-8 px-1 gap-3 items-center flex flex-row">
        <p>{{ props.label }}</p>
        <input 
        class="bg-transparent focus:outline-none overflow-scroll"
        type="text"
        :value="modelValue"
        @change ="$emit('update:modelValue', $event?.target?.value)">
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    label: {
        type: String,
        required: true
    },
    // property: {
    //     type: String,
    //     required: true
    // },
    modelValue: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])
</script>