import {cekOngkir, getCities, getProvinces} from "../../http/ongkir/ongkir-api"
    import {defineStore, storeToRefs} from "pinia"
    import {useAuthStore} from "../auth/auth"
    import { ref} from "vue"
    
    
    export const useOngkirStore = defineStore("ongkirStore", ()=>{
        const dataOngkir = ref(null)
        const provinces = ref(null)
        const city = ref(null)
        const store = useAuthStore();
        const {token} = storeToRefs(store);

        const fetchAllProvinsi = async()=>{
            try {
                const {data} = await getProvinces(token.value);
                provinces.value = data.data
            } catch (error) {
                console.log(error);
            }
        }

        const fetchAllCity = async(id)=>{
            try {
                const {data} = await getCities(token.value, id);
                city.value = data.data
            } catch (error) {
                console.log(error);
            }
        }

        const handleCekOngkir = async (data)=>{
            try {
              dataOngkir.value = await cekOngkir(token.value, data);
              if (!dataOngkir.value.data.data[0].costs[0]) {
                dataOngkir.value = null
              }
            } catch (error) {
                console.log(error);
            }
        }
    
        return {dataOngkir, city, provinces, fetchAllCity, fetchAllProvinsi, handleCekOngkir}
    })