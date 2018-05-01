import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'
import Axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.use(VueLazyLoad, {
  loading: require('assets/default.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
