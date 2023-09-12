<template>
  <Layout>
    <div class="container mx-auto">
        <h1 class="text-4xl text-dark-900 font-bold mb-8 w-full border-b-2 pb-4 uppercase">About Us</h1>
        <div class="grid lg:grid-cols-2 lg:space-x-8">
          <div class="image">
            <img :src="aboutimg" alt="" srcset="">
          </div>
          <div class="about__text space-y-3 pt-5 sm:pt-5 md:pt-5 lg:pt-0 text-sm">
            <p class="">
              Selamat datang di Vampire Kingdom, rumah bagi aliran fashion musik metal yang unik dan berani! Kami adalah merek pakaian fashion yang terinspirasi oleh nuansa gelap dan misterius dari dunia musik metal
            </p>
            <p class="">
              Dengan semangat yang revolusioner, kami mengeksplorasi perpaduan antara gaya pakaian alternatif dan elemen khas metal yang kuat, menciptakan koleksi pakaian yang berani dan tak terlupakan.
            </p>
            <p class="">
              Di Vampire Kingdom, kami berkomitmen untuk menyediakan pilihan fashion terbaik bagi para pecinta musik metal, menggabungkan desain penuh karakter dengan kualitas bahan yang superior. 
            </p>
            <p class="">
              Dari kemeja grafis dengan ilustrasi kreatif hingga jaket kulit yang memukau, setiap produk kami mencerminkan semangat dari aliran musik yang kami cintai. 
            </p>
            <p class="">
              Selamat bergabung dengan klan kami dan tunjukkan identitasmu melalui gaya fashion penuh gaya dari Vampire Kingdom!
            </p>
          </div>
        </div>
      </div>
  </Layout>
</template>
  
<script setup>
import Layout from '../components/Layout.vue';
import aboutimg from "../assets/314253511_1207071503254292_763877875564984902_n.jpg"
</script>
<style>

</style>
