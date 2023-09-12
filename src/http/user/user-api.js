import api from "../api";

export const updateProfile = (token, data) => api.patch(`/api/auth/profile`, data,{
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})


export const updatePassword = (token, data) => api.patch(`/api/auth/password`,data, {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})