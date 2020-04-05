import Vue from 'vue'
import axios from 'axios'
import env from './env'

const api = axios.create({
    baseURL: env.apiUrl
})

api.interceptors.request.use(
    function (config) {
        const accessToken = null

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    function(response) {
        return response
    },
    function(error) {
        return Promise.reject(error)
    }
)

Vue.prototype.$api = api

export default api
