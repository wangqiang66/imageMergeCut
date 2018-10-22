<!--
  function: 输入框列表汇总
  author  : wq
  update  : 2018/8/20 9:57
-->
<template>
  <!--<label v-if="type === 'no'">{{value}}</label>
  <div v-else-if="type === 'btn'">
    <div @click.stop="() => {this.$emit('doAddList')}">+</div>
    <div @click.stop="() => {this.$emit('doMinuteList')}">-</div>
  </div>-->
  <select class="select-wrap" :placeholder="placeholder" @change="doChange" :value="value" v-if="type === 'pick'">
    <option
      v-for="it in list"
      :key="it.value"
      :value="it.value">{{it.label}}</option>
  </select>
  <!--<el-select :value="value" @input="(value) => {this.$emit('input', value)}" :placeholder="placeholder" v-if="type === 'pick'">-->
    <!--<el-option-->
      <!--v-for="it in list"-->
      <!--:key="it.value"-->
      <!--:label="it.label"-->
      <!--:value="it.value">-->
    <!--</el-option>-->
  <!--</el-select>-->
  <input24-status
    v-else-if="type === '24status'"
    :placeholder="placeholder"
    :len="maxLength"
    :value="value"
    @input="(value) => {this.$emit('input', value)}"
  ></input24-status>
  <input-date-time
    v-else-if="type === 'datetime' || type === 'date'"
    :placeholder="placeholder"
    :max-length="maxLength"
    :is-choose-time="isChooseTime"
    :value="value"
    :format="format"
    @input="(value) => {this.$emit('input', value)}"
  ></input-date-time>
  <input-money
    v-else-if="type === 'money'"
    :pos="pos"
    :type="type"
    :format="format"
    :max-length="maxLength"
    :value="value"
    @input="(value) => {this.$emit('input', value)}"
  ></input-money>
  <input-text
    v-else
    :pos="pos"
    :type="type"
    :hidden="hidden"
    :format="format"
    :max-length="maxLength"
    :value="value"
    @input="(value) => {this.$emit('input', value)}"
  ></input-text>
</template>

<script>
import Input24Status from './form24Status'
import InputText from './inputText'
import InputMoney from './inputMoney'
import inputDateTime from './inputDate'
export default {
  name: 'form-input',
  components: {
    Input24Status,
    InputText,
    InputMoney,
    inputDateTime
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String
    },
    format: {
      type: String
    },
    maxLength: {
      type: [String, Number]
    },
    list: {
      type: Array
    },
    pos: {
      type: String,
      default: 'center'
    },
    isChooseTime: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    doChange (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss">
  .select-wrap {
    height: 100%;
    width: 100%;
    option {
      height: 30px;
    }
  }
</style>
