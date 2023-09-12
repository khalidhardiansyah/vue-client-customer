<template>
  <div v-for="product in products" :key="product.id" class="group relative ">
    <div class="box-top absolute z-10 rounded-xl py-1 px-3 top-2 right-2 bg-white">
      <span class="text-custom font-semibold tracking-wide capitalize">
        {{ product.category.nama_category }}
      </span>
    </div>
    <div
      class="h-80 w-full overflow-hidden rounded-lg group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-auto"
    >
   
      <img
        :src="`${url}${product.thumb[0].path_thumb}`"
        :alt="product.nama_barang"
        class="h-full w-full object-cover object-center transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-hover:hidden"
      />
      <img
        :src="`${url}${product.thumb[1].path_thumb}`"
        :alt="product.nama_barang"
        class="h-full w-full object-cover object-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:block"
      />
    </div>

    <h3 class="mt-4 text-base font-semibold text-gray-900">
      <RouterLink :to="{
        path:`/product/${product.id}`
      }">
        <span class="absolute inset-0" />
        {{ product.nama_barang }}     
      </RouterLink>
    </h3>
    <p class="mt-1 text-sm text-gray-500">Harga {{ product.harga_jual.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</p>
  </div>
</template>

  

<script setup>

const url = import.meta.env.VITE_IMAGE_URL;

const props = defineProps({
    products:{
        required: true
    }
})
</script>
