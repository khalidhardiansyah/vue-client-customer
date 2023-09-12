import { defineStore } from "pinia";
import { computed, ref, } from "@vue/reactivity";
import { csrfCookie, login, register, getUser, logout, cekToken, requestResetPassword, updatePassword} from "../../http/auth-api"

export const useAuthStore = defineStore("authStore", ()=>{
    const user = ref(null)
    const token = ref(null)
    const tokenValid = ref(null)
    const message = ref(null)
    const isTokenValid = computed(()=>!!tokenValid.value);
   
    const isLoggedIn =computed(()=>!!user.value)

    const fetchUser = async (token)=>{
        try {
            const {data} = await getUser(token);
                user.value =  data.data
        } catch (error) {
            user.value = null;
        }
    }

    const handleLogin = async(credential)=>{
        await csrfCookie();
        try {
            const { data } = await login(credential);
            token.value = data
            await fetchUser(token.value);
          } catch (error) {
              message.value= error.response
          }
    }

    const handleRegister = async(user)=>{
        message.value = null
        try {
            const { data } = await register(user);
            message.value = data            
        } catch (error) {
           message.value = error.response
                }
        
    }

    const handleLogout = async()=>{
        await logout(token.value)
        token.value = null
        user.value = null
    }

    const handleCheckToken = async(logintoken)=>{
        const {data} = await cekToken(logintoken)
        tokenValid.value = data
       if (tokenValid.value === false) {
        user.value = null,
        token.value = null
       }
    }

    const handleRequestResetPassword = async(payload)=>{
        message.value = null
        try {
        const {data} = await requestResetPassword(payload);
            message.value = data
        } catch (error) {
            message.value = error.response.data
        }
    }

    const handleUpdatePassword = async(payload)=>{
        message.value = null

        try {
        const {data} = await updatePassword(payload);
            message.value = data
        } catch (error) {
            message.value = error.response.data
        }
    }

    return {
        user,token, isLoggedIn, fetchUser, handleLogin, handleLogout, handleCheckToken,handleRegister,message, tokenValid, isTokenValid,
        handleRequestResetPassword,
        handleUpdatePassword
    }},
    {
        persist:{
            paths:['user','token']
        }
       
    },)