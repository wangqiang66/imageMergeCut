<!--
  function: 报告头部信息
  author  : wq
  update  : 2018/8/13 11:32
-->
<template>
  <div id="base-info">
    <h3 class="title">一、个人基本信息</h3>
    <component :key="`component-${idx}`" v-for="(item, idx) in comps" :ref="`comp-${item.name}`" :is="item.name"></component>
  </div>
</template>

<script>
import CreditInfo from './comps/creditInfo'
import SpouseInfo from './comps/spouseInfo'
import AddressInfo from './comps/addressInfo'
import OccupationalInfo from './comps/occupationalInfo'
import IndexValidateInfo from '@/views/mixins/indexSave'
export default {
  name: 'baseInfo',
  mixins: [IndexValidateInfo],
  components: {
    CreditInfo,
    SpouseInfo,
    AddressInfo,
    OccupationalInfo
  },
  props: {
    child: {
      type: Array
    }
  },
  data () {
    return {
      innerComps: ['credit-info', 'spouse-info', 'address-info', 'occupational-info']
    }
  }
}
</script>
