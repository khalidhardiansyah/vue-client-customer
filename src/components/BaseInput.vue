<template>
    <div>
        <label      :for="field" 
                    class="block text-sm font-medium
                       leading-6 text-gray-900">{{ label }}</label>
        <div class="mt-2">
            <Field  :name="field" 
                    :type="field"
                    class="block pl-3 w-full rounded-md border-0 
                    py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-custom-400 sm:text-sm sm:leading-6"  :placeholder="placeholder"/>
        <ErrorMessage 
                    :name="field"
                    class="mt-3 capitalize text-red-500 text-sm "/>
      </div>
    </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate';

defineProps({
    field:{
        type:String,
        required: true
    },
    label:{
        type:String,
    },
    placeholder:{
        type:String,
    }
})
</script>

<style></style>