<template>
    <div>
        <label :for="field" class="block text-sm font-medium
                       leading-6 text-gray-900">{{ label }}</label>
        <div class="mt-2">
            <Field v-slot="{value, }" :name="field" as="select" class="block w-full rounded-md border-0 
                    py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="" disabled>-- Pilih --</option>
                <option v-for="option in options" :key="option[optKey]"  :value="option[optValue]" v-bind:selected="value" >{{ option[optLabel] }}</option>
            </Field>
            <ErrorMessage :name="field" class="mt-3 text-red-500 text-sm " />
        </div>
    </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate';

defineProps({
    field: {
        type: String,
        required: true
    },
    label: {
        type: String,
    },
    options:{
        required: true,
    },
    optKey:{
        required: true,
    },
optValue:{
        required: true,
    },
optLabel:{
        required: true,
    },

})
</script>

<style></style>