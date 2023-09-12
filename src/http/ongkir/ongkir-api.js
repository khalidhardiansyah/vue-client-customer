import api from "../api";
export const getProvinces = (token) => api.get(`/api/provinces`, {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const getCities = (token, id) => api.get(`/api/cities/${id}`,{
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const cekOngkir = (token, data) => api.post(`/api/cek-ongkir`, data,{
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

