<template>
  <nav
    class="flex items-center justify-between bg-neutral-100"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700">
        Showing
        {{ " " }}
        <span class="font-medium">{{ currentPage }}</span>
        {{ " " }}
        to
        {{ " " }}
        <span class="font-medium">{{ lastPageSize }}</span>
        {{ " " }}
        of
        {{ " " }}
        <span class="font-medium">{{ totaldata }}</span>
        {{ " " }}
        results
      </p>
    </div>
    <div class="flex flex-1 justify-between sm:justify-end">
      <button
        @click="prevPage"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Previous
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage === lastPageSize"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
    currentPage:{
        required: true
    },
    lastPageSize:{
        required: true
    },
    totaldata:{
        required: true
    },
})

const emit = defineEmits(["prevPage", "nextPage"]);

function prevPage(params) {
    emit("prevPage")
}

function nextPage(params) {
    emit("nextPage")
}
</script>
