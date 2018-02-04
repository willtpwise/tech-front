import qs from 'qs'
import _axios from '@/utils/axios'

export default {
  namespaced: true,

  state: {
    message: {
      to: [],
      cc: [],
      bcc: [],
      body: '',
      subject: ''
    },
    que: []
  },

  mutations: {
    setMessage (state, payload) {
      state.message = payload
    },
    enqueue (state, payload) {
      state.que.push(payload)
    },
    clearEnqueued (state) {
      state.que = []
    }
  },

  actions: {
    send (context, payload) {
      if (navigator.onLine) {
        return _axios.post('/messages', qs.stringify(payload))
      } else {
        return new Promise(function (resolve) {
          const flush = () => {
            context.dispatch('sendEnqueued')
            window.removeEventListener('online', flush)
          }

          context.commit('enqueue', payload)
          window.addEventListener('online', flush)
          resolve({
            status: 'enqueued'
          })
        })
      }
    },

    clear (context) {
      context.commit('setMessage', {
        to: [],
        cc: [],
        bcc: [],
        body: '',
        subject: ''
      })
    },

    sendEnqueued (context) {
      context.state.que.forEach((message) => {
        context.dispatch('send', message)
      })
      context.commit('clearEnqueued')
    }
  }
}
