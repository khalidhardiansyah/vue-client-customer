<template>
    <BaseTitle
    v-if="dataCategory"
    :title="dataCategory.nama_category"
    />
     <div class="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-y-10 sm:gap-x-6 lg:gap-x-8" >
        <ProductCart  :products="smallList" />
          <div class="pagination border-t border-gray-200" v-if="smallList.length >= pageSize">
          <div class="px-8 py-5">
            <Pagination :last-page-size="lastPageSize" :current-page="currentPage" :totaldata="listdata.length" @prevPage="prevPage"
  @nextPage="nextPage"/>
          </div>
        </div>
      
<div class="min-h-screen" v-if="dataCategory?.products.length === 0">
  <h3 class="text-lg ">
    Produk masih kosong
  </h3>
</div>

     </div>
</template>
<script setup>
import ProductCart from "../components/ProductCart.vue"
import BaseTitle from '../components/BaseTitle.vue';
import { useRoute, } from "vue-router";
import {useKategoriStore} from "../stores/kategori/kategori"
import { storeToRefs } from 'pinia';
import { onBeforeMount, watch } from 'vue';
import { usePagination } from "../composables/pagination/pagination";
import Pagination from "../components/Pagination.vue"
const route = useRoute();
const store  = useKategoriStore();
const {dataCategory} = storeToRefs(store)
const {fetchCategory} = store


watch(()=>route.params.id,async(id)=>{
    await fetchCategory(id);
    setlistdata(dataCategory.value.products);

})

onBeforeMount(async()=>{
  await fetchCategory(route.params.id);
  setlistdata(dataCategory.value.products);

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
} = usePagination({ pageSize: 4});


</script>

