<template>
  <button
    type="button"
    @click="openModal"
    class="ml-2 p-2 text-gray-400 hover:text-gray-500"
  >
    <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
  </button>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-30">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-start mt-20 justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full  max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all"
            >
            <form >
                <BaseInput class="-mt-2" field="search" placeholder="cari produk" v-bind="keyword" @input="handleSearch"/>
            </form>
            <div class="box_result my-2 px-2">
              <p v-if="loadingsearch">Loading....</p>
              <ul>
                <li v-if="searchResult?.length" v-for="result in searchResult"> 
                  <button @click="toProduct(result.id)" class="card flex flex-row justify-between items-center space-x-10 py-3">
                    <h2 class="product font-semibold text-base text-left">
                      {{ result.nama_barang}}
                    </h2>
                    <div class="category min-w-fit text-sm text-blue-700 font-medium">
                      {{ result.category.nama_category }}
                    </div>
                  </button>
                
                </li>
              </ul>
              <p v-if="productMessage">
                {{ productMessage }}
              </p>
              
            </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref} from 'vue'
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import BaseInput from "./BaseInput.vue"
import { useForm, Form } from "vee-validate";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from '@headlessui/vue'
import { useProductsStore } from '../stores/products/products';
import { storeToRefs } from 'pinia';
import {useRouter} from "vue-router"


const router = useRouter()

const store = useProductsStore();
const {searchResult, productMessage,loadingsearch } = storeToRefs(store);
const {handleSearchProduct} = store

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false;
  searchResult.value = null
  productMessage.value = null
}
function openModal() {
  isOpen.value = true
}

function toProduct(id) {
  router.push(`product/${id}`)
  isOpen.value = false;
  
  
}


const { defineInputBinds} = useForm({
});

const keyword = defineInputBinds("keyword")
let searchTimeout = null;

const handleSearch = () => {
  loadingsearch.value = true
  searchResult.value = null
  productMessage.value = null
      // Jika ada timeout sebelumnya, hapus timeout tersebut
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(() => {
        if (keyword.value.value) {
          handleSearchProduct(keyword.value.value);
        }else if(!keyword.value.value){

          loadingsearch.value = false
        }
      }, 2000);
    };
</script>
