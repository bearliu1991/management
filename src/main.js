// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@/assets/css/customize.styl'
import utils from '@/utils'
import vueFilters from './utils/vueFilters'
Object.keys(vueFilters).forEach((key) => { Vue.filter(key, vueFilters[key]) })

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(utils)
/* eslint-disable no-new */
window.BUS = new Vue()
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  // data: {
  //   Bus: new Vue()
  // }
})
