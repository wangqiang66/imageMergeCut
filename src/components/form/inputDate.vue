<!--
  function: inputDate
  author  : wq
  update  : 2018/8/14 15:53
-->
<template>
  <div :class="['input-date-wrap', {'active': focus}]" :title="value">
    <input
      :placeholder="placeholder"
      @input.stop="doInputDate"
      :maxLength="maxLength"
      @click.stop="() => {}"
      @focus.stop="doFocusInput"
      @blur="doBlurInput"
      :value="value"/>
    <i
      v-if="isChooseTime"
      @click.stop="openPickDate"
      class="layui-icon layui-icon-date btn-date-icon"></i>
    <div v-if="isChooseTime" ref="hidden-input" class="hidden-input"></div>
  </div>
</template>

<script>
export default {
  name: 'input-date',
  props: {
    type: {
      type: String,
      default: 'datetime'
    },
    format: {
      type: String,
      default: 'yyyy/MM/dd HH:mm:ss'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择日期'
    },
    maxLength: {
      type: [String, Number],
      default: ''
    },
    isChooseTime: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      focus: false,
      bindDate: false
    }
  },
  mounted () {
    if (this.isChooseTime) {
      const target = this.$refs['hidden-input']
      const doBind = () => {
        const laydate = (window.layui || {}).laydate
        if (laydate) {
          laydate && laydate.render({
            elem: target,
            type: this.type,
            value: this.value || '',
            format: this.format,
            done: (value, date, endDate) => {
              console.log(value)
              this.$emit('input', value)
            }
          })
          this.bindDate = true
        } else {
          setTimeout(doBind, 100)
        }
      }
      doBind()
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
    doInputDate (e) {
      const value = e.target.value
      const intValue = value.replace(/[^\d]/g, '')
      let tmpValue
      if (intValue.length === 6) {
        tmpValue = intValue.slice(0, 4) + '/' + intValue.slice(4, 6)
        this.$emit('input', tmpValue)
      } else if (intValue.length === 8) {
        this.$emit('input', tmpValue = intValue.slice(0, 4) + '/' + intValue.slice(4, 6) + '/' + intValue.slice(6))
      } else if (intValue.length === 12) {
        this.$emit('input', tmpValue = intValue.slice(0, 4) + '/' + intValue.slice(4, 6) + '/' + intValue.slice(6, 8) +
          ' ' + intValue.slice(8, 10) + ':' + intValue.slice(10, 12))
      } else if (intValue.length === 14) {
        this.$emit('input', tmpValue = intValue.slice(0, 4) + '/' + intValue.slice(4, 6) + '/' + intValue.slice(6, 8) +
          ' ' + intValue.slice(8, 10) + ':' + intValue.slice(10, 12) + ':' + intValue.slice(12, 14))
      } else {
        tmpValue = value.replace(/[^\d/]/g, '')
        this.$emit('input', tmpValue)
      }
      if (value !== tmpValue) {
        e.target.value = tmpValue
      }
    },
    // 打开日期选择框
    openPickDate (e) {
      const target = this.$refs['hidden-input']
      target.click()
      e.stopImmediatePropagation()
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss">
  .input-date-wrap {
    flex: 1;
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    height: 100%;
    & > input {
      flex: 1;
      width: 0;
    }
  }
  .input-date-wrap.active {
    background-color: #ffdb8f;
  }
  .hidden-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
</style>
