import qs from 'qs'
import axios from 'axios'

const model = {
  to: [],
  cc: [],
  bcc: [],
  body: '',
  subject: ''
}

export default {
  namespaced: true,

  state: {
    message: Object.assign({}, model)
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
      context.commit('setMessage', Object.assign({}, model))
    }
  }
}
