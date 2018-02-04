<template lang="html">
  <div class="address" :class='{"in-focus": focus, "is-invalid": $v.input.$invalid && dirty}'>
    <div class="address-field">
      <div name="slide-fade" class="address-selections">
        <div v-for='(item, index) in internalValue' class="address-selection" :key="item">
          {{item}}
          <button
            type='button'
            class="address-remove"
            :aria-label='`Remove ${item}`'
            @click='remove(index)'>
            <i class="far fa-times-circle"></i>
          </button>
        </div>
      </div>

      <input
        type="email"
        :name="name"
        :id="name"
        :v-popover:="'addressField' + _uid"
        class="address-input"
        @keydown="keyHandler($event)"
        @focus="focusHandler"
        @blur="blurHandler"
        v-model='input'
        autocomplete="false">
    </div>

    <field-error
      message="This email doesn't appear to be valid"
      v-model='error' />
  </div>
</template>

<script>
import FieldError from './FieldError'
import { email } from 'vuelidate/lib/validators'

export default {
  props: {
    name: {
      type: String,
      required: true
    },

    value: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      input: '',
      focus: false,
      dirty: false
    }
  },

  methods: {
    add (item) {
      if (item === '') {
        return
      }

      if (!this.$v.input.$invalid) {
        this.internalValue.push(item)
        this.dirty = false
        this.input = ''
      }
    },

    remove (index) {
      this.internalValue.splice(index, 1)
    },

    keyHandler (e) {
      // Commit the input
      if (e.code === 'Enter' && this.input.length > 0) {
        e.preventDefault()
        this.add(this.input)
      }

      // Delete an item
      if (e.code === 'Backspace' && this.internalValue.length > 0 && this.input.length === 0) {
        this.remove(this.internalValue.length - 1)
      }
    },

    focusHandler () {
      this.focus = true
      if (this.input === '') {
        this.dirty = false
      }
    },

    blurHandler () {
      this.add(this.input)
      this.focus = false
      this.dirty = true
    }
  },

  computed: {
    internalValue: {
      get () {
        return this.value
      },

      set (state) {
        this.$emit('input', state)
      }
    },

    error () {
      return this.$v.input.$invalid && this.dirty
    }
  },

  validations: {
    input: {
      email
    }
  },

  components: {
    FieldError
  }
}
</script>

<style lang="scss">
@import "./../assets/variables.scss";
.address {
  position: relative;
  box-sizing: border-box;

  .address-field {
    display: flex;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  &:hover .address-field {
    border-color: $--color-text-placeholder;
  }

  &.in-focus .address-field {
    border-color: $--color-primary;
  }

  &.is-invalid .address-field {
    border-color: $--color-danger
  }

  .address-selections {
    display: flex;
    flex-flow: row wrap;
  }

  .address-selection {
    display: flex;
    background: #ddd;
    padding: 5px;
    color: #000;
    font-size: 12px;
    border-radius: 3px;
    margin-right: 2px;
    line-height: 1.3;

    .address-remove {
      cursor: pointer;
      display: inline-block;
      background: none;
      color: #000;
      border: none;
      outline: none;
      padding: 0;
      border-radius: 50%;
      margin: auto 0 auto 0.5em;
      transition: all 0.3s ease;

      &:focus,
      &:hover {
        background: #fff;
      }
    }
  }

  .address-input {
    border: none;
    background: none;
    outline: none;
    flex-grow: 2;
    padding: 6px 5px;
  }

  .slide-fade-enter-active {
    transition: all .2s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .el-popover {
    right: 0;
  }
}
</style>
