
<template>
    <div v-if="title" class="rounded-md p-4" :class="[
        type === 'successAlert' ? 'bg-green-50' : '',
        type === 'errorAlert' ? 'bg-red-50' : ''
    ]">
        <div class="flex">
            <div class="flex-shrink-0">
                <component :is="typeIcon" class="h-5 w-5 " aria-hidden="true" :class="[
                    type === 'successAlert' ? 'text-green-400' : '',
                    type === 'errorAlert' ? 'text-red-400' : ''
                ]" />
            </div>
            <div class="ml-3 w-fit">
                <h3 class="text-sm font-medium capitalize" :class="[
                    type === 'successAlert' ? 'text-green-800' : '',
                    type === 'errorAlert' ? 'text-red-800' : ''
                ]" v-if="title">{{ title }}</h3>
                <div class="mt-2 text-sm capitalize" :class="[
                    type === 'successAlert' ? 'text-green-700' : '',
                    type === 'errorAlert' ? 'text-red-700' : ''
                ]" v-if="description">
                    <p>{{ description }}</p>
                </div>
                <div class="mt-4" v-if="navigation">
                    <BaseButtons noWrap>
                        <BaseButton @click="close" label="close" />
                        <BaseButton @click="showDetail" label="view details" />
                    </BaseButtons>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/20/solid'
import BaseButtons from './BaseButtons.vue';
import BaseButton from './BaseButton.vue';
import { computed, ref } from 'vue';

const props = defineProps({
    title: {
        type: String,

    },
    description: {
        type: String,
  
    },
    type: {
        required: true
    },
    navigation: {
        type: Boolean
    }
})

const typeIcon = computed(() => {
    if (props.type == "errorAlert") {
        return XCircleIcon
    } else if (props.type == "successAlert") {
        return CheckCircleIcon
    }
})

const isOpen = ref(false)

function close(params) {
    isOpen.value = !isOpen.value
}

function showDetail(params) {

}
</script>