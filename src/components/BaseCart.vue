<template>
              <Popover class="ml-4 flow-root text-sm lg:relative lg:ml-8">
              <PopoverButton class="group -m-2 flex items-center p-2" @click="open =! open">
                <Icon :icon="ShoppingBagIcon" />
                <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{ total_qty }}</span>
                <span class="sr-only">items in cart, view bag</span>
              </PopoverButton>

              <div v-if="open">
                <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <PopoverPanel class="absolute z-20 inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-[29rem] lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5" static>
                  <h2 class="sr-only">Shopping Cart</h2>
                  <slot/>
                  <div v-if="!isLoggedIn" class="mx-auto w-fit px-4 ">
                    <h3 class="mx-auto my-5 text-lg">
                      Untuk melihat cart, 
                      <span class="text-xl font-semibold">
                        Login terlebih dahulu
                      </span>
                    </h3>
                  </div>
                </PopoverPanel>
              </transition>
              </div>
              
            </Popover>
</template>

<script setup>
import {storeToRefs} from "pinia"
import Icon from "./Icon.vue"
import Basebutton from "../components/BaseButton.vue"

import {
  ShoppingBagIcon,
} from '@heroicons/vue/24/outline'
import {
  Popover,
PopoverButton,
PopoverPanel,
} from '@headlessui/vue'
import {useAuthStore} from "../stores/auth/auth"

const store = useAuthStore()
const {isLoggedIn} = storeToRefs(store)
const props = defineProps({
    open:{
      required: true
    },
    total_qty:{
        required: true
    },
})




// const open = ref(false)
</script>

<style lang="scss" scoped>

</style>