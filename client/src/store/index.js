import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],

  state: {
    apiURL: 'http://localhost:3000',
    user: null,
    authStatus: null,
    authError: false,
    factoryData: [],
    // factoryUsage: [],
  },
  mutations: {
    SET_FACTORY_DATA(state, payload) {
      state.factoryData = payload
    },
    // SET_FACTORY_USAGE(state, payload) {
    //   state.factoryUsage = payload
    // },
    SET_USER(state, payload) {
      state.user = payload
      if (state.user) {
        if (state.user.remember) {
          localStorage.setItem('user', JSON.stringify(payload))
        }
      }
    },
    SET_USERNAME(state, payload) {
      if (state.user) {
        state.user.username = payload
      }
    },
  },
  actions: {
    async getFactories({ commit }) {
      try {
        const res = await axios.get('/api/factories')
        res.data.forEach((factory) => {
          factory.membershipstart = factory.membershipstart.slice(0, 10)
          factory.membershipend = factory.membershipend.slice(0, 10)
        })
        commit('SET_FACTORY_DATA', res.data)
      } catch (error) {
        console.log(error)
      }
    },
    setUser({ commit }, payload) {
      commit('SET_USER', payload)
    },
    logout({ commit }) {
      localStorage.removeItem('user')
      commit('SET_USER', null)
      setTimeout(() => {
        router.push('/')
      }, 1000)
    },
  },
  getters: {
    getUser: (state) => {
      const user = state.user
      return user
    },
  },
  modules: {},
})
