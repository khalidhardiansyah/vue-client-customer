<template>
  <Layout class="min-h-screen">
    <BaseModal :open="open"/>
    <BaseTitle title="Riwayat pemesanan" />
    <div class="mt-10 bg-neutral-100 rounded-md ">
      <h2 class="sr-only">Riwayat pemesanan</h2>
      <div class="space-y-20 px-8 pt-10" v-if="smallList.length">
        <div v-for="transaksi in smallList" :key="transaksi.id">
          <h3 class="sr-only">
            {{ transaksi.tgl_pemesanan }}
          </h3>

          <div
            class="rounded-lg bg-neutral-50 py-6 px-4 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8"
          >
            <dl
              class="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3  sm:space-y-0 sm:gap-4 sm:divide-y-0 lg:w-3/4 lg:flex-none lg:grid-cols-7 lg:gap-x-8"
            >
              <div class="flex justify-between sm:block">
                <dt class="font-medium text-gray-900">Date placed</dt>
                <dd class="sm:mt-1">
                  {{ transaksi.tgl_pemesanan }}
                </dd>
              </div>
              <div class="flex justify-between pt-6 sm:block sm:pt-0">
                <dt class="font-medium text-gray-900">Order number</dt>
                <dd class="sm:mt-1">{{ transaksi.order_number }}</dd>
              </div>
              <div
                class="flex justify-between pt-6 sm:block sm:pt-0 col-span-1"
              >
                <dt class="font-medium text-gray-900">Biaya pengiriman</dt>
                <dd class="sm:mt-1">
                  {{
                    transaksi.biaya_pengiriman.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  }}
                </dd>
              </div>
              <div class="flex justify-between pt-6 sm:block sm:pt-0">
                <dt class="font-medium text-gray-900">Jasa pengiriman</dt>
                <dd class="sm:mt-1 uppercase">{{ transaksi.kurir }}</dd>
              </div>
              <div
                class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0"
              >
                <dt>Status pembayaran</dt>
                <dd
                  class="sm:mt-1 uppercase"
                  :class="
                    [transaksi.payment.status === 'unpaid'
                      ? 'text-red-500'
                      : '',
                      transaksi.payment.status === 'paid'
                      ? 'text-green-500'
                      : '',
                      transaksi.payment.status === 'belum memilih metode pembayaran'
                      ? 'text-red-500'
                      : '',
                      transaksi.payment.status === 'cancel'
                      ? 'text-red-500'
                      : '',
                      transaksi.payment.status === 'expire'
                      ? 'text-red-500'
                      : '',
                      transaksi.payment.status === 'pending'
                      ? 'text-yellow-500'
                      : '',
                    ]
                  "
                >
                  {{ transaksi.payment.status }}
                </dd>
              </div>
              <div
                class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0"
              >
                <dt>Status transaksi</dt>
                <dd
                  class="sm:mt-1 uppercase"
                  :class="
                    [transaksi.status_transaksi === 'menunggu pembayaran'
                      ? 'text-red-500'
                      : '',
                      transaksi.status_transaksi === 'pesanan sedang diproses'
                      ? 'text-yellow-500'
                      : '',
                      transaksi.status_transaksi === 'pesanan dikirim'
                      ? 'text-green-500'
                      : '',
                      
                    ]
                  "
                >
                  {{ transaksi.status_transaksi }}
                </dd>
              </div>
              <div
                class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0"
              >
                <dt>Total biaya</dt>
                <dd class="sm:mt-1">
                  {{
                    transaksi.payment.total_pembayaran.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  }}
                </dd>
              </div>
            </dl>
            <div class="cta mt-6">
              <button
                v-if="transaksi.payment.status === 'paid'"
                @click="cetakInvoice(transaksi.id)"
                class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
              >
                View Invoice
              </button>
              <div class="sm:w-auto" v-if="transaksi.payment.status !== 'paid' && transaksi.payment.status !== 'expire' && transaksi.payment.status !== 'cancel'">
                <BaseButton @click="checkout(transaksi.payment.token_midtrans , transaksi.payment.id, transaksi.payment.status)" label="Bayar" />
              </div>
            </div>
          </div>

          <table class="mt-4 w-full text-gray-500 sm:mt-6">
            <caption class="sr-only">
              Products
            </caption>
            <thead
              class="sr-only text-left text-sm text-gray-500 sm:not-sr-only"
            >
              <tr>
                <th scope="col" class="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                  Produk
                </th>
                <th
                  scope="col"
                  class="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                >
                  Harga
                </th>
                <th
                  scope="col"
                  class="hidden py-3 pr-8 font-normal sm:table-cell"
                >
                  Keterangan
                </th>
                <th scope="col" class="w-0 py-3 text-right font-normal">
                  Info
                </th>
              </tr>
            </thead>
            <tbody
              class="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t"
            >
              <tr v-for="transaksi_detail in transaksi.transaksi_detail">
                <td class="py-6 pr-8">
                  <div class="flex items-center">
                    <img
                      :src="`${url}${transaksi_detail.list_produk.thumb[0].path_thumb}`"
                      :alt="transaksi_detail.list_produk.nama_barang"
                      class="mr-6 h-16 w-16 rounded object-cover object-center"
                    />
                    <div>
                      <div class="font-medium text-gray-900">
                        {{ transaksi_detail.list_produk.nama_barang }}
                      </div>
                      <div class="mt-1 sm:hidden">
                        {{
                          transaksi_detail.list_produk.harga_jual.toLocaleString(
                            "id-ID",
                            { style: "currency", currency: "IDR" }
                          )
                        }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="hidden py-6 pr-8 sm:table-cell">
                  {{
                    transaksi_detail.list_produk.harga_jual.toLocaleString(
                      "id-ID",
                      { style: "currency", currency: "IDR" }
                    )
                  }}
                </td>
                <td class="hidden py-6 pr-8 sm:table-cell">
                  <span>
                    Produk dengan 
                    <span v-if="transaksi_detail.stock.size !== 'null'"> ukuran {{ transaksi_detail.stock.size }} dengan </span>jumlah
                    {{ transaksi_detail.jumlah }}
                  </span>
                </td>
                <td class="whitespace-nowrap py-6 text-right font-medium">
                  <RouterLink :to="`/product/${transaksi_detail.list_produk.id}`" class="text-indigo-600">Lihat<span class="hidden lg:inline">Produk</span>
                    <span class="sr-only">, {{ transaksi_detail.list_produk.nama_barang }}</span>
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p v-else class="py-10 px-14 text-lg">
        Belum ada data transaksi
      </p>
      <div class="pagination border-t border-gray-200" v-if="listdata.length >= pageSize">
        <div class="px-8 py-5">
          <Pagination :last-page-size="lastPageSize" :current-page="currentPage" :totaldata="listdata.length" @prevPage="prevPage"
@nextPage="nextPage"/>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { onBeforeMount, ref} from "vue";
import Layout from "../components/Layout.vue";
import BaseTitle from "../components/BaseTitle.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseModal from "../components/BaseModal.vue";
import Pagination from "../components/Pagination.vue"
import { useTransaksiStore } from "../stores/transaksi/transaksi";
import { usePagination } from "../composables/pagination/pagination";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
const store = useTransaksiStore();

const { fetchTransaksi, handleCetakInvoice, handleCancelPayment, handleDeleteTransaksi} = store;
const { listtransaksi } = storeToRefs(store);

const open = ref(false)


onBeforeMount(async () => {
  await fetchTransaksi();
  setlistdata(listtransaksi.value);

  const midtransScript = document.createElement("script");
  midtransScript.setAttribute(
    "src",
    "https://app.sandbox.midtrans.com/snap/snap.js"
  );
  midtransScript.setAttribute(
    "data-client-key",
    import.meta.env.VITE_MIDTRANS_CLIENT_KEY
  );
  document.body.appendChild(midtransScript);
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
} = usePagination({ pageSize: 5});


async function checkout(token, id, status) {
  await window.snap.pay(token, {
    onSuccess: function(result){
    fetchTransaksi();
    setlistdata(listtransaksi.value);
          },
          onPending: function(result){
            
            if (status != 'unpaid') {
              handleCancelPayment(id,{status:"unpaid"})
            } else {
              
            }
            console.log(result);
          },
          onError: function(result){
            open.value = true
            handleDeleteTransaksi(id)
          },
          onClose: function(){
            if (status != 'belum memilih metode pembayaran') {
              handleCancelPayment(id,{status:"belum memilih metode pembayaran"})
            } else {
              console.log("owalah");
            }
          }
        }) 
}


async function cetakInvoice(id){
  await handleCetakInvoice(id)
}
const url = import.meta.env.VITE_IMAGE_URL;
</script>
