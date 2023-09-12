import api from "../api";

export const getCategories = (token) => api.get(`/api/category`, {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const getCategory = (token, id) => api.get(`/api/category/${id}`, {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})