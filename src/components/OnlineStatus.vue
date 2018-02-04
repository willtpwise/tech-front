<template lang="html">
  <div class="online-status" :class="{offline : !status}" :aria-label='help'>
    <span class="online-status-icon">
      <i class="fas fa-wifi" aria-hidden="true"></i>
    </span>
    <span class="online-status-state">
      <template v-if='status'>Online</template>
      <template v-else>Offline <small>(Attempting to reconnect)</small></template>
    </span>
  </div>
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
