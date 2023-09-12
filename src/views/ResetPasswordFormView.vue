<template>
  <div
    class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-32 w-auto"
        src="../assets/logo.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Change your Password
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form
        :validation-schema="validationSchema"
        @submit="onSubmit"
        class="space-y-6"
      >
        <BaseAlert
          v-if="message?.data.error"
          type="errorAlert"
          :title="message?.data.error"
        />
        <BaseAlert type="successAlert" :title="message?.data.success" v-else />
        <BaseInput label="Password" field="password" />

        <div>
          <label
            for="Password confirmation"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password confirmation</label
          >
          <div class="mt-2">
            <Field
              name="confpassword"
              type="password"
              class="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-950 sm:text-sm sm:leading-6"
            />
          <div class="flex flex-col">
            <ErrorMessage name="confpassword" class="mt-3 capitalize text-red-500 text-sm" />
            <ErrorMessage name="confirm" class="mt-3 text-red-500 text-sm" />
          </div>

          </div>
        </div>
        <div>
          <BaseButton type="submit" label="Update Password" />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "../components/BaseButton.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseAlert from "../components/BaseAlert.vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth/auth";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import {onBeforeMount} from "vue"

const store = useAuthStore();
const { handleUpdatePassword } = store;
const { message } = storeToRefs(store);

const route = useRoute();
const validationSchema = toTypedSchema(
  zod
    .object({
      password: zod
        .string()
        .nonempty({ message: "wajib diisi" })
        .min(6, { message: "Too short" }),
      confpassword: zod
        .string()
        .nonempty({ message: "wajib diisi" })
        .min(6, { message: "Too short" }),
    })
    .refine((val) => val.password === val.confpassword,{
      message: "Passwords tidak sesuai",
      path: ["confirm"], // path of error
    })
);
async function onSubmit(values, {resetForm}) {
  await handleUpdatePassword({
    token:route.params.token,
    password:values.password
  });
  resetForm();
}
onBeforeMount(()=>{
  message.value =null
})
</script>
