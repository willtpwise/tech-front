<template lang="html">
  <div class="address" :class='{"in-focus": focus, "is-invalid": $v.input.$invalid}'>
    <div class="address-field">
      <transition-group name="slide-fade" class="address-selections">
        <div v-for='(item, index) in internalValue' class="address-selection" :key="index">
          {{item}}
          <button
            type='button'
            class="address-remove"
            :aria-label='`Remove ${item}`'
            @click='remove(index)'>
            <i class="far fa-times-circle"></i>
          </button>
        </div>
      </transition-group>

      <input
        :type="type"
        :name="name"
        :id="name"
        class="address-input"
        @keydown="keyHandler($event)"
        @focus="focusHandler"
        @blur="blurHandler"
        v-model='input'
        autocomplete="off">
    </div>
  </div>
</template>

<script>
import FieldError from './FieldError.vue'
import { email } from 'vuelidate/lib/validators'

export default {
  components: {
    FieldError
  },

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
    },

    type: {
      type: String,
      default: 'text'
    }
  },

  validations: {
    input: {
      email
    }
  },

  data () {
    return {
      input: '',
      focus: false
    }
  },

  methods: {
    add (item) {
      if (item !== '' && !this.$v.input.$invalid) {
        this.internalValue.push(item)
        this.input = ''
      }
    },

    remove (index) {
      this.internalValue.splice(index, 1)
    },

    keyHandler (e) {
      // Commit the input
      if ((e.key === 'Enter' || e.key === 'Space') && this.input.length > 0) {
        e.preventDefault()
        this.add(this.input)
      }

      // Delete an item
      if (e.key === 'Backspace' && this.internalValue.length > 0 && this.input.length === 0) {
        this.remove(this.internalValue.length - 1)
      }
    },

    focusHandler () {
      this.focus = true
    },

    blurHandler () {
      this.add(this.input)
      this.focus = false
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
    }
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
}
</style>
