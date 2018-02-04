import Vue from 'vue'
import OptionsModal from '@/components/OptionsModal'
import ElementUI from 'element-ui'
import store from '@/store'

Vue.use(ElementUI)

describe('OptionsModal.vue', () => {

  it('should read render the passed heading', () => {
    const Constructor = Vue.extend(OptionsModal)
    const vm = new Constructor({
      store,
      propsData: {
        heading: 'Options'
      }
    }).$mount()

    expect(vm.$el.querySelector('.el-dialog__title').textContent)
      .toEqual('Options')
  })

  it('should start closed', () => {
    const Constructor = Vue.extend(OptionsModal)
    const vm = new Constructor({
      store
    }).$mount()

    expect(
      vm.$el.style.display === 'none')
      .toEqual(true)
  })

  it('should close on click', () => {
    const Constructor = Vue.extend(OptionsModal)
    const vm = new Constructor({
      store
    }).$mount()

    vm.options.visible = true

    let close = vm.$el.querySelector('.el-dialog__header button')
    close.click()

    expect(
      vm.options.visible)
      .toEqual(false)
  })
})
