import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/global.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import blCompont from './components/bl-components'
import http from './http'
import '../src/assets/css/font.css'
import store from './store'

Vue.prototype.$http = http
Vue.use(blCompont)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
