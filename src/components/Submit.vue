<template lang="html">
  <el-button role="submit" type="primary" :disabled="sending">
    <template v-if='sending'>Sending...</template>
    <template v-else>Send</template>
  </el-button>
</template>

<script>
export default {
  props: {
    sending: Boolean
  }
}
</script>

<style lang="css">
</style>
