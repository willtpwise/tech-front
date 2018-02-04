import Vue from 'vue'
import Vuex from 'vuex'

import options from './modules/Options'
import messages from './modules/Messages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    options,
    messages
  }
})
