import api from "../api"

export const getTransaksi = (token) => api.get(`/api/user-transaksi`, {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const createTransaksi = (token, data) => api.post(`/api/transaksi`, data,{
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})


export const cancelPayment = (token, id, data) => api.patch(`/api/cancel-payment/${id}`,data,{
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const invoice = (token, id) => api.get(`/api/invoice/${id}`, {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    responseType: 'blob',
})

export const deleteTransaksi = (token, id) => api.delete(`/api/transaksi/${id}`, {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    },
})