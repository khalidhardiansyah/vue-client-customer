<template>
  <Layout>
    <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      <!-- Image gallery -->
      <TabGroup v-if="dataProduct" as="div" class="flex flex-col-reverse">
        <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
          <TabList class="grid grid-cols-4 gap-6">
            <Tab v-for="image in dataProduct.data.thumb"
              class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 "
              v-slot="{ selected }">
              <span class="absolute inset-0 overflow-hidden rounded-md">
                <img :src="`${url}${image.path_thumb}`" alt="" class="h-full w-full object-cover object-center" />
              </span>
              <span :class="[
                selected ? 'ring-custom-500' : 'ring-transparent',
                'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
              ]" aria-hidden="true" />
            </Tab>
          </TabList>
        </div>

        <TabPanels class="aspect-w-1 aspect-h-1 w-full">
          <TabPanel v-for="image in dataProduct.data.thumb">
            <img :src="`${url}${image.path_thumb}`" class="h-full w-full object-cover object-center sm:rounded-lg" />
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <!-- Product info -->
      <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0" v-for="item in dataProduct">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          {{ item.nama_barang }}
        </h1>

        <div class="mt-3">
          <h2 class="sr-only">Product information</h2>
          <p class="text-3xl tracking-tight text-gray-900">
            {{
              item.harga_jual.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
            }}
          </p>
        </div>
        <div class="mt-6">
          <h3 class="sr-only">Description</h3>

          <div class="space-y-6 text-base text-gray-700" />
          <p>
            {{ item.deskripsi }}
          </p>
        </div>
        <div class="mt-8 lg:col-span-5">
          <form @submit="submitForm" v-if="dataProduct.data.stock[0].size !== 'null'">
            <!-- Size picker -->
            <div class="mt-8 mb-5">
              <div class="flex items-center justify-between">
                <h2 class="text-sm font-medium text-gray-900">Size</h2>
                <RouterLink to="/size-guide" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">See sizing
                  chart</RouterLink>
              </div>
              <RadioGroup v-bind="selectedSize" class="mt-2">
                <RadioGroupLabel class="sr-only">
                  Choose a size
                </RadioGroupLabel>
                <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  <RadioGroupOption as="template" name="size" v-for="size in dataProduct.data.stock" :key="size.size"
                    :value="size.id" v-slot="{ active, checked }">
                    <div class="cursor-pointer focus:outline-none" :class="[
                      active ? 'ring-2 ring-offset-2 ring-custom-500' : '',
                      checked
                        ? 'bg-black border-transparent text-white hover:bg-black'
                        : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                      'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1',
                    ]">
                      <RadioGroupLabel as="span">{{
                        size.size
                      }}</RadioGroupLabel>
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
              <ErrorMessage name="selectedSize" class="mt-3 text-red-500 text-sm" />
              <div class="quantity_box mt-5 w-48">
                <h2 class="text-sm font-medium text-gray-900 mb-2">Jumlah</h2>
                <input type="number" name="qty" v-bind="qty"
                  class="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <ErrorMessage name="qty" class="mt-3 text-red-500 text-sm" />
              </div>
            </div>
            <BaseButton :disabled="disablebtn" v-if="isTokenValid" type="submit" label="Add to cart" size="lg" />
            <BaseButton v-else type="button" label="Add to cart" size="lg" @click="router.push('/login')" />
            <span class="my-3 text-red-500 text-sm" v-if="stockMsg">{{
              stockMsg
            }}</span>
            <Notification :content="message.error" />
          </form>
          <Form @submit="onSubmit" :validation-schema="schema2" :initial-values="formValues" v-else>
            <div class="mt-8 mb-5">
              <div class="quantity_box mt-5 w-48">
                <BaseInput label="Jumlah" field="number" />
              </div>
            </div>
            <BaseButton :disabled="disablebtn" v-if="isTokenValid" type="submit" label="Add to cart" size="lg" />
            <BaseButton v-else type="button" label="Add to cart" size="lg" @click="router.push('/login')" />
            <span class="my-3 text-red-500 text-sm" v-if="stockMsg">{{
              stockMsg
            }}</span>
            <Notification :content="message.error" />
          </Form>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { useForm, ErrorMessage, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { useProductsStore } from "../stores/products/products";
import { useCartsStore } from "../stores/Cart/cart";
import { onBeforeMount, watch, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";

import Layout from "../components/Layout.vue";
import BaseButton from "../components/BaseButton.vue";
import Notification from "../components/Notification.vue";
import { useAuthStore } from "../stores/auth/auth";
import router from "../router";
import BaseInput from "../components/BaseInput.vue";

const route = useRoute();
const url = import.meta.env.VITE_IMAGE_URL;
const store = useProductsStore();
const { dataProduct } = storeToRefs(store);
const { fetchProduct } = store;

const authstore = useAuthStore();
const { isTokenValid } = storeToRefs(authstore);

const cartsStore = useCartsStore();
const { isOpen, message } = storeToRefs(cartsStore);
const { createCart, fetchCarts } = cartsStore;

onBeforeMount(async () => {
  await fetchProduct(route.params.id);
});

async function getCarts() {
  await fetchCarts();
}

const schema = toTypedSchema(
  zod.object({
    selectedSize: zod.number().min(1, "Harap pilih salah satu ukuran"),
    qty: zod.number().min(1, "Minimal masukan 1 jumlah").positive(),
  })
);

const schema2 = toTypedSchema(
  zod.object({
    number: zod.number().min(1, "Minimal masukan 1 jumlah").positive(),
  })
);

const { handleSubmit, defineInputBinds, defineComponentBinds, resetForm } =
  useForm({
    initialValues: {
      qty: 1,
      selectedSize: 0,
    },
    validationSchema: schema,
  });

const qty = defineInputBinds("qty");
const selectedSize = defineComponentBinds("selectedSize");
const selectedStock = ref(null);
const disablebtn = ref(false);
const stockMsg = ref();
watch(selectedSize, (newValueSelected) => {
  selectedStock.value = dataProduct.value.data.stock.find(
    (item) => item.id === newValueSelected.modelValue
  );
});

watch(qty, (newSelectedStock) => {
  if (selectedStock.value !== null) {
    if (newSelectedStock.value >= selectedStock.value?.stock) {
      disablebtn.value = true;
      stockMsg.value = "jumlah melebih stock yang tersedia";
    } else {
      disablebtn.value = false;
      stockMsg.value = "";
    }
  }
});

const submitForm = handleSubmit(async (values) => {
  const formData = {
    products_id: dataProduct.value.data.id,
    stocks_id: values.selectedSize,
    jumlah_item: values.qty,
  };
  await createCart(formData);
  resetForm();
  await getCarts();
});

const formValues = {
  number: 1,
};

async function onSubmit(values) {
  const formData = {
    products_id: dataProduct.value.data.id,
    stocks_id: dataProduct.value.data.stock[0].id,
    jumlah_item: values.number,
  };

  await createCart(formData);
  resetForm();
  await getCarts();
}
</script>
