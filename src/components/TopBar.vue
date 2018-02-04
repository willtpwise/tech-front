<template lang="html">
  <el-header class="header">
    <div class="header-title">
      <h1>{{heading}}</h1>
    </div>
    <div class="header-actions">
      <el-tooltip class="item" effect="dark" content="Options" placement="left-start">
        <el-button
          round
          type="primary"
          icon="el-icon-more"
          @click="openOptions"
          aria-label="Options">
        </el-button>
      </el-tooltip>
    </div>
  </el-header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    heading: String
  },

  methods: {
    openOptions () {
      this.options.visible = true
    }
  },

  computed: {
    ...mapState({
      options: state => state.options.options
    })
  }
}
</script>

<style lang="scss">
@import "./../assets/variables.scss";
.header {
  width: 100%;
  display: table;
  background: $--color-primary;
  color: $--color-white;
  margin-bottom: 20px;

  .header-title,
  .header-actions {
    display: table-cell;
    vertical-align: middle;
  }

  .header-title {
    text-align: left;
    padding-left: 65px;
  }

  .header-actions {
    text-align: right;

    img {
      width: 0.8em;
    }

    button {
      background: transparent;

      &:hover,
      &:focus {
        background: $--color-primary-light-2
      }
    }
  }

  @media (max-width: 768px) {
    .header-title {
      padding-left: 0;
    }
  }
}
</style>
