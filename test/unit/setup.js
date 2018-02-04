import Vue from 'vue'
import LocalStorageMock from './../utils/local-storage-mock.js'

global.localStorage = new LocalStorageMock
Vue.config.productionTip = false
