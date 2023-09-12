<template>
  <div  class="mx-auto max-w-2xl px-4">
    <ul v-if="carts?.length"  class="divide-y divide-gray-200">
      <li v-for="cart in carts" :key="cart.id" class="flex items-center py-6">
        <div
          class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
        >
          <img
            :src="`http://127.0.0.1:8000/${cart.product.thumb[0].path_thumb}`"
            :alt="cart.product.nama_barang"
            class="h-full w-full object-cover object-center"
          />
        </div>
        <div class="ml-4 flex flex-1 flex-col">
          <div>
            <div
              class="flex justify-between text-base font-medium text-gray-900"
            >
              <h3>
                <RouterLink
                  :to="{
                    path: `${cart.product.id}`,
                  }"
                  >{{ cart.product.nama_barang }}</RouterLink
                >
              </h3>
              <p class="ml-4">
                {{
                  cart.product.harga_jual.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                }}
              </p>
            </div>
            <p class="mt-1 text-sm text-gray-500" v-if="cart.stock.size !== 'null'">{{ cart.stock.size }}</p>
          </div>
          <div class="flex flex-1 items-end justify-between text-sm">
            <p class="text-gray-500">Qty {{ cart.jumlah_item }}</p>
            <div class="flex">
              <button
                @click="deleteCart(cart.id)"
                type="button"
                class="font-medium text-blue-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="mx-auto w-fit px-4">
    <h3 class="mx-auto my-5 text-lg">
      Cart anda kosong,
      <RouterLink to="/collections">
        <span class="text-xl font-semibold">
          cari produk disini
        </span></RouterLink
      >
    </h3>
  </div>
    <div v-if="carts?.length" class="border-t border-gray-200 py-6 px-4 sm:px-6">
      <div class="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>
          {{
            subtotal.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })
          }}
        </p>
      </div>
    </div>
    <BaseButton
    v-if="carts?.length"
      size="lg"
      color="primary"
      label="Checkout"
      @click="handleCheckout"
    />
  </div>

</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import BaseButton from "../components/BaseButton.vue"
const props = defineProps({
  carts: {
    required: true,
  },
  subtotal:{
        required: true
    },
   
});
const router = useRouter()
const emit = defineEmits(["deleteCart"]);
function handleCheckout(){
  router.push({
    path:'/checkout' 
  })
}
async function deleteCart(id) {
  emit("deleteCart", id);
}
</script>
