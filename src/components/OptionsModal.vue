<template lang="html">
  <el-dialog
    class="options"
    title="Options"
    :visible.sync="options.visible"
    :before-close="save">

    <el-form ref="form" :model="options" label-width="120px">
      <el-form-item label="Show CC field">
        <el-switch v-model="options.cc" name="options_cc"></el-switch>
      </el-form-item>
      <el-form-item label="Show BCC field">
        <el-switch v-model="options.bcc" name="options_bcc"></el-switch>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">Done</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    save () {
      // Close the dialog
      this.options.visible = false

      // Save the options in localStorage
      this.$store.dispatch('options/save', this.options)
    }
  },

  computed: {
    ...mapState({
      options: state => state.options.options
    })
  }
}
</script>

<style lang="css">
.options .el-dialog {
  width: 100%;
  max-width: 380px;
}
</style>
