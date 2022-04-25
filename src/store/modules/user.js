import axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    username: '',
    avatar: '',
    role: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  login ({ commit }, userInfo) {
    const { username, password, captchaCode } = userInfo
    return axios({
      method: 'post',
      url: '/user/login',
      data: {
        username: username,
        password: password,
        captchaCode: captchaCode
      }
    }).then(res => {
      console.log(res)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
