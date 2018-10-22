<!--
  function: inputDate
  author  : wq
  update  : 2018/8/14 15:53
-->
<template>
  <div :class="['input-text-wrap', {'active': focus}]" :title="showBlurValue">
    <input
      :class="pos === 'right' ? 'input-right' : pos === 'center' ? 'input-center' : 'input-left'"
      :placeholder="placeholder"
      @input.stop="doInputText"
      :type="type"
      :maxLength="maxLength"
      @click.stop="() => {}"
      @focus.stop="doFocusInput"
      @blur="doBlurInput"
      :value="focus ? showFocusValue : showBlurValue"/>
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
    }
  },
  data () {
    return {
      focus: false,
      showBlurValue: '',
      showFocusValue: ''
    }
  },
  mounted () {
    const value = this.value
    const finalValue = this.showFocusValue
    if (finalValue !== value) {
      this.showFocusValue = value
      this.showBlurValue = InputFormat.intMoney(value)
    }
  },
  watch: {
    value () {
      const value = this.value
      const finalValue = this.showFocusValue
      if (finalValue !== value) {
        this.showFocusValue = value
        this.showBlurValue = InputFormat.intMoney(value)
      }
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
      this.showBlurValue = InputFormat.intMoney(tmpValue)
      this.$emit('input', this.showFocusValue = tmpValue, e)
    }
  }
}
</script>

<style lang="scss">
  @import "../../css/_var";
  .input-text-wrap {
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
</style>
