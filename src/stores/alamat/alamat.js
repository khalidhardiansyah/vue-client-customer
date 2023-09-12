import { defineStore } from "pinia";
import {getProvinsi, getKabupaten, getKecamatan, getKelurahan} from "../../http/alamat/alamat-api"
import { ref } from "vue";

export const useAlamatStore = defineStore("alamatStore", ()=>{
    const dataprovinsi = ref(null)
    const datakabupaten = ref([])
    const datakecamatan = ref(null)
    const datakelurahan = ref(null)

    const fetchProvinsi = async ()=>{
        try {
            const {data} = await getProvinsi();
            dataprovinsi.value = data.map(({ id, name,}) => {
                return { id: parseInt(id), name, };
              });
        } catch (error) {
            console.log(error);
        }
    }

    const fetchKabupaten = async (id)=>{
        try {
            const {data} = await getKabupaten(id);
            datakabupaten.value = Object.entries(data).map(([key, value]) => {
                return { id: parseInt(key), name: value };
              });
        } catch (error) {
            console.log(error);
        }
    }

    const fetchKecamatan = async (id)=>{
        try {
            const {data} = await getKecamatan(id);
datakecamatan.value = Object.entries(data).map(([key, value]) => {
    return { id: parseInt(key), name: value };
  });
        } catch (error) {
            console.log(error);
        }
    }

    const fetchKelurahan = async (id)=>{
        try {
            const {data} = await getKelurahan(id);
datakelurahan.value = Object.entries(data).map(([key, value]) => {
    return { id: parseInt(key), name: value };
  });
        } catch (error) {
            console.log(error);
        }
    }

    return { dataprovinsi,
        datakabupaten,
        datakecamatan,
        datakelurahan,
        fetchProvinsi,
fetchKabupaten,
fetchKecamatan,
fetchKelurahan, }

})