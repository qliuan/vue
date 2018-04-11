// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'

import VueGoodTable from 'vue-good-table'
// import the styles
import 'vue-good-table/dist/vue-good-table.css'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueGoodTable)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
