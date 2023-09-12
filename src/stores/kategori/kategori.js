import {defineStore, storeToRefs} from "pinia"
import {getCategory, getCategories} from "../../http/kategori/kategori-api";
import {useAuthStore} from "../auth/auth"
import { ref } from "vue"


export const useKategoriStore = defineStore("kategoriStore", ()=>{
    const store = useAuthStore();
const {token} = storeToRefs(store);
    const dataCategories = ref(null);
    const dataCategory = ref(null);

    const fetchCategories = async ()=>{
        try {
            const {data} = await getCategories(token.value);
                dataCategories.value =  data.data
        } catch (error) {
            dataCategories.value = null;
        }
    }

    const fetchCategory = async (id)=>{
        try {
            const {data} = await getCategory(token.value, id);
                dataCategory.value =  data.data
        } catch (error) {
            dataCategory.value = null;
        }
    }

    return {dataCategories, dataCategory, fetchCategories, fetchCategory}
})