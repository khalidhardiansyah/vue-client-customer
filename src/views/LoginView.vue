<template>
    <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-32 w-auto" src="../assets/logo.png" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form :validation-schema="validationSchema" @submit="onSubmit"  class="space-y-6" >
          <BaseAlert  type="errorAlert"
                      :title="message?.data.message" 
                      />
          <BaseInput label="Email address" field="email"/>
          <BaseInput label="Password" field="password"/>
          <div class="pb-2">
              <BaseButton type="submit" label="Sign in"/>  
          </div>
          <RouterLink to="/recover" class="text-sm  leading-6 text-gray-500" >Forgot your password</RouterLink>
        
        </Form>
        <p class="mt-10 text-center text-sm text-gray-500">
          Belum punya akun?
          {{ ' ' }}
          <RouterLink to="register" class="font-semibold leading-6 text-stone-800 hover:text-stone-500" >Daftar disini</RouterLink>
        </p>
        
      </div>
    </div>
  </template>

<script setup>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseAlert from '../components/BaseAlert.vue';
import { useRouter } from 'vue-router';
import {storeToRefs} from "pinia"
import { useAuthStore } from '../stores/auth/auth';
import { Form, } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const store = useAuthStore();
const {handleLogin} = store
const {isLoggedIn, message, user} = storeToRefs(store)

const router = useRouter()
const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().nonempty('This is required').email({ message: 'Must be a valid email' }),
    password: zod.string().nonempty('This is required').min(6, { message: 'Too short' }),
  })
);
async function onSubmit(values) {
  await handleLogin(values);
  if (isLoggedIn.value && user.value.role_id ==="customer") {
      await router.push("/");      
  }else{
 
  }
}
</script>
  