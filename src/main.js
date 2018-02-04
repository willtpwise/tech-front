import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './assets/element.scss'
import Vuelidate from 'vuelidate'
import store from './store'

Vue.use(Vuelidate)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
