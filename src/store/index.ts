import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 容器的状态实现了数据共享，在组件里面访问方便，但是没有持久化功能，本地存储实现持久化
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null') // 当前用户状态
  },
  mutations: {
    // 修改容器数据必须使用mutation函数
    setUser (state, payload) {
      // 把JSON格式的字符串转换成对象存到user中
      state.user = JSON.parse(payload)
      // 为防止页面刷新数据丢失，我们需要把user数据持久化
      // 注意： 本地存储只能存字符串
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
