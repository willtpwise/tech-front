import Vue from 'vue'
import App from '@/App'
import ElementUI from 'element-ui'
import Vuelidate from 'vuelidate'
import store from '@/store'

Vue.use(ElementUI)
Vue.use(Vuelidate)

describe('App.vue', () => {

  it('should truncate the computed heading', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor({
      store
    }).$mount()

    // 28 character string
    vm.message.subject = 'A really, really long string'

    expect(vm.heading.length)
      .toEqual(20)
  })

})
