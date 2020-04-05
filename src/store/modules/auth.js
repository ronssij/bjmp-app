import Cookies from 'js-cookie'
import api from '@/services/api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    user: {},
    isAuthenticated: false,
    token: {
      accessToken: null,
      expiresIn: null,
      tokenType: 'Bearer',
      uuid: null
    },
    timestamp: new Date().getTime()
  },
  mutations: {
    setToken(state, token) {
      if (token) {
        Cookies.set('AUTH_TOKEN', token)
        state.token = token
        state.isAuthenticated = true
      }
    },

    clearToken(state) {
      Cookies.remove('AUTH_TOKEN')
      state.token = {
        accessToken: null,
        expiresIn: null,
        tokenType: 'Bearer',
        uuid: null
      }
      state.isAuthenticated = false
    },

    changeTimestamp(state) {
      state.timestamp = new Date().getTime()
    }
  },
  actions: {
    init({ commit }) {
      const token = Cookies.getJSON('AUTH_TOKEN')
      commit('setToken', token)
    },

    getAuthenticatedUser({ commit }) {
      api
        .get('/auth/me')
        .then(res => {
          commit('setUser', res.data.data)
        })
        .catch(err => {
          if (err.response.status === 401) {
            commit('clearToken')
            router.replace({ name: 'auth.login' })
          }
        })
    },

    logout({ commit }) {
      api.post('/auth/logout').then(() => {
        commit('clearToken')
        router.replace({ name: 'auth.login' })
      })
    }
  }
}