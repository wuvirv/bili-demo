import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
    },
    showEdit: false
  },
  mutations: {
    setUserInfo (state, value) {
      state.userInfo = value
    },
    changeEditShow (state) {
      state.showEdit = !state.showEdit
    },
    updateInfo (state, value) {
      state.userInfo = value
    }
  },
  actions: {
    async getInfo (context) {
      const { data: res } = await http.get('user/' + localStorage.getItem('id'))
      context.commit('setUserInfo', res[0])
      localStorage.setItem('img', res[0].user_img)
      console.log(res[0])
    }
  },
  getters: {}
})
