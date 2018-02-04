import Vue from 'vue'
import TopBar from '@/components/TopBar'
import ElementUI from 'element-ui'
import store from '@/store' 

Vue.use(ElementUI)

describe('TopBar.vue', () => {

  it('should read render the passed heading', () => {
    const Constructor = Vue.extend(TopBar)
    const vm = new Constructor({
      store,
      propsData: {
        heading: 'Heading'
      }
    }).$mount()

    expect(vm.$el.querySelector('h1').textContent)
      .toEqual('Heading')
  })

  it('should read render the options button', () => {
    const Constructor = Vue.extend(TopBar)
    const vm = new Constructor({
      store
    }).$mount()

    expect(vm.$el.querySelector('button'))
      .toBeTruthy()
  })

  it('should open the options modal when the options button is clicked', () => {
    const Constructor = Vue.extend(TopBar)
    const vm = new Constructor({
      store
    }).$mount()

    vm.$el.querySelector('button').click()

    expect(vm.options.visible)
      .toEqual(true)
  })
})
