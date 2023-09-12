import api from "./api";
export const csrfCookie = ()=> api.get('/sanctum/csrf-cookie')

export const login = (credential) => api.post('/api/auth/login', credential)
export const register = (user) => api.post('/api/auth/register', user)
export const logout = (token) => api.get('/api/auth/logout',{
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
export const getUser = (token) => api.get('/api/user', {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const cekToken = (token) => api.get('/api/auth/check-token', {
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
}})

export const requestResetPassword = (payload) => api.post('/api/auth/send-reset-password', payload)

export const updatePassword = (payload) => api.post('/api/auth/reset-password', payload)



