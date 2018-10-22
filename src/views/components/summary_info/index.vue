<!--
  function: 信息概要详情
  author  : wq
  update  : 2018/8/13 17:29
-->
<template>
  <div id="summary-info">
    <h3 class="title">二、信息概要</h3>
    <component :key="`component-${idx}`" v-for="(item, idx) in comps" :ref="`comp-${item.name}`" :is="item.name" :child="item.children"></component>
  </div>
</template>

<script>
import CreditPrompts from './comps/creditPrompts'
import IllegalInfo from './comps/illegalInfo'
import OverDraftInfo from './comps/overdraftInfo'
import CreditAndDeptSummary from './comps/creditSummary/index'
import IndexValidateInfo from '@/views/mixins/indexSave'
export default {
  name: 'summary-info-wrap',
  mixins: [IndexValidateInfo],
  components: {
    CreditPrompts,
    IllegalInfo,
    OverDraftInfo,
    CreditAndDeptSummary
  },
  props: {
    child: {
      type: Array
    }
  },
  data () {
    return {
      innerComps: ['credit-prompts', 'illegal-info', 'over-draft-info', 'credit-and-dept-summary']
    }
  }
}
</script>
