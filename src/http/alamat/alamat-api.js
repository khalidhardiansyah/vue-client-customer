import api from "../api";

export const getProvinsi = () => api.get(`/api/provinsi`)

export const getKabupaten = (id) => api.get(`/api/provinsi/${id}`)

export const getKecamatan = (id) => api.get(`/api/kota/${id}`)

export const getKelurahan = (id) => api.get(`/api/kecamatan/${id}`)