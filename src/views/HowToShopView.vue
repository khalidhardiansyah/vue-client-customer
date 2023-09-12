<template>
    <Layout class="min-h-screen">
        <h1 class="text-4xl text-dark-900 font-bold mb-8 w-full border-b-2 pb-4 uppercase">How to buy</h1>
        <section>
            <h2 class="text-xl text-dark-900 font-semibold mt-5 mb-3">
            Cara Pemesanan
        </h2>
        <ol class="list-decimal ml-5 sm:text-lg space-y-2 capitalize">
            <li>Kunjungi website Vampire Kingdom.</li>
            <li>Login ke akun yang sudah anda miliki, jika belum punya akun <span class="underline">
                <RouterLink to="/register">daftar disini</RouterLink>.
            </span></li>
            <li>
                klik shop, kemudian pilih kategori, lalu pilih produk yang anda inginkan isikan ukuran dan jumlah selanjutnya klik <span class="font-bold">add to cart</span>.
            </li>
            <li>
                buka cart, kemudian klik <span class="font-bold">checkout</span>.
            </li>
            <li>
                setelah ke halaman order, pilih jenis pengiriman. tunggu hingga biaya pengiriman muncul kemudian klik <span class="font-bold">confirm order</span>.                
            </li>
            <li>
                akan ada pop up pembayaran yang muncul, pilih metode pembayaran.
            </li>
            <li>
                Segera lakukan pembayaran sebelum kadaluarsa, sesuai dengan metode pembayaran yang dipilih.
            </li>
            <li>Setelah melakukan pembayaran. Kami akan memvalidasi status pembayaran dan mengirimkan order sesuai pesanan.</li>
        </ol>
        </section>
    </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue';



</script>
