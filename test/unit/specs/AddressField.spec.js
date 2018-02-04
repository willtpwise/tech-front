import Vue from 'vue'
import AddressField from '@/components/AddressField'
import ElementUI from 'element-ui'
import Vuelidate from 'vuelidate'
import store from '@/store'

Vue.use(ElementUI)
Vue.use(Vuelidate)

describe('AddressField.vue', () => {
  let mock = {
    store,
    propsData: {
      name: 'test'
    }
  }

  it('should update the model when calling the add method', () => {
    const Constructor = Vue.extend(AddressField)
    const vm = new Constructor(mock).$mount()

    vm.add('test@test.com')

    expect(vm.value)
      .toEqual(['test@test.com'])
  })

  it('should clear the input when calling the add method', () => {
    const Constructor = Vue.extend(AddressField)
    const vm = new Constructor(mock).$mount()

    vm.add('test@test.com')

    expect(vm.input)
      .toEqual('')
  })

  it('should remove the relative index when calling the remove method', () => {
    const Constructor = Vue.extend(AddressField)
    const vm = new Constructor(mock).$mount()

    vm.value = ['test@test.com']
    vm.remove(0)

    expect(vm.value.length)
      .toEqual(0)
  })

  it('should call the add method on blur', () => {
    const Constructor = Vue.extend(AddressField)
    const vm = new Constructor(mock).$mount()
    const input = vm.$el.querySelector('input')

    vm.add = jest.fn()
    input.focus()
    input.blur()

    expect(vm.add.mock.calls.length)
      .toEqual(1)
  })

  it('should set the focus prop on focus', () => {
    const Constructor = Vue.extend(AddressField)
    const vm = new Constructor(mock).$mount()
    const input = vm.$el.querySelector('input')

    input.focus()

    expect(vm.focus)
      .toEqual(true)
  })

  it('should call the "add" method when the user hits "Enter" or "Space" and the input is not empty', () => {
    const Constructor = Vue.extend(AddressField)
    const vm = new Constructor(mock).$mount()
    const input = vm.$el.querySelector('input')

    vm.add = jest.fn()

    vm.input = 'test@test.com'

    vm.keyHandler({
      key: 'Enter',
      preventDefault: jest.fn()
    })

    vm.keyHandler({
      key: 'Space',
      preventDefault: jest.fn()
    })

    expect(vm.add.mock.calls.length)
      .toEqual(2)
  })

  it('should not call the "remove" method when the user hits "Backspace" and the input is not empty', () => {
    const Constructor = Vue.extend(AddressField)
    const vm = new Constructor(mock).$mount()
    const input = vm.$el.querySelector('input')

    vm.remove = jest.fn()

    vm.input = 'test@test.com'

    vm.keyHandler({
      key: 'Backspace',
      preventDefault: jest.fn()
    })

    expect(vm.remove.mock.calls.length)
      .toEqual(0)
  })

  it('should not call the "add" method when the user hits "Enter" or "Space" and the input is empty', () => {
    const Constructor = Vue.extend(AddressField)
    const vm = new Constructor(mock).$mount()
    const input = vm.$el.querySelector('input')

    vm.add = jest.fn()

    vm.keyHandler({
      key: 'Enter',
      preventDefault: jest.fn()
    })

    vm.keyHandler({
      key: 'Space',
      preventDefault: jest.fn()
    })

    expect(vm.add.mock.calls.length)
      .toEqual(0)
  })

  it('should call the "remove" method when the user hits "Backspace" and the input is empty', () => {
    const Constructor = Vue.extend(AddressField)
    const vm = new Constructor(mock).$mount()
    const input = vm.$el.querySelector('input')

    vm.remove = jest.fn()

    vm.value = ['test@test.com']
    vm.input = ''

    vm.keyHandler({
      key: 'Backspace',
      preventDefault: jest.fn()
    })

    expect(vm.remove.mock.calls.length)
      .toEqual(1)
  })
})
