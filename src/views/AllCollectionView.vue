<template>
     <BaseTitle
     title="All Products"
     />

      <div class="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-y-10 sm:gap-x-6 lg:gap-x-8">
        <ProductCart :products="smallList"/>
      </div>
            <div class="pagination border-t border-gray-200" v-if="smallList.length >= pageSize">
        <div class="px-8 py-5">
          <Pagination :last-page-size="lastPageSize" :current-page="currentPage" :totaldata="listdata.length" @prevPage="prevPage"
@nextPage="nextPage"/>
        </div>
      </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import ProductCart from "../components/ProductCart.vue"
import {useProductsStore} from "../stores/products/products"
import { usePagination } from '../composables/pagination/pagination';
import Pagination from "../components/Pagination.vue"

import { onBeforeMount } from 'vue';
import BaseTitle from '../components/BaseTitle.vue';

const store  = useProductsStore();
const {dataProducts} = storeToRefs(store)
const {fetchProducts} = store
onBeforeMount(async()=>{
await fetchProducts();
setlistdata(dataProducts.value);
})

const {
  listdata,
  currentPage,
  pageSize,
  smallList,
  maxPage,
  nextPage,
  prevPage,
  setlistdata,
  lastPageSize
} = usePagination({ pageSize: 16});
</script>

