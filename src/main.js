import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Axios from 'axios'
import VueLazyload from 'vue-lazyload'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    cartNum: 0,
    userNmae: '',
    isLogin: false
  },
  mutations: {
    updateCartNum(state, num) {
      state.cartNum = num
    },
    loginUser (state, userName) {
      sessionStorage.setItem('userName', JSON.stringify(userName))
      sessionStorage.setItem('isLogin', true)
      state.userNmae = userName
      state.isLogin = true
    },
    singOut (state) {
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('isLogin')
      state.userNmae = ''
      state.isLogin = false
    }
  },
  getters: {
    isLogin(state) {
      if (!state.isLogin) {
        state.isLogin = sessionStorage.getItem('isLogin')
        state.userNmae = sessionStorage.getItem('userName')
      }
      return state.userNmae
    }
  }
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
Vue.prototype.$http = Axios
/* 将 axios 改写为 Vue 的原型属性，在其它的组件中，就可以使用 axios 命令了 */
Vue.config.productionTip = false
/* 图片懒加载插件 */
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: '/static/loading-svg/loading-spinning-bubbles.svg'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
