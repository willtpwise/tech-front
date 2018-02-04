<template lang="html">
  <div class="online-status" :class="{online : status}">
    <i class="fas fa-wifi"></i>
    <span v-if='status'>Online</span>
    <span v-else>Offline</span>
  </div>
</template>

<script>
export default {

  data () {
    return {
      status: true
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

  &.online {
    color: #969696
  }
}
</style>
