import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: window.localStorage.getItem('user') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).id,
      username: window.localStorage.getItem('user') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    }

  },
  mutations: {
    login(state, data) {
      state.user.id = data.id
      state.user.username = data.username
      window.localStorage.setItem('user', JSON.stringify({ "id": data.id, "username": data.username }))
    },
    logout(state) {
      // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
      state.user = {}
      window.localStorage.removeItem('user')
      // state.adminMenus = []
    }
  },
  actions: {
  },
  modules: {
  }
})
