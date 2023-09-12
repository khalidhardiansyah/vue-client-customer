<script setup>


const props = defineProps({
    label: {
        type: [String, Number],
        default: null,
    },
    size:{
        default: 'default'
    },
    color:{
        default: 'primary'
    },
    // icon: {
    //     type: String,
    //     default: null,
    // },
    // color: {
    //     type: String,
    //     default: "white",
    // },
    disabled: Boolean,
});

const BaseClass = ["flex w-full justify-center", 
                    "rounded-md border border-transparent",
                    "text-sm font-semibold",
                    "leading-6 shadow-sm focus-visible:outline",
                    "focus:ring-2 focus:ring-offset-2",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",]
const SizeClass = [
    props.size === 'default'?'px-3 py-1.5':'',
    props.size === 'lg'?'py-2 px-4':'',
]

const ColorClass=[
    props.color === 'primary'     ?   'text-white bg-custom-500 hover:bg-custom-400 focus-visible:outline-custom-400' : '',
    props.color === 'secondary'    ?   'bg-indigo-600 text-white hover:bg-indigo-700  focus:ring-indigo-500  focus:ring-offset-gray-50'   :  ''
]
</script>

<template>
    <button 
    :disabled="disabled"
    :class="[BaseClass, SizeClass, ColorClass]"
    >
        {{ label }}
    </button>
</template>
