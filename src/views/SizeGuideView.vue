<template>
    <Layout class="min-h-screen">
       
        <h1 class="text-4xl text-dark-900 font-bold mb-8 w-full border-b-2 pb-4 uppercase">Size Guide</h1>
       <section class="px-4">
        <ol  class="list-decimal text-xl font-bold">
            <li v-for="item in sizeGuides">
            <h2 class="">{{ item.title }}</h2>
            <img :src="item.img" :alt="item.title" class="w-full sm:w-1/2 lg:w-1/2">
            
            </li>
        </ol>
       </section>
        
    </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue';
import tshirt from '../assets/5.jpg'
import hoodie from '../assets/hoodie.jpg'
import pants from '../assets/katok.jpg'

const sizeGuides = [
    {
        title:"T-Shirt",
        img: tshirt,
    },
    {
        title:"Hoodie",
        img: hoodie,
    },
    {
        title:"Pants",
        img: pants,
    },
]


</script>

<style lang="scss" scoped>

</style>