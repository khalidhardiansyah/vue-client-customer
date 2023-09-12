<template>
  <Layout>
    <div class="min-h-screen px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-32 w-auto"
          src="../assets/logo.png"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Create account
        </h2>
      </div>
      <div class="mt-10 grid grid-cols-1 gap-2 sm:mx-auto sm:w-[55rem]">
        <Form
          :validation-schema="validationSchema"
          @submit="onSubmit"
          class="space-y-6"
        >
        <BaseAlert
          v-if="message?.data.message"
          type="errorAlert"
          :title="message?.data.message"
        />
        
        <BaseAlert type="successAlert" :title="message?.data.success" v-else />
          <BaseInput label="Nama Lengkap" field="name" />
          <div class="grid grid-cols-2 gap-3">
            <BaseInput label="Email" field="email" />
            <BaseInput label="Password" field="password" />
          </div>
          <BaseInput label="Nomor Telephone" field="phone" />

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <BaseSelectOption
              v-bind="selectedprovinsi"
              label="Pilih Provinsi"
              field="provinsi"
              :options="dataprovinsi"
              optKey="id"
              optLabel="name"
              optValue="id"
            />
            <BaseSelectOption
              v-bind="selectedkabupaten"
              label="Pilih Kabupaten"
              field="kabupaten"
              :options="datakabupaten"
              optKey="id"
              optLabel="name"
              optValue="id"
            />
            <BaseSelectOption
              v-bind="selectedkecamatan"
              label="Pilih Kecamatan"
              field="kecamatan"
              :options="datakecamatan"
              optKey="id"
              optLabel="name"
              optValue="id"
            />
            <BaseSelectOption
              v-bind="selectedkelurahan"
              label="Pilih Kelurahan"
              field="kelurahan"
              :options="datakelurahan"
              optKey="id"
              optLabel="name"
              optValue="id"
            />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <BaseInput label="Alamat Detail" field="alamat" />
            <BaseInput label="Kode Post" field="post" />
          </div>
          <div class="">
            <BaseButton type="submit" label="Register" />
          </div>
        </Form>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "../components/Layout.vue";
import BaseSelectOption from "../components/BaseSelectOption.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseAlert from "../components/BaseAlert.vue";
import { Form, useForm} from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { onBeforeMount, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAlamatStore } from "../stores/alamat/alamat";
import { useAuthStore } from "../stores/auth/auth";

const store = useAlamatStore();
const { dataprovinsi, datakabupaten, datakecamatan, datakelurahan } =
  storeToRefs(store);
const { fetchProvinsi, fetchKabupaten, fetchKecamatan, fetchKelurahan } = store;

const authstore = useAuthStore();
const {handleRegister} = authstore;
const {message} = storeToRefs(authstore)


const { defineInputBinds } = useForm();

const selectedprovinsi = defineInputBinds("selectedprovinsi")
const selectedkabupaten = defineInputBinds("selectedkabupaten")
const selectedkecamatan = defineInputBinds("selectedkecamatan")
const selectedkelurahan = defineInputBinds("selectedkelurahan")

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .nonempty({message:"Wajib untuk diisi"})
      .email({ message: "Must be a valid email" }),
    password: zod
      .string()
      .nonempty({message:"Wajib untuk diisi"})
      .min(6, { message: "Terlalu pendek" }),
    name: zod
      .string()
      .nonempty({message:"Wajib untuk diisi"})
      .min(8, { message: "Terlalu pendek" }),
    phone: zod.string().refine((value) => /^08[1-9]\d{7,10}$/.test(value), {
  message: "Nomor handphone tidak valid",
}),
    provinsi: zod.number(),
    kabupaten: zod.number(),
    kecamatan: zod.number(),
    kelurahan: zod.number(),
    alamat: zod
      .string()
      .nonempty({message:"Wajib untuk diisi"})
      .min(8, { message: "Terlalu pendek" }),
    post: zod
      .string().nonempty({message:"Wajib untuk diisi"}).refine((value) => /^[0-9]{5}$/.test(value), {
  message: "Kode pos harus terdiri dari 5 digit angka.",
})     
      
  })
);
async function onSubmit(values, {resetForm}) {
  const data = {
    email: values.email,
    password: values.password,
    name: values.name,
    no_hp: values.phone,
    provinsi_id: values.provinsi,
    kabupaten_id: values.kabupaten,
    kecamatan_id: values.kecamatan,
    kelurahan_id: values.kelurahan,
    alamat_detail: values.alamat,
    kode_pos: values.post,
    role_id:1
  }
  await handleRegister(data);
  resetForm()

}

watch(()=>selectedprovinsi.value.value,async(idProvinsi)=>{
  await fetchKabupaten(idProvinsi)
})

watch(()=>selectedkabupaten.value.value, async(idKabupaten)=>{
  await fetchKecamatan(idKabupaten)
})

watch(()=>selectedkecamatan.value.value, async(idKecamatan)=>{
  await fetchKelurahan(idKecamatan)
})
onBeforeMount(async()=>{
  await fetchProvinsi();

});
</script>
