<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

</script>

<template>
    <header>
      <nav>
        <NavBar></NavBar>
    </nav>
    </header>

      <router-view></router-view>
      <!-- Komponen utama aplikasi ditampilkan di sini -->

    <footer>
      <!-- Tampilkan footer aplikasi di sini -->
  <Footer/>
    </footer>
</template>

