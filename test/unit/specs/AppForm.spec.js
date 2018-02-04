import Vue from 'vue'
import AppForm from '@/components/AppForm'
import ElementUI from 'element-ui'
import Vuelidate from 'vuelidate'
import store from '@/store'

Vue.use(ElementUI)
Vue.use(Vuelidate)

describe('AppForm.vue', () => {

  it('should prevent sending when the "subject" field is empty', () => {
    const Constructor = Vue.extend(AppForm)
    const vm = new Constructor({
      store
    }).$mount()

    vm.send = jest.fn()
    vm.message.subject = ''
    vm.requestSend({
      preventDefault: jest.fn()
    })

    expect(vm.send.mock.calls.length)
      .toEqual(0)
  })

  it('should prevent sending when the "to" field is empty', () => {
    const Constructor = Vue.extend(AppForm)
    const vm = new Constructor({
      store
    }).$mount()

    vm.send = jest.fn()
    vm.message.to = []
    vm.requestSend({
      preventDefault: jest.fn()
    })

    expect(vm.send.mock.calls.length)
      .toEqual(0)
  })

  it('should call the "send" method on successful submission', () => {
    const Constructor = Vue.extend(AppForm)
    const vm = new Constructor({
      store
    }).$mount()

    vm.send = jest.fn()

    vm.message.to = ['test@test.com']
    vm.message.subject = 'test'

    vm.requestSend({
      preventDefault: jest.fn()
    })

    expect(vm.send.mock.calls.length)
      .toEqual(1)
  })

  it('should call the "send" method on retry', () => {
    const Constructor = Vue.extend(AppForm)
    const vm = new Constructor({
      store
    }).$mount()

    vm.send = jest.fn()

    vm.retry()

    expect(vm.send.mock.calls.length)
      .toEqual(1)
  })

  it('should fail after four retries', () => {
    const Constructor = Vue.extend(AppForm)
    const vm = new Constructor({
      store
    }).$mount()

    vm.send = () => {
      vm.attempt++
    }
    vm.fail = jest.fn()

    vm.retry()
    vm.retry()
    vm.retry()
    vm.retry()
    vm.retry()

    vm.$el.querySelector('.submit button').click()

    expect(vm.fail.mock.calls.length)
      .toEqual(1)
  })

  it('should focus on the parsed element', () => {
    const Constructor = Vue.extend(AppForm)
    const vm = new Constructor({
      store
    }).$mount()

    const selector = '#test-element'
    const element = document.createElement('div')
    var focused = false

    element.id = 'test-element'
    element.focus = () => {
      focused = true
    }

    vm.$el.appendChild(element)

    vm.focusOn(selector)

    expect(focused)
      .toEqual(true)
  })

  it('should clear the message when calling the success message', () => {
    const Constructor = Vue.extend(AppForm)
    const vm = new Constructor({
      store
    }).$mount()

    vm.message.to = ['t@t.c']
    vm.message.cc = ['t@t.c']
    vm.message.bcc = ['t@t.c']
    vm.message.body = 'body'
    vm.message.subject = 'test'

    vm.success()

    expect(vm.message.to)
      .toEqual([])
    expect(vm.message.cc)
      .toEqual([])
    expect(vm.message.bcc)
      .toEqual([])
    expect(vm.message.subject)
      .toEqual('')
    expect(vm.message.body)
      .toEqual('')
  })

  it('should clear the attempt counter on success', () => {
    const Constructor = Vue.extend(AppForm)
    const vm = new Constructor({
      store
    }).$mount()

    vm.attempt = 1
    vm.success()

    expect(vm.attempt)
      .toEqual(0)
  })

  it('should clear the attempt counter on failure', () => {
    const Constructor = Vue.extend(AppForm)
    const vm = new Constructor({
      store
    }).$mount()

    vm.attempt = 1
    vm.fail()

    expect(vm.attempt)
      .toEqual(0)
  })
})
