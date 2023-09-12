import api from "../api";
export const getProducts = (token) => api.get('/api/products', {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const getProduct = (token, id) => api.get(`/api/products/${id}`, {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const searchProduct = (keyword) => api.get(`/api/product/search?keyword=${keyword}`, {
    headers:{
        'Accept': 'application/json',
    }
})

