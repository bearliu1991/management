import Http from '@/utils/public'
import Path from '@/api'

const state = {
  loginInfo: null,
  userInfo : null,
  nickName : '',
  isLogin : true
}

const getters = {
  user (state) {
    return state.userInfo && state.userInfo.user
  }
}

const mutations = {
  NICKNAME (state, data) {
    state.nickName = data
  },
  LOGIN_SHOW (state, data) {
    state.isLogin = data
  },
  LOGIN_INFO (state, data) {
    state.loginInfo = data
  },
  USER_INFO (state, data) {
    state.userInfo = data
  },
  ROUTE_MAP (state, data) {

  }
}

const actions = {
  getRouteMap ({ commit }) {
    Http.httpGet(Path.routeMap).then((res) => {
      let data = res.data.data
      commit('ROUTE_MAP', data)
    })
  },
  getUserInfo ({ commit }) {
    Http.httpGet(Path.routeMap).then((res) => {
      let data = res.data.data
      commit('ROUTE_MAP', data)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
