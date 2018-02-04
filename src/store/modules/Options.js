export default {
  namespaced: true,

  state: {
    options: {
      cc: true,
      bcc: false,
      visible: false
    }
  },

  mutations: {
    setOptions (state, payload) {
      state.options = payload
    }
  },

  actions: {
    save (context, payload) {
      localStorage.setItem('tech-test-options', JSON.stringify(payload))
    },

    load (context) {
      var local = localStorage.getItem('tech-test-options')
      if (local) {
        context.commit('setOptions', JSON.parse(local))
      }
    }
  }
}
