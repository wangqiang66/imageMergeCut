<!--
  function: inputDate
  author  : wq
  update  : 2018/8/14 15:53
-->
<template>
  <div :class="['input-text-wrap', {'active': focus}]" :title="value">
    <input
      :title="value"
      :class="pos === 'right' ? 'input-right' : pos === 'center' ? 'input-center' : 'input-left'"
      :placeholder="placeholder"
      @input.stop="doInputText"
      :type="type"
      :maxLength="maxLength"
      @click.stop="() => {}"
      @focus.stop="doFocusInput"
      @blur="doBlurInput"
      :value="value"/>
    <div v-if="hidden" class="hidden-input-text"></div>
  </div>
</template>

<script>
import {InputFormat} from '@/utils/formatInput'
export default {
  name: 'input-text',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    pos: {
      type: String,
      default: 'left'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    valid: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: ''
    },
    maxLength: {
      type: [String, Number],
      default: ''
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      focus: false
    }
  },
  methods: {
    // 输入获得焦点
    doFocusInput () {
      this.focus = true
    },
    // 输入失去焦点
    doBlurInput () {
      this.focus = false
    },
    // 输入日期
    doInputText (e) {
      const value = e.target.value
      let tmpValue = value
      if (this.format) {
        const args = this.format.split(',')
        const name = args[0]
        try {
          tmpValue = InputFormat[name](tmpValue, ...args.slice(1))
        } catch (e) {
          console.log(`没有实现${this.format}类型的格式化`)
        }
      }
      if (value !== tmpValue) {
        e.target.value = tmpValue
      }
      this.$emit('input', tmpValue, e)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../css/_var";
  .input-text-wrap {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    & > input {
      flex: 1;
      width: 0;
    }
  }
  .input-text-wrap.active {
    background-color: $color_input_hover;
  }

  .hidden-input-text {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: #fff;
  }
</style>
