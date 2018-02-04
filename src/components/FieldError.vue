<template lang="html">
  <div class="error" aria-live="polite">
    {{msg}}
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
.error {
  $bg: #ba1d2f;
  background: $bg;
  color: #fff;
  padding: 10px;
  font-size: 12px;
  border-radius: 3px;
  position: absolute;
  right: 10px;
  top: 100%;
  z-index: 100;
  line-height: 1.3;

  &:after {
    content: '';
    position: absolute;
    bottom: 100%;
    right: 10px;
    border-bottom: 10px solid $bg;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
}
</style>
