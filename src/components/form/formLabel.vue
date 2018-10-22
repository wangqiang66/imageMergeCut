<!--
  function: 表单里面的标题
  author  : wq
  update  : 2018/8/20 9:28
-->
<template>
  <div class="row flex1 center font-bold" :class="[pos + '-wrap', (imports || requires) && 'label-import']" :title="value">
    <label>{{value}}</label>
    <span v-if="requires" :class="[requires && 'input-require']">*</span>
  </div>
</template>

<script>
export default {
  name: 'form-label',
  props: {
    value: {
      type: String,
      default: ''
    },
    require: {
      type: Boolean,
      default: false
    },
    import: {
      type: Boolean,
      default: false
    },
    pos: {
      type: String,
      default: 'center'
    }
  },
  computed: {
    requires () {
      return this.require
    },
    imports () {
      return this.import
    }
  }
}
</script>
<style>
  .label-import {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    background-color: rgba(36,188,156,0.4);
  }
</style>
