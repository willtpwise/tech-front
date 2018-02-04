<template>
  <div id="app">
    <top-bar :heading="heading" />

    <el-container class="main">
      <el-col>
        <app-form />
      </el-col>
    </el-container>

    <options-modal />
  </div>
</template>

<script>
import TopBar from './components/TopBar'
import AppForm from './components/AppForm'
import OptionsModal from './components/OptionsModal'

import { mapState } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapState({
      message: state => state.messages.message,
      options: state => state.options.options
    }),

    heading () {
      if (this.message.subject) {
        return this.truncate(this.message.subject, 20)
      } else {
        return 'New message'
      }
    }
  },

  methods: {
    truncate (string, max) {
      if (string.length > max) {
        return string.substr(0, max - 4) + ' ...'
      } else {
        return string
      }
    }
  },

  watch: {
    heading () {
      document.title = `Email | ${this.heading}`
    }
  },

  components: {
    TopBar,
    AppForm,
    OptionsModal
  },

  mounted () {
    // Load the user's local options
    this.$store.dispatch('options/load')
  }
}
</script>

<style lang="scss">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.main {
  padding: 0 20px
}

.el-input__inner {
  height: 37px;
}
</style>
