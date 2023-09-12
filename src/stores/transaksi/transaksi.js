import {
  createTransaksi,
  getTransaksi,
  cancelPayment,
  invoice,
  deleteTransaksi
} from "../../http/transaksi/transaksi-api";
import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "../auth/auth";
import { ref } from "vue";

export const useTransaksiStore = defineStore("transaksiStore", () => {
  const store = useAuthStore();
  const { token } = storeToRefs(store);
  const message = ref({});
  const listtransaksi = ref(null);
  const snaptoken = ref()
  const handleCreateTransaksi = async (datatransaksi) => {
    try {
      message.value = {};
      const { data } = await createTransaksi(token.value, datatransaksi);
      snaptoken.value = data
    } catch (error) {
      message.value = {};
      message.value = error.response;
    }
  };

  const fetchTransaksi = async () => {
    try {
      const { data } = await getTransaksi(token.value);
      listtransaksi.value = data.data;
    } catch (error) {
      message.value = {};
      message.value = error.response;
    }
  };

  const handleCancelPayment = async (id, data) => {
    try {
      const { result } = await cancelPayment(token.value, id, data);
    } catch (error) {
      message.value = {};
      message.value = error.response;
    }
  };

  const handleCetakInvoice = async(id)=>{
    try {
        const response = await invoice(token.value, id);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Invoice.pdf'); // Nama file yang diunduh
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.log(error);
      }
}

const handleDeleteTransaksi = async (id) => {
  message.value = {};
  try {
    const { data } = await deleteTransaksi(token.value, id);
    message.value = data
  } catch (error) {
    message.value = error.response;
  }
};


  return {
    message,
    listtransaksi,
    handleCreateTransaksi,
    fetchTransaksi,
    snaptoken,
    handleCetakInvoice,
    handleCancelPayment,
    handleDeleteTransaksi

  };
});
