<template>
  <Layout>
    <BaseModal :open="open"/>
    <h2 class="sr-only">Checkout</h2>
    <Form
      @submit="onSubmit"
      :validation-schema="validationSchema"
      class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
    >
      <div>
        <div>
          <h2 class="text-lg font-medium text-gray-900">Contact information</h2>
          <div class="mt-4">
            <label
              for="first-name"
              class="block text-sm font-medium text-gray-700"
              >Nama</label
            >
            <div class="mt-1 text-sm">
              {{ user.name }}
            </div>
          </div>

          <div class="mt-2 mb-4">
            <label
              for="first-name"
              class="block text-sm font-medium text-gray-700"
              >Nomor Handphone</label
            >
            <div class="mt-1 text-sm">
              {{ user.no_hp }}
            </div>
          </div>
        </div>
        <div class="mt-10 border-t border-gray-200 pt-10">
          <h2 class="text-lg font-medium text-gray-900">
            Shipping information
          </h2>
          <div class="mt-4 grid grid-cols-2 gap-y-3">
            <div v-for="data in user.alamat" class="col-span-2">
              <div class="">
                <label
                  for="address"
                  class="block text-sm font-medium text-gray-700"
                  >Alamat</label
                >
                <div class="mt-1 text-sm flex">
                  <span
                    class="lowercase after:pr-1 after:content-[','] first-letter:capitalize"
                  >
                    {{ data.kelurahan.name }}
                  </span>
                  <span
                    class="lowercase after:pr-1 after:content-[','] first-letter:capitalize"
                  >
                    {{ data.kecamatan.name }}
                  </span>
                  <span
                    class="lowercase after:pr-1 after:content-[','] first-letter:capitalize"
                  >
                    {{ data.kabupaten.name }}
                  </span>
                  <span class="lowercase first-letter:capitalize">
                    {{ data.provinsi.name }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <label
                for="address"
                class="block text-sm font-medium text-gray-700"
                >Alamat lengkap</label
              >
              <div class="mt-1 text-sm">
                {{ user.alamat[0].alamat_detail }}
              </div>
            </div>
            <div class="col-span-1">
              <span v-if="!selectedCity" class="block text-sm font-medium
                       leading-6 text-gray-900">Pilih Kurir</span>
              <span v-if="!selectedCity" class="text-gray-900">Loading...</span>
              <BaseSelectOption
                v-if="selectedCity != null"
                v-bind="kurir"
                label="Pilih Kurir"
                field="kurir"
                :options="kurirOptions"
                optKey="id"
                optLabel="name"
                optValue="name"
                @change="getOngkir"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Order summary -->
      <div class="mt-10 lg:mt-0">
        <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

        <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
          <h3 class="sr-only">Items in your cart</h3>
          <ul role="list" class="divide-y divide-gray-200">
            <li
              v-for="cart in dataCarts"
              :key="cart.id"
              class="flex py-6 px-4 sm:px-6"
            >
              <div class="flex-shrink-0">
                <img
                  :src="`http://127.0.0.1:8000/${cart.product.thumb[0].path_thumb}`"
                  :alt="cart.product.nama_barang"
                  class="w-20 rounded-md"
                />
              </div>

              <div class="ml-6 flex flex-1 flex-col">
                <div class="flex">
                  <div class="min-w-0 flex-1">
                    <h4 class="text-sm">
                      <p class="font-medium text-gray-700 hover:text-gray-800">
                        {{ cart.product.nama_barang }}
                      </p>
                    </h4>
                    <p class="mt-1 text-sm text-gray-500">
                      Size : {{ cart.stock.size }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500">
                      Qty : {{ cart.jumlah_item }}
                    </p>
                  </div>

                  <div class="ml-4 flow-root flex-shrink-0">
                    <p class="mb-3 text-sm font-medium text-gray-900">
                      {{
                        cart.product.harga_jual.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                      }}
                    </p>
                  </div>
                </div>

                <div class="flex flex-1 items-end justify-between pt-2"></div>
              </div>
            </li>
          </ul>
          <dl class="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
            <div class="flex items-center justify-between">
              <dt class="text-sm">Subtotal</dt>
              <dd class="text-sm font-medium text-gray-900">
                {{
                  totalHarga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                }}
              </dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-sm">Shipping</dt>
              <dd
                class="text-sm font-medium text-gray-900"
                v-if="biayaPengiriman"
              >
                {{
                  biayaPengiriman.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                }}
              </dd>
              <dd v-else>jenis pengiriman tidak tersedia</dd>
            </div>
            <div
              class="flex items-center justify-between border-t border-gray-200 pt-6"
            >
              <dt class="text-base font-medium">Total</dt>
              <dd class="text-base font-medium text-gray-900" v-if="biayaPengiriman">
                {{
                  totalBiaya.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                }}
              </dd>
              <dd v-else>jenis pengiriman tidak tersedia</dd>
            </div>
          </dl>
          <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
            <BaseButton :disabled="btndisable" type="submit" label="Confirm order"/>
          </div>
        </div>
      </div>
    </Form>
  </Layout>
</template>

<script setup>
import BaseSelectOption from "../components/BaseSelectOption.vue";
import Layout from "../components/Layout.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseModal from "../components/BaseModal.vue";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { Form, ErrorMessage, useForm } from "vee-validate";
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { useCartsStore } from "../stores/Cart/cart";
import { useAuthStore } from "../stores/auth/auth";
import { useOngkirStore } from "../stores/ogkir/ongkir";
import { useTransaksiStore } from "../stores/transaksi/transaksi";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const storecart = useCartsStore();
const { dataCarts, totalHarga, } = storeToRefs(storecart);
const { fetchCarts } = storecart;

const storetransaksi = useTransaksiStore();
const { handleCreateTransaksi, handleCancelPayment, handleDeleteTransaksi} = storetransaksi;
const { snaptoken } = storeToRefs(storetransaksi);

const storeuser = useAuthStore();
const { user } = storeToRefs(storeuser);

const storeongkir = useOngkirStore();
const { dataOngkir, city, provinces } = storeToRefs(storeongkir);
const { fetchAllCity, fetchAllProvinsi, handleCekOngkir } = storeongkir;

const open = ref(false)
const kurirOptions = [
  {
    id: 1,
    name: "jne",
  },
  {
    id: 2,
    name: "pos",
  },
  {
    id: 3,
    name: "tiki",
  },
];

const namakota = ref();
async function namaKota() {
  if (user.value.alamat[0].kabupaten.name.toLowerCase().includes("kabupaten")) {
    namakota.value = user.value.alamat[0].kabupaten.name.toLowerCase().slice(10);
    if (namakota.value === 'adm. kep. seribu') {
      namakota.value = "kepulauan seribu"     
    }
  } else if (user.value.alamat[0].kabupaten.name.toLowerCase().includes("kota")) {
    namakota.value = user.value.alamat[0].kabupaten.name.toLowerCase().slice(5);
    if (namakota.value === 'adm. jakarta pusat') {
      namakota.value = "jakarta pusat";    
    }else if (namakota.value === 'adm. jakarta barat') {
      namakota.value = "jakarta barat";    
    }else if (namakota.value === 'adm. jakarta timur') {
      namakota.value = "jakarta timur";    
    }else if (namakota.value === 'adm. jakarta selatan') {
      namakota.value = "jakarta selatan";    
    }else if (namakota.value === 'adm. jakarta utara') {
      namakota.value = "jakarta utara";    
    }
    
  }
}
const alamat = {
  provinsi: user.value.alamat[0].provinsi.name.toLowerCase(),
};

const selectedProvince = ref();
const selectedCity = ref();

async function getProvince() {
  await fetchAllProvinsi();
  provinces.value.forEach((data) => {
    const alldata = { id: data.province_id, name: data.province.toLowerCase() };
    if (alldata.name.includes("di yogyakarta")) {
      selectedProvince.value = alldata;
    } else if (alldata.name.includes(alamat.provinsi)) {
      selectedProvince.value = alldata;
    }
  });
}

async function getCity() {
  await fetchAllCity(selectedProvince.value?.id);
  city.value.forEach((data) => {
    const alldata = { id: data.city_id, name: data.city_name.toLowerCase() };
    if (alldata.name.includes(namakota.value)) {
      selectedCity.value = alldata;
      
    }
  });

}

const { defineInputBinds } = useForm();
const kurir = defineInputBinds("kurir");
const btndisable = ref(true)

onBeforeMount(async () => {
  await namaKota();
  await fetchCarts();
  await getProvince();
  await getCity();
});

async function getOngkir() {
  const data = {
    tujuan: selectedCity.value.id,
    kurir: kurir.value.value,
  };
  if (data.kurir != null && data.tujuan != null) {
    await handleCekOngkir(data);
    btndisable.value = false
  } else {
  }
}
const biayaPengiriman = computed(() => {
  return dataOngkir.value?.data.data[0].costs[0].cost[0].value;
});

const totalBiaya = computed(() => {
  return totalHarga.value + biayaPengiriman.value;
});

const validationSchema = toTypedSchema(
  zod.object({
    kurir: zod.string().nonempty({message:'Wajib memilih salah satu'}),
  })
);

const onSubmit = async (values) => {
  const data = {
    kurir: values.kurir,
    service: dataOngkir.value.data.data[0].costs[0].service,
    biaya_pengiriman: biayaPengiriman.value,
  };
  await handleCreateTransaksi(data);
  await window.snap.pay(snaptoken.value?.data.payment.token_midtrans, {
        // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
          onSuccess: function(result){
            router.push('/order-history')
          },
          onPending: function(result){
            router.push('/order-history')
          },
          onError: function(){
            handleDeleteTransaksi(snaptoken.value?.data.payment.id)
            open.value = true;
          },
          onClose: function(){
            handleCancelPayment(snaptoken.value?.data.payment.id,{status:"belum memilih metode pembayaran"})
            router.push('/order-history')
          }
        
})
};

onMounted(() => {
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
</script>
