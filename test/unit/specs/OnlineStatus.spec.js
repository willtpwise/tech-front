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

  it('should change the assistive text in sync with the online status', () => {
    const Constructor = Vue.extend(OnlineStatus)
    const vm = new Constructor(mock).$mount()

    vm.status = true

    expect(vm.help)
      .toContain('online')
  })

  it('should change the assistive text in sync with the online status', () => {
    const Constructor = Vue.extend(OnlineStatus)
    const vm = new Constructor(mock).$mount()

    vm.status = false

    expect(vm.help)
      .toContain('offline')
  })

  it('should respond to the window "online" event', () => {
    const Constructor = Vue.extend(OnlineStatus)
    const vm = new Constructor(mock).$mount()

    const e = new Event('online')

    vm.status = false
    global.navigator = {
      onLine: true
    }
    window.dispatchEvent(e)

    expect(vm.status)
      .toEqual(true)
  })

  it('should respond to the window "offline" event', () => {
    const Constructor = Vue.extend(OnlineStatus)
    const vm = new Constructor(mock).$mount()

    const e = new Event('offline')

    vm.status = true
    global.navigator = {
      onLine: false
    }
    window.dispatchEvent(e)

    expect(vm.status)
      .toEqual(false)
  })
})
