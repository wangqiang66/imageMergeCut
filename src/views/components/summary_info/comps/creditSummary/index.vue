<!--
  function: 授信及负债信息摘要
  author  : wq
  update  : 2018/8/13 17:29
-->
<template>
  <div>
    <h5 class="title">（四）授信及负债信息摘要</h5>
    <component :key="`component-${idx}`" v-for="(item, idx) in comps" :ref="`comp-${item.name}`" :is="item.name"></component>
  </div>
</template>

<script>
import UnpaidLoan from './comps/unpaidLoan'
import UnDestoryLoanCard from './comps/unDestoryLoanCard'
import UnDestoryStandardLoanCard from './comps/unDestoryStandardLoanCard'
import OutGuaranteeSummary from './comps/outGuaranteeSummary'
import IndexValidateInfo from '@/views/mixins/indexSave'
export default {
  name: 'summary-credit-debt-wrap',
  mixins: [IndexValidateInfo],
  components: {
    UnpaidLoan,
    UnDestoryLoanCard,
    UnDestoryStandardLoanCard,
    OutGuaranteeSummary
  },
  props: {
    child: {
      type: Array
    }
  },
  data () {
    return {
      innerComps: ['unpaid-loan', 'un-destory-loan-card', 'un-destory-standard-loan-card', 'out-guarantee-summary']
    }
  }
}
</script>
