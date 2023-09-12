import HomeView from '../views/HomeView.vue'
import { useCartsStore } from '../stores/Cart/cart'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';


    const routes = [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta:{
          title: "About Us"
        }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue'),
        meta: {
          title: "Profile",
          auth: true,
          customer: true,
        },
      },
      {
        path: '/product/:id',
        name: 'product',
        component: () => import('../views/ProductView.vue'),
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../views/CheckoutView.vue'),
        meta: {
          title: "Checkout",
          auth: true,
          customer: true,
        },
        beforeEnter:(to)=>{
          const store = useCartsStore();
          const { dataCarts} = storeToRefs(store);
          if (!dataCarts.value.length) {
            return {name:"allCollectionView"}
          }
        }
      },
      {
        path: '/order-history',
        name: 'order_history',
        component: () => import('../views/OrderHistoryView.vue'),
        meta: {
          title: "Order History",
          auth: true,
          customer: true,
        },
      },
      {
        path: '/collections',
        name: 'collectionLayout',
        component: () => import('../views/CollectionLayout.vue'),
        children:[
          {
            path:'',
            name:'allCollectionView',
            component: ()=>import('../views/AllCollectionView.vue')
            ,
        meta:{
          title: "Category"
        }
          },
          {
            path:'/collections/:id',
            name:'collectionView',
            component: ()=>import('../views/CollectionView.vue'),
            meta:{
              title: "Category"
            }
          }
        ]
      },
      {
        meta: {
          title: "Size Guide",
        },
        path: '/size-guide',
        name: 'size-guide',
        component: () => import('../views/SizeGuideView.vue')
      },
      {
        meta: {
          title: "How To Buy",
        },
        path: '/how-to-shop',
        name: 'how-to-shop',
        component: () => import('../views/HowToShopView.vue')
      },
      {
        meta: {
          title: "Login",
          guest: true
        },
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue')
      },
      {
        meta: {
          title: "Account",
          guest: true
        },
        path: '/recover',
        name: 'recover',
        component: () => import('../views/RequestResetPassword.vue')
      },
      {
        meta: {
          title: "Reset Password",
          guest: true
        },
        path: '/reset-password/:token',
        name: 'reset-password',
        component: () => import('../views/ResetPasswordFormView.vue'),
        beforeEnter:(to)=>{
          if (to.params.token.length <= 60) {
            return {name:"login"}
          }
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/RegisterView.vue'),
        meta: {
          title: "Register",
          guest: true,
          
        },
      },
      {
        meta: {
          title: "Error",
        },
        path: "/:notFound(.*)",
        name: "error",
        component: () => import("../views/ErrorView.vue"),
      },
    ]

  
  export default routes