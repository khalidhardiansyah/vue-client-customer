<template>
    <component :is="icon" class="h-7 w-7 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
</template>

<script setup>
defineProps({
    icon:{
        required: true
    }
})
</script>