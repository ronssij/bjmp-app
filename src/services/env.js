import Vue from 'vue'
import api from './api'

const env = {
    apiUrl: process.env.VUE_APP_API_URL
}

Vue.prototype.$env = api

export default env