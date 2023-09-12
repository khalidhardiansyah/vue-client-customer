<template>
  <Layout>
    <BaseTitle title="Kelola Profile" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 gap-x-9 mt-3">
      <div class="form1 border rounded-lg px-10 py-5">
        <h3 class="mb-2 font-bold text-lg">
          Profile
        </h3>
        <form @submit="handleProfile" class="space-y-6">
          <BaseAlert type="successAlert" :title="message.data?.success_update_customer" />

          <BaseAlert type="errorAlert" :title="message.message" />
          <BaseInput v-bind="name" label="Nama" field="name" />
          <BaseInput v-bind="email" label="Email" field="email" />
          <BaseInput v-bind="phone" label="No Handphone" field="phone" />
          <div class="grid grid-cols-2 gap-3">
            <BaseInput v-bind="alamat" label="Alamat Detail" field="alamat" />
            <BaseInput v-bind="post" label="Kode Post" field="post" />
          </div>
          <BaseSelectOption v-bind="selectedprovinsi" label="Pilih Provinsi" field="provinsi" :options="dataprovinsi"
            optKey="id" optLabel="name" optValue="id" />
          <BaseSelectOption v-bind="selectedkabupaten" label="Pilih Kabupaten" field="kabupaten" :options="datakabupaten"
            optKey="id" optLabel="name" optValue="id" />
          <BaseSelectOption v-bind="selectedkecamatan" label="Pilih Kecamatan" field="kecamatan" :options="datakecamatan"
            optKey="id" optLabel="name" optValue="id" />
          <BaseSelectOption v-bind="selectedkelurahan" label="Pilih Kelurahan" field="kelurahan" :options="datakelurahan"
            optKey="id" optLabel="name" optValue="id" />
          <div>
            <BaseButton type="submit" label="Perbarui profile" />
          </div>
        </form>
      </div>

      <div class="form2 border rounded-lg px-10 py-5">
        <h3 class="mb-2 font-bold text-lg">
          Password
        </h3>
        <Form :validation-schema="validationSchema" @submit="onSubmit" class="space-y-6">
          <BaseAlert type="successAlert" :title="message.data?.success_password" />
          <BaseInput label="Password" field="password" />
          <div>
          <label
            for="Password confirmation"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password confirmation</label
          >
          <div class="">
            <Field
              name="confpassword"
              type="password"
              class="block pl-3 w-full rounded-md border-0 
                    py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-custom-400 sm:text-sm sm:leading-6"
            />

          <div class="flex flex-col">
            <ErrorMessage name="confpassword" class="mt-3 capitalize text-red-500 text-sm" />
            <ErrorMessage name="confirm" class="mt-3 text-red-500 text-sm" />

          </div>

          </div>
        </div>
          <div>
            <BaseButton type="submit" label="Perbarui password" />
          </div>
        </Form>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "../components/Layout.vue";
import BaseTitle from "../components/BaseTitle.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseAlert from "../components/BaseAlert.vue";
import BaseSelectOption from "../components/BaseSelectOption.vue"
import { watch, onBeforeMount } from "vue";
import { storeToRefs } from "pinia"
import { useForm, Form, Field,ErrorMessage} from "vee-validate";
import { useAlamatStore } from "../stores/alamat/alamat";
import { useUserStore } from "../stores/user/user"
import { useAuthStore } from "../stores/auth/auth"
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";


const store = useAlamatStore();
const { dataprovinsi, datakabupaten, datakecamatan, datakelurahan } =
  storeToRefs(store);
const { fetchProvinsi, fetchKabupaten, fetchKecamatan, fetchKelurahan } = store;

const authstore = useAuthStore();
const { user } = storeToRefs(authstore)

const userstore = useUserStore()
const { message } = storeToRefs(userstore)
const { handleUpdatePassword, handleUpdateProfile } = userstore

const schema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .nonempty({ message: "Wajib untuk diisi" })
      .email({ message: "Must be a valid email" }).default(user.value.email),
    name: zod
      .string()
      .nonempty({ message: "Wajib untuk diisi" })
      .min(8, { message: "Terlalu pendek" }).default(user.value.name),
    phone: zod.string().refine((value) => /^08[1-9]\d{7,10}$/.test(value), {
      message: "Nomor handphone tidak valid",
    }).default(user.value.no_hp),
    provinsi: zod.number().default(parseInt(user.value.alamat[0].provinsi.id)),
    kabupaten: zod.number().default(parseInt(user.value.alamat[0].kabupaten.id)),
    kecamatan: zod.number().default(parseInt(user.value.alamat[0].kecamatan.id)),
    kelurahan: zod.number().default(parseInt(user.value.alamat[0].kelurahan.id)),
    alamat: zod
      .string()
      .nonempty({ message: "Wajib untuk diisi" })
      .min(8, { message: "Terlalu pendek" }).default(user.value.alamat[0].alamat_detail),
    post: zod
      .string().nonempty({ message: "Wajib untuk diisi" }).refine((value) => /^[0-9]{5}$/.test(value), {
        message: "Kode pos harus terdiri dari 5 digit angka.",
      }).default(user.value.alamat[0].kode_pos),
  })
);

const { handleSubmit, defineInputBinds } = useForm({
  validationSchema: schema

});

const selectedprovinsi = defineInputBinds("selectedprovinsi")
const selectedkabupaten = defineInputBinds("selectedkabupaten")
const selectedkecamatan = defineInputBinds("selectedkecamatan")
const selectedkelurahan = defineInputBinds("selectedkelurahan")
const name = defineInputBinds("name")
const email = defineInputBinds("email")
const phone = defineInputBinds("phone")
const alamat = defineInputBinds("alamat")
const post = defineInputBinds("post")

watch(() => selectedprovinsi.value.value, async (idProvinsi) => {
  await fetchKabupaten(idProvinsi)
})

watch(() => selectedkabupaten.value.value, async (idKabupaten) => {
  await fetchKecamatan(idKabupaten)
})

watch(() => selectedkecamatan.value.value, async (idKecamatan) => {
  await fetchKelurahan(idKecamatan)
})

const handleProfile = handleSubmit(async (values) => {
  const data = {
    email: values.email,
    name: values.name,
    no_hp: values.phone,
    provinsi_id: values.provinsi,
    kabupaten_id: values.kabupaten,
    kecamatan_id: values.kecamatan,
    kelurahan_id: values.kelurahan,
    alamat_detail: values.alamat,
    kode_pos: values.post,
  }
  await handleUpdateProfile(data)

});

const validationSchema = toTypedSchema(
  zod.object({
    password: zod.string().nonempty({ message: "Wajib untuk diisi" }).min(6, { message: 'Too short' }),
    confpassword: zod
        .string()
        .nonempty({ message: "wajib diisi" })
        .min(6, { message: "Too short" }),
    })
    .refine((val) => val.password === val.confpassword,{
      message: "Passwords tidak sesuai",
      path: ["confirm"], // path of error
    })
)


const onSubmit = (async (values, { resetForm }) => {
  await handleUpdatePassword(values);
  resetForm()
})
onBeforeMount(async () => {
  await fetchProvinsi();
  await fetchKabupaten(user.value.alamat[0].provinsi.id)
  await fetchKecamatan(user.value.alamat[0].kabupaten.id)
  await fetchKelurahan(user.value.alamat[0].kecamatan.id)
});
</script>
