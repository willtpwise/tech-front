import Vue from 'vue'
import OnlineStatus from '@/components/OnlineStatus'
import ElementUI from 'element-ui'
import Vuelidate from 'vuelidate'
import store from '@/store'

Vue.use(ElementUI)
Vue.use(Vuelidate)

describe('OnlineStatus.vue', () => {
  let mock = {
    store
  }

  it('should read as online when the status is true', () => {
    const Constructor = Vue.extend(OnlineStatus)
    const vm = new Constructor(mock).$mount()

    vm.status = true
    const element = vm.$el.querySelector('.online-status-state')

    expect(element.textContent)
      .toContain('Online')
  })
})
