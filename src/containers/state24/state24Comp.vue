<!--
  function: state24Comp
  author  : wq
  update  : 2018/8/23 9:54
-->
<template>
  <div>
    <ul class="tr-wrap">
      <li
        v-for="(item, idx) in Array(len)"
        :key="`latest-24-state-text-${idx}`"
        class="td-wrap flex1 center-wrap font-bold label-import">
        {{idx + 1 === len ? '' : idx + 1}}
      </li>
    </ul>
    <ul class="tr-wrap">
      <li class="td-wrap flex1 center-wrap" ref="state-24-input">
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
      </li>
    </ul>
  </div>
</template>

<script>
import {InputFormat} from '@/utils/formatInput'
import InputMixin from '@/views/mixins'
export default {
  name: 'state24Comp',
  mixins: [InputMixin],
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
    },
    doSave () {
      if (this.value && this.value.length !== 24) {
        this.validErrorTips('state-24-input', '输入不完整')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss">
  @import '../../css/var';
  .state-24-input {
    font-family: monospace;
  }

  .state-24-input.active {
    background-color: $color_input_hover!important;
  }
</style>
