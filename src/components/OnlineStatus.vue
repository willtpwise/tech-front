<template lang="html">
  <el-tooltip class="item" effect="dark" :content="help" placement="top-start">
    <div class="online-status" :class="{offline : !status}">
      <span class="online-status-icon">
        <i class="fas fa-wifi" aria-hidden="true"></i>
      </span>
      <div class="online-status-state">
        <template v-if='status'>Online</template>
        <template v-else>Offline <small>(Attempting to reconnect)</small></template>
      </div>
    </div>
  </el-tooltip>
</template>

<script>
export default {

  data () {
    return {
      status: navigator.onLine
    }
  },

  computed: {
    help () {
      if (this.status) {
        return 'Currently online'
      } else {
        return 'Currently offline. Trying to reconnect.'
      }
    }
  },

  mounted () {
    window.addEventListener('online', () => {
      this.status = true
    })

    window.addEventListener('offline', () => {
      this.status = false
    })
  }
}
</script>

<style lang="scss">
.online-status {
  font-size: 14px;
  display: inline-block;

  &.offline {
    color: #969696;
  }
}
</style>
