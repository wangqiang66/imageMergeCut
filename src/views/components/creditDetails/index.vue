<!--
  function: 信贷交易信息明细
  author  : wq
  update  : 2018/8/13 17:29
-->
<template>
  <div>
    <h3 class="title">三、信贷交易信息明细</h3>
    <component :key="`component-${idx}`" v-for="(item, idx) in comps" :ref="`comp-${item.name}`" :is="item.name"></component>
  </div>
</template>

<script>
import GuaranterInfo from './comps/guaranterInfo'
import LoanInfo from './comps/loanInfo'
import DebitCardInfo from './comps/debitCardInfo'
import SemiCreditCardInfo from './comps/semiCreditCardInfo'
import GuaranteeInfo from './comps/guaranteeInfo'
import CardGuaranteeInfo from './comps/cardGuaranteeInfo'
import IndexValidateInfo from '@/views/mixins/indexSave'
export default {
  name: 'credit-detail-wrap',
  mixins: [IndexValidateInfo],
  components: {
    GuaranterInfo,
    LoanInfo,
    DebitCardInfo,
    SemiCreditCardInfo,
    GuaranteeInfo,
    CardGuaranteeInfo
  },
  props: {
    child: {
      type: Array
    }
  },
  data () {
    return {
      innerComps: ['guaranter-info', 'loan-info', 'debit-card-info', 'semi-credit-card-info', 'guarantee-info', 'card-guarantee-info']
    }
  }
}
</script>
