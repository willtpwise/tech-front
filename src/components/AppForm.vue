<template lang="html">
  <el-form ref="form" :model="message" label-width="65px">

    <el-form-item label="To">
      <address-field name="To" v-model='message.to' validate="email" />
    </el-form-item>

    <el-form-item label="CC" v-if='options.cc'>
      <address-field name="CC" v-model='message.cc' validate="email" />
    </el-form-item>

    <el-form-item label="BCC" v-if='options.bcc'>
      <address-field name="BCC" v-model='message.bcc' validate="email" />
    </el-form-item>

    <el-form-item label="Subject">
      <el-input name="Subject" v-model="message.subject"></el-input>
    </el-form-item>

    <el-form-item label="Message">
      <el-input name="Message" type="textarea" :rows="13" v-model="message.body"></el-input>
    </el-form-item>

    <div class="submit">
      <submit @click.native="requestSend" :sending="attempt > 0" />
    </div>

  </el-form>
</template>

<script>
import Submit from './Submit'
import AddressField from './AddressField'

import { mapState } from 'vuex'

export default {
  data () {
    return {
      attempt: 0
    }
  },

  computed: mapState({
    message: state => state.messages.message,
    options: state => state.options.options
  }),

  components: {
    Submit,
    AddressField
  },

  methods: {
    send () {
      this.attempt++
      this.$store.dispatch('messages/send', this.message)
        .then((response) => {
          if (response.data.status) {
            this.success()
          } else {
            this.retry()
          }
        })
        .catch((error) => {
          if (error.response || error.request) {
            this.retry()
          } else {
            this.fail()
          }
        })
    },

    retry () {
      if (this.attempt <= 3) {
        this.send()
      } else {
        this.fail()
      }
    },

    fail () {
      this.attempt = 0
      this.$message({
        type: 'warning',
        message: 'Your message could not be sent. Try again'
      })
    },

    success () {
      this.attempt = 0
      this.$message({
        type: 'info',
        message: 'Your message has been sent'
      })
      this.$store.dispatch('messages/clear')
    },

    focusOn (selector) {
      var input = this.$el.querySelector(selector)
      if (input) {
        input.focus()
      }
    },

    requestSend () {
      if (this.message.to.length === 0) {
        this.$alert('Your email is missing a recipient', 'No recipient', {
          confirmButtonText: 'Close',
          type: 'warning'
        }).then(() => {
          this.focusOn('input[name="To"]')
        })
      } else if (this.message.subject === '') {
        this.$confirm('Your email is missing a subject line, are you sure want to send?', 'No subject', {
          confirmButtonText: 'Send',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.send()
        }).catch(() => {
          this.focusOn('input[name="Subject"]')
        })
      } else {
        this.send()
      }
    }
  }
}
</script>

<style lang="css">
.submit {
  text-align: right;
}

.el-form-item {
  margin-bottom: 5px;
}
</style>
