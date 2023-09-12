<template>
      <Layout>
        <div class="grid grid-cols-1 gap-y-10 justify-items-center">
          <div class="w-full carousel-container flex overflow-hidden transition-all duration-300">
  <div
    v-for="item in contents"
    :key="item.id"
    class="carousel-item flex-shrink-0 w-full"
    :style="{ transform: `translateX(${currentSlide * -100}%)` }"
  >
    <div class="hero overflow-hidden object-cover w-full sm:aspect-w-2 sm:aspect-h-1">
      <img class="image" :src="item.img" :alt="item.title" />
    </div>
    <div class="text-box mt-5 w-full sm:w-[30rem] justify-self-start">
      <h3 class="text-2xl font-semibold tracking-wide">{{ item.title }}</h3>
      <p class="">{{ item.desk }}</p>
    </div>
  </div>
</div>
        <section class="w-full">
          <h3 class="text-3xl font-bold tracking-wide mb-4 uppercase">Collection</h3>

          <div class="grid grid-cols-2 lg:grid-cols-4 justify-items-center">
            <img class="h-full lg:aspect-[3/4]" :src="midimage" alt="" srcset="">
            <img class="h-full lg:aspect-[3/4] lg:pl-5" :src="midimage3" alt="" srcset="">
            <img class="h-full lg:aspect-[3/4] lg:pl-5" :src="midimage2" alt="" srcset="">
            <img class="h-full lg:aspect-[3/4] lg:pl-5" :src="midimage4" alt="" srcset="">
          </div>
        </section>

        <section class="w-full">
  <h3 class="title text-3xl font-bold text-center">
    NEWWW
  </h3>
  <div class="my-10 gap-10 grid grid-cols-2 sm:justify-between sm:grid-cols-4 w-full">
    <ProductCart :products="smallList"/>
  </div>

  <div class="w-32 mx-auto">
    <BaseButton label="MORE" @click="toAllCollection"/>
  </div>
</section>

<section class="w-full min-h-screen mx-auto space-y-14">
  <iframe
src="https://www.youtube.com/embed/l2W8XW9SV9E" class="w-full sm:w-1/2 aspect-[16/9] mx-auto ">
</iframe>

<div class="grid grid-cols-2">
  <img :src="btmimage" alt="" srcset="">
  <img :src="btmimage2" alt="" srcset="">
</div>
</section>


       
        </div>
    </Layout>
</template>
<script setup>
import Layout from "../components/Layout.vue"
import { storeToRefs } from 'pinia';
import ProductCart from "../components/ProductCart.vue"
import { usePagination } from "../composables/pagination/pagination";
import BaseButton from "../components/BaseButton.vue"
import {useProductsStore} from "../stores/products/products"
import { useRouter } from "vue-router";
import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch} from 'vue';

import image1 from "../assets/evgeniy-smersh-8TqcZeYPJ3E-unsplash.jpg"
import image2 from "../assets/Snapinsta.app_310048136_601774391696103_1510990121537137076_n_1080.jpg"

import midimage from "../assets/mid-content.jpg"
import midimage2 from "../assets/midcontent3.jpg"
import midimage3 from "../assets/mid-content2.jpg"
import midimage4 from "../assets/midcontent4.jpg"


import btmimage from "../assets/Snapinsta.app_294963530_144733738026603_2453091445144936347_n_1080.jpg";
import btmimage2 from "../assets/314253511_1207071503254292_763877875564984902_n.jpg"


const router = useRouter()
const store  = useProductsStore();
const {dataProducts} = storeToRefs(store)
const {fetchProducts} = store
onBeforeMount(async()=>{
await fetchProducts();
setlistdata(dataProducts.value)
})

const currentSlide = ref(0)
const contents = [
  {
    img: image1,
    title:"Night's Rhythm: Dance with Shadows in Our Mosh Pit Collection!",
    desk:"Join the Night's Rhythm - Dance in our Mosh Pit Wears! Embrace the energy of the Vampire Kingdom with our edgy and bold fashion pieces. Get ready to rock the night away in style!"
  },
  {
    img: image2,
    title:"Electric Elegance: Leap into Style with our Guitarist Jump Attire!",
    desk:"Elevate Your Stage Presence - Guitarist's Jump Collection. Amplify your fashion game with our Vampire Kingdom outfits inspired by the electrifying energy of guitarists on stage. Strike a powerful chord of style!"
  }
]

const toAllCollection = ()=>{
  router.push({
    name:'allCollectionView'
  })
}
let intervalId;

function startCarousel() {
  intervalId = setInterval(nextSlide, 5000); 
    }

function nextSlide() {
      currentSlide.value = (currentSlide.value + 1) % contents.length;
}

onMounted(()=>{
  startCarousel()
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

watch(currentSlide, () => {
  clearInterval(intervalId);
  startCarousel();
});


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

