<template lang="html">
  <div class="field-error" :aria-live='live'>
    {{message}}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    value: Boolean
  },

  computed: {
    visible: {
      get () {
        return this.value
      },
      set (state) {
        this.$emit('input', state)
      }
    },

    live () {
      if (this.visible) {
        return 'polite'
      } else {
        return 'off'
      }
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/variables.scss";
.field-error {
  background: $--color-danger;
  color: #fff;
  padding: 10px;
  border-radius: 3px;
  position: absolute;
  top: 100%;
  right: 0;
  display: inline-block;
  opacity: 0;
  line-height: 1.3;
  z-index: 100;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    bottom: 100%;
    right: 10px;
    border-bottom: 10px solid $--color-danger;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }

  &[aria-live='polite'] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}
</style>
