<template>
    <div class="bg-custom-500">
      <div class="mx-auto max-w-7xl py-8 px-4 sm:py-10 sm:px-6 lg:px-8">
          <div class="grid grid-cols-3 w-full justify-items-center">
            <div v-for="item in footerMenu" class="box">
              <h3 class="text-xl tracking-wide font-bold opacity-90 text-neutral-200 mb-3">
                {{ item.menu }}
              </h3>
              <div class="mb-1  " v-for="subMenu in item.children" :key="item.id">
                <a v-if="item.menu === 'Social Media'" class="text-sm text-neutral-50 opacity-50 hover:border-b-2" :href="subMenu.link" target="_blank" rel="noopener noreferrer">{{ subMenu.submenu }}</a>
                <RouterLink v-else class="text-sm text-neutral-50 opacity-50 hover:border-b-2" :to="{
                  path:subMenu.link
                }">{{ subMenu.submenu }}</RouterLink>
              </div>
            </div>
       
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';

const footerMenu = [
  {
    menu:"Help",
    children:[
      {
        submenu:"0849348348",
        link:""
      },
      {
        submenu:"How to shop",
        link:"/how-to-shop"
      }
    ]
  },

  {
    menu:"Info",
    children:[
      {
        submenu:"About",
        link:"/about"
      },
      {
        submenu:"Sizing guide",
        link:"/size-guide"
      },
    ]
  },
  {
    menu:"Social Media",
    children:[
      {
        submenu:"Facebook",
        link:"https://www.facebook.com/vampirekingdom.id/"
      },
      {
        submenu:"Instagram",
        link:"https://www.instagram.com/vampirekingdom.id/"
      },
      {
        submenu:"Shopee",
        link:"https://shopee.co.id/vampiredeadandrevenge"
      }
    ]
  }
]
</script>