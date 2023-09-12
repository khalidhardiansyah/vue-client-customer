import {getCarts,
    addCart,
    deleteCart} from "../../http/cart/cart-api"
    import {defineStore, storeToRefs} from "pinia"
    import {useAuthStore} from "../auth/auth"
    import { ref, computed} from "vue"
    
    
    export const useCartsStore = defineStore("cartStore", ()=>{
        const store = useAuthStore();
        const {token} = storeToRefs(store);
        const isOpen = ref(false);
        const dataCarts = ref(null);
        const message = ref({})
    
        const fetchCarts = async ()=>{
            try {
                const {data} = await getCarts(token.value);
                    dataCarts.value =  data.data
            } catch (error) {
                dataCarts.value = null;
            }
        }

        const removeCarts = async (id)=>{
            try {
              await deleteCart(token.value, id);
            } catch (error) {
            console.log(error);
            }
        }
    
        const createCart = async (data)=>{
            message.value = {}
            try {
              await addCart(token.value, data);
              isOpen.value = true
            } catch (error) {
                message.value = error.response.data.data
               
            }
        }

        const totalHarga = computed(() => {
            let total = 0
            dataCarts.value?.forEach((data) => {
              total += data.product.harga_jual * data.jumlah_item;
            });
            return total
        });

        const totalItems = computed(() => dataCarts.value?.length);
    
        return {dataCarts, fetchCarts, removeCarts, createCart, totalHarga, totalItems, message,isOpen}
    })