import Vue from 'vue'
import Submit from '@/components/Submit'
import ElementUI from 'element-ui'

Vue.use(ElementUI)

describe('Submit.vue', () => {
  it('should read "sending" when sending', () => {
    const Constructor = Vue.extend(Submit)
    const vm = new Constructor({
      propsData: {
        sending: true
      }
    }).$mount()
    expect(vm.$el.textContent)
      .toEqual('Sending...')
  })

  it('should read "send" when not sending', () => {
    const Constructor = Vue.extend(Submit)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent)
      .toEqual('Send')
  })
})
