import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth/auth'
import {useCartsStore} from "../stores/Cart/cart"
import {storeToRefs} from "pinia"
import routes from './routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

// router.beforeEach(async (to, from)=>{
//   const store = useAuthStore();
//   if (to.meta.auth && !store.isLoggedIn){
//     return { name: "login"}
//   }else if(to.meta.guest && store.isLoggedIn){
//     return {name:"home"}
//   }
// })


router.beforeEach(async (to, from)=>{
  const store = useAuthStore();
  const {isLoggedIn, user, token, isTokenValid} = storeToRefs(store);
  const {handleCheckToken} = store

  const cartstore = useCartsStore();
  const {fetchCarts} = cartstore;

  await handleCheckToken(token.value);
  
  if (isTokenValid.value) {
    await fetchCarts();
    if(to.meta.guest && isLoggedIn.value){
      return {name:"home"}
    }else if(to.meta.customer && isLoggedIn.value && user.value.role_id !== 'customer'){
      return{ name:'/salah_role'}
    }
  }
  else if (to.meta.auth &&  !isLoggedIn.value && !isTokenValid.value){
  return { name: "login"}
}
})

export default router
