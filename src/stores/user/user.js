import { ref } from "vue";
import {updatePassword, updateProfile} from "../../http/user/user-api"
import { useAuthStore } from "../auth/auth"
import { defineStore, storeToRefs } from "pinia"

export const useUserStore = defineStore("userStore", ()=>{
    const store = useAuthStore();
    const {token} = storeToRefs(store);
    const {fetchUser} = store

    const message = ref({})

    const handleUpdateProfile= async(profile)=>{
        message.value = {}
        try {
            const {data} = await updateProfile(token.value, profile)
            await fetchUser(token.value)
            message.value = data
        } catch (error) {
            console.log(error);
            message.value = error.response.data
        }
    }

    const handleUpdatePassword= async(password)=>{
        message.value = {}
        try {
            const {data} = await updatePassword(token.value, password)
            message.value = data
        } catch (error) {
            console.log(error);
        }
    }

    return {
        message,
        handleUpdatePassword,
        handleUpdateProfile
    }

})