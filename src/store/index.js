import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfoForm: [],
    userDialogTitle: ''
  },
  mutations: {
    SET_USERINFOFORM (state, payload) {
      state.userInfoForm = payload.user
    },
    REMOVE_USERINFOFORM (state) {
      state.userInfoForm = null
    },
    SET_USERDIALOGTITLE (state, payload) {
      state.userDialogTitle = payload.title
    },
    REMOVE_USERDIALOGTITLE (state) {
      state.userDialogTitle = ''
    }
  },
  getters: {
    GET_USERINFOFORM: (state) => {
      return state.userInfoForm
    },
    GET_USERDIALOGTITLE: (state) => {
      return state.userDialogTitle
    }
  },
  actions: {
  },
  modules: {
    user
  }
})
