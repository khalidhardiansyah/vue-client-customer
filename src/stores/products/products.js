import {getProduct, getProducts, searchProduct} from "../../http/product/product-api"
import {defineStore, storeToRefs} from "pinia"
import {useAuthStore} from "../auth/auth"
import { ref } from "vue"


export const useProductsStore = defineStore("productsStore", ()=>{
    const store = useAuthStore();
    const {token} = storeToRefs(store);
    const dataProducts = ref(null);
    const dataProduct = ref(null);
    const searchResult = ref(null);
    const productMessage = ref(null);
    const loadingsearch = ref(false)

    const fetchProducts = async ()=>{
        try {
            const {data} = await getProducts(token.value);
                dataProducts.value =  data.data
        } catch (error) {
            dataProducts.value = null;
        }
    }

    const fetchProduct = async (id)=>{
        try {
            const {data} = await getProduct(token.value, id);
                dataProduct.value =  data
        } catch (error) {
            dataProduct.value = null;
        }
    }

    const handleSearchProduct = async (keyword)=>{
        searchResult.value = null;
        productMessage.value = null;
        loadingsearch.value = true;
        try {
            const {data} = await searchProduct(keyword);
                searchResult.value =  data.data
                loadingsearch.value = false;

        } catch (error) {
            productMessage.value = error.response.data.data.error;
            loadingsearch.value = false;
        }
    }

    return {dataProducts, dataProduct, productMessage,searchResult, loadingsearch,fetchProducts, fetchProduct, handleSearchProduct}
})