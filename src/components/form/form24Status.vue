<!--
  function: 输入框列表汇总
  author  : wq
  update  : 2018/8/20 9:57
-->
<template>
  <input
    :style="{letterSpacing: `${letterSpace}px`, paddingLeft: `${letterSpace/2}px`, paddingRight: 0}"
    ref="state-24-input"
    :maxlength="len - 1"
    :class="['state-24-input', {'active': focus}]"
    :value="value"
    @click.stop="() => {}"
    @focus.stop="doFocusInput"
    @blur="doBlurInput"
    @input.stop="doInput"/>
</template>

<script>
import {InputFormat} from '@/utils/formatInput'
export default {
  name: 'form-24-status',
  props: {
    len: {
      type: [Number, String],
      default: 25
    },
    value: {
      type: [String, Number]
    }
  },
  data () {
    return {
      letterSpace: 0,
      focus: false
    }
  },
  mounted () {
    this.getLetterSpace()
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
    doInput (e) {
      const target = e.target
      const value = target.value
      let endValue = InputFormat.state24(value)
      let cursorIndex = target.selectionEnd
      if (e.data && e.data.length > 1) {
        cursorIndex = cursorIndex - e.data.length
        const data = e.data.replace(/[']/g, '')
        endValue = endValue.substring(0, cursorIndex) + InputFormat.state24(data.substr(-1)) + endValue.substring(cursorIndex + data.length)
        cursorIndex = cursorIndex + 2
      }
      endValue = endValue.substring(0, 24)
      if (value !== endValue) {
        if (value.length !== endValue.length) {
          cursorIndex = cursorIndex - 1
        }
        target.value = endValue
        // 设置光标位置
        if (target.setSelectionRange) {
          target.setSelectionRange(cursorIndex, cursorIndex)
        } else if (target.createTextRange) {
          // Firefox support
          var range = target.createTextRange()
          range.collapse(true)
          range.moveEnd('character', cursorIndex)
          range.moveStart('character', cursorIndex)
          range.select()
        }
      }
      this.$emit('input', endValue)
    },
    getLetterSpace () {
      const ref = this.$refs['state-24-input']
      const $ = window.layui.$
      const inputWidth = ref.offsetWidth
      const fontWidth = parseInt($(ref).css('fontSize'))
      this.letterSpace = inputWidth / this.len - fontWidth / 2
    }
  }
}
</script>

<style>
  .state-24-input {
    font-family: monospace;
  }
</style>
