<template>
     <div class="sm:flex sm:items-baseline sm:justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ title }}</h2>
      </div>
</template>

<script setup>

const props = defineProps({
    title:{
        required: true
    }
})
</script>