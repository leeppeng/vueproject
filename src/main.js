import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import VueLazyload from 'vue-lazyload'

import 'common/stylus/index.styl'

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
  router,
  render: h => h(App)
})
