<template>
  <div v-for="page in pages" :key="page.name" class="flow-root">
    <RouterLink
      v-if="!page.children"
      :to="{
        path: page.to,
      }"
      class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
      >{{ page.name }}</RouterLink
    >
    <Disclosure as="div" v-else class="space-y-1" v-slot="{ open }">
      <DisclosureButton
        class="flex w-full justify-between text-left text-sm font-medium"
      >
        <span>{{ page.name }}</span>
        <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-dark-500"
        />
      </DisclosureButton>
      <DisclosurePanel class="flex flex-col pl-4 pt-4 space-y-6 ml-3">
        <RouterLink
          class="text-sm font-medium text-gray-700 hover:text-gray-800"
          v-for="subItem in page.children"
          :key="subItem.name"
          :to="{
            path: subItem.to,
          }"
        >
          {{ subItem.name }}</RouterLink
        >
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { RouterLink } from "vue-router";
import {
  ChevronUpIcon,
} from "@heroicons/vue/24/outline";
const props = defineProps({
    pages:{
        required: true
    }
})
</script>

