<template>
    <div class="flex min-h-screen flex-1 flex-col  px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-32 w-auto" src="../assets/logo.png" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset your password</h2>
        <p class="text-center text-sm">We will send you an email to reset your password</p>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form :validation-schema="validationSchema" @submit="onSubmit"  class="space-y-6" >
          <BaseAlert v-if="message?.data.error"  type="errorAlert"
                      :title="message?.data.error" 
                      />
                      <BaseAlert  type="successAlert"
                      :title="message?.data.success" 
                       v-else/>
          <BaseInput label="Email address" field="email"/>
          <div>
              <BaseButton type="submit" label="Submit"/>  
          </div>
        </Form>        
      </div>
    </div>
  </template>

<script setup>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseAlert from '../components/BaseAlert.vue';
import {storeToRefs} from "pinia"
import { useAuthStore } from '../stores/auth/auth';
import { Form, } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import {onBeforeMount} from "vue"
const store = useAuthStore();
const {handleRequestResetPassword} = store
const { message} = storeToRefs(store)


const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().nonempty('This is required').email({ message: 'Must be a valid email' }),
  })
);
async function onSubmit(values,{resetForm}) {
  await handleRequestResetPassword(values)
  resetForm();
}

onBeforeMount(()=>{
  message.value = null
})
</script>
  