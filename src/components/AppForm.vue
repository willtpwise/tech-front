<template lang="html">
  <el-form ref="form" :model="message" label-width="65px">

    <el-form-item label="To">
      <address-field name="To" v-model='message.to' />
    </el-form-item>

    <el-form-item label="CC" v-if='options.cc'>
      <address-field name="CC" v-model='message.cc' />
    </el-form-item>

    <el-form-item label="BCC" v-if='options.bcc'>
      <address-field name="BCC" v-model='message.bcc' />
    </el-form-item>

    <el-form-item label="Subject">
      <el-input name="Subject" v-model="message.subject" />
    </el-form-item>

    <el-form-item label="Message">
      <el-input name="Message" type="textarea" :rows="13" v-model="message.body" />
    </el-form-item>

    <div class="actions">
      <div class="actions-online">
        <online-status />
      </div>
      <div class="actions-submit">
        <submit @click.native="requestSend($event)" :sending="attempt > 0" />
      </div>
    </div>

  </el-form>
</template>

<script>
import Submit from './Submit'
import AddressField from './AddressField'
import OnlineStatus from './OnlineStatus'

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
    AddressField,
    OnlineStatus
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
      this.focusOn('input[name="To"]')
    },

    focusOn (selector) {
      var input = this.$el.querySelector(selector)
      if (input) {
        input.focus()
      }
    },

    requestSend (e) {
      e.preventDefault()
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

<style lang="scss">
.actions {
  display: table;
  width: 100%;

  .actions-online,
  .actions-submit {
    display: table-cell;
    vertical-align: middle;
  }

  .actions-online {
    text-align: left;
    padding-left: 65px;
  }

  .actions-submit {
    text-align: right;
  }
}

.el-form-item {
  margin-bottom: 5px;
}
</style>
