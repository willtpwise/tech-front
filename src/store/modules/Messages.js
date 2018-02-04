import qs from 'qs'
import axios from 'axios'

export default {
  namespaced: true,

  state: {
    message: {
      to: [],
      cc: [],
      bcc: [],
      body: '',
      subject: ''
    }
  },

  mutations: {
    setMessage (state, payload) {
      state.message = payload
    }
  },

  actions: {
    send (context, payload) {
      return axios.post('http://localhost:3000/messages', qs.stringify(payload))
    },

    clear (context) {
      context.commit('setMessage', {
        to: [],
        cc: [],
        bcc: [],
        body: '',
        subject: ''
      })
    }
  }
}
