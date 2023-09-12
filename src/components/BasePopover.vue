<template>
  <Menu as="div" class="relative">
    <div>
      <MenuButton class="group flex items-center p-2">
        <Icon v-if="icon" :icon="icon"/>
      <div class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ label }}</div>
      </MenuButton>
    </div>
    <BaseTransition>
        <MenuItems
        :class="[Position, BaseStyle, Size]"
      >
        <MenuItem v-for="page in pages" v-slot="{ active }">
          <RouterLink
            :to="{
              path:page.to,
            }"
            :class="[
              active ? 'bg-gray-100' : '',
              'block items-center px-4 py-2 text-sm text-gray-700',
            ]"
            >{{ page.name }}
          </RouterLink>
          
        </MenuItem>
        <button v-if="profile" class="block items-center px-4 py-2 text-sm text-gray-700" @click="Logout">Logout</button>
      </MenuItems>
    </BaseTransition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems,} from "@headlessui/vue"
import BaseTransition from './BaseTransition.vue';
import Icon from './Icon.vue';
import { useAuthStore } from "../stores/auth/auth";
import {useRouter} from "vue-router"

const store = useAuthStore();
const {handleLogout} = store
const router = useRouter()
const props = defineProps({
    label:{
    },
    pages:{
        required: true
    },
    icon:{
    },
    boxPoisition:{
        type: String,
        default: 'right-top'
        
    },
    size:{
        default : 'base'
    },
    profile:{
      type: Boolean
    }
})

const Position = [
    props.boxPoisition === 'right-top'    ?   'right-0 origin-top-right':'',
    props.boxPoisition === 'center'    ?   ' -inset-x-1/3 ':''
]

const BaseStyle = [
"absolute z-10 mt-2   ",
"rounded-md bg-white py-1",
"shadow-lg ring-1 ring-black",
"ring-opacity-5 focus:outline-none"
]

const Size = [
props.size === 'base'    ?   'w-48':'',
props.size === 'fit'    ?   'w-fit ':''
]

async function Logout(params) {
  await handleLogout();
  router.push('/login')
}
</script>
