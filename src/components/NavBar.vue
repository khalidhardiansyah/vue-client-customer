<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="open = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
            >
              <div class="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  @click="open = false"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                <BaseMenuItems :pages="navigation.pages"/>
                
              </div>
              <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                <div class="not_auth space-y-6"  v-if="!isLoggedIn">
                  <div class="flow-root">
                    <RouterLink to="/register" class="-m-2 block p-2 font-medium text-gray-900"
                      >Create an account</RouterLink
                    >
                  </div>
                  <div class="flow-root">
                    <RouterLink to="/login" class="-m-2 block p-2 font-medium text-gray-900"
                      >Sign in</RouterLink
                    >
                  </div>
                </div>
             <button v-if="isLoggedIn" class="block font-medium text-gray-900" @click="Logout">Logout</button>


              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative">
      <nav aria-label="Top">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="border-b border-gray-200">
            <div class="flex h-16 items-center justify-between">
              <!-- Logo (lg+) -->
              <div class="hidden lg:flex lg:flex-1 lg:items-center">
                <RouterLink to="/">
                  <span class="sr-only">Vampire Kingdom</span>
                  <img
                    class="h-14 w-auto"
                    src="../assets/logo.png"
                    alt=""
                  />
                </RouterLink>
              </div>

              <div class="hidden h-full lg:flex">
                <div class="flex h-full justify-center items-center space-x-8">
                  <div class="blok" v-for="page in navigation.pages"
                    :key="page.name">
                    <RouterLink
                    v-if="!page.children"
                    :to="{
                      path: page.to,
                    }"
                    class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >{{ page.name }}</RouterLink
                  >
                  <BasePopover
                  v-else
                    :pages="page.children"
                    label="SHOP"
                    boxPoisition="center"
                    size="fit"
                  />
                  </div>
                  
                  
                </div>
              </div>

              <!-- Mobile menu and search (lg-) -->
              <div class="flex flex-1 items-center lg:hidden">
                <button
                  type="button"
                  class="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  @click="open = true"
                >
                  <span class="sr-only">Open menu</span>
                  <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>

                <Search/>
              </div>

              <!-- Logo (lg-) -->
              <RouterLink to="/" class="lg:hidden">
                <span class="sr-only">Vampire Kingdom</span>
                <img
                  src="../assets/logo.png"
                  alt=""
                  class="h-14 w-auto"
                />
              </RouterLink>

              <div class="flex flex-1 items-center justify-end">

                <div class="flex items-center lg:ml-8">
                
                  <div class="search hidden lg:flex">
                    <Search/>
                  </div>
                  <RouterLink
                    v-if="!isLoggedIn"
                    :to="{
                      path:'/login'
                    }"
                    class="group -m-2 flex items-center p-2"
                  >
                    <Icon :icon="UserCircleIcon" />
                    <span class="sr-only">Sign in</span>
                  </RouterLink>
                  <BasePopover
                    v-else
                    :pages="pages"
                    :icon="UserCircleIcon"
                    size="base"
                    profile
                  />
                  <BaseCart
                 :open="isOpen"
                 :total_qty="totalItems">
                    <BaseCardCart
                    :carts="dataCarts"
                    
                  :subtotal="totalHarga"
                    @delete-cart="onDeleteCart"
                    />
                  </BaseCart>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import BaseMenuItems from "./BaseMenuItems.vue"
import BaseCardCart from "./BaseCardCart.vue";
import BaseCart from "./BaseCart.vue";
import BasePopover from "./BasePopover.vue";
import Icon from "./Icon.vue";
import Search from "./Search.vue"
import { onBeforeMount, ref, onBeforeUpdate} from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,

} from "@headlessui/vue";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../stores/auth/auth";
import { useKategoriStore } from "../stores/kategori/kategori";
import { useCartsStore } from '../stores/Cart/cart';
import { storeToRefs } from "pinia";

const store = useAuthStore();
const { handleLogout } = store
const { isLoggedIn } = storeToRefs(store);

const kategoriStore = useKategoriStore();
const {dataCategories} = storeToRefs(kategoriStore);
const {fetchCategories} = kategoriStore

const cartStore = useCartsStore();
const {dataCarts, totalHarga, totalItems, isOpen} = storeToRefs(cartStore)
const {fetchCarts, removeCarts} = cartStore


const pages = [
  { name: "Profile", to: "/profile" },
  { name: "Transaksi", to: "/order-history" },
];

const navigation = ref({
  pages: [
    { name: "HOME", to: "/", current: false },
    {
      name: "SHOP",
      children: [{name: "ALL", to:`/collections`}
      ],
    },
    { name: "ABOUT", to: "/about", current: false },
  ],
});

async function getCategories() {
  await fetchCategories();
  dataCategories.value.forEach(data => {
    const child = { name: data.nama_category, to:`/collections/${data.id}` };
    navigation.value.pages[1].children.push(child);
  });
}
const onDeleteCart = (async(id)=>{
  await removeCarts(id);
  await getCarts();
})

async function getCarts() {
  await fetchCarts()
}

async function Logout() {
  await handleLogout()
}

onBeforeMount(()=>{
  getCategories();
})

onBeforeUpdate(()=>{
  if (isLoggedIn.value === false) {
    dataCarts.value = null    
  }
})

const open = ref(false);


</script>
