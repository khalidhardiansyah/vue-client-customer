import api from "../api";
export const getCarts = (token) => api.get(`/api/cart`, {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const addCart = (token, data) => api.post(`/api/cart`, data,{
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const deleteCart = (token, id) => api.delete(`/api/cart/${id}`, {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

