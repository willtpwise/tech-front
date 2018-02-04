import Vue from 'vue'
import FieldError from '@/components/FieldError'
import ElementUI from 'element-ui'
import Vuelidate from 'vuelidate'
import store from '@/store'

Vue.use(ElementUI)
Vue.use(Vuelidate)

describe('FieldError.vue', () => {
  let mock = {
    store,
    propsData: {
      value: false,
      message: 'Test message'
    }
  }

  it('should display the passed message', () => {
    const Constructor = Vue.extend(FieldError)
    const vm = new Constructor(mock).$mount()

    expect(vm.$el.textContent)
      .toContain('Test message')
  })

  it('should respond to v-model changes', () => {
    const Constructor = Vue.extend(FieldError)
    const vm = new Constructor(mock).$mount()

    vm.value = true

    expect(vm.visible)
      .toEqual(true)
  })
})
