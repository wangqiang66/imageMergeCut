<!--
  function: 信用提示
  author  : wq
  update  : 2018/8/13 17:32
-->
<template>
  <div>
    <h5 class="title">（一）信用提示</h5>
    <div class="table-wrap">
      <template
        v-for="(item, idx) in config">
        <ul
          :key="`ul-idx1-${idx}`"
          class="tr-wrap">
          <li
            v-for="itm in item"
            :key="`li-text-${itm.key}`"
            class="td-li-wrap center-wrap"
            :class="[itm.width ? 'flex' + itm.width : 'flex1']">
            <form-label :value="itm.label" :require="itm.require"></form-label>
          </li>
        </ul>
        <ul
          :key="`ul-idx2-${idx}`"
          class="tr-wrap">
          <li
            v-for="itm in item"
            :ref="`input-${itm.key}`"
            :key="`li-input-${itm.key}`"
            class="td-wrap center-wrap"
            :class="[itm.width ? 'flex' + itm.width : 'flex1']">
            <form-input
              v-model="reditCueInfo[itm.key]"
              :type="itm.type"
              :list="itm.list"
              :placeholder="itm.placeholder"
              :max-length="itm.maxLength"
              :pos="itm.pos"
              :format="itm.format"></form-input>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import {switchObjectToArray} from '@/utils/common'
import { mapGetters } from 'vuex'
import InputMixin from '@/views/mixins'
export default {
  name: 'credit-prompts',
  mixins: [InputMixin],
  data () {
    return {
      config: [switchObjectToArray({
        'houseLoanCount': {
          label: '个人住房放贷笔数',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 0
        },
        'houseLoan2Count': {
          label: '个人商用房（包括商住两用）贷款笔数',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 1
        },
        'otherLoanCount': {
          label: '其它贷款笔数',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 2
        },
        'firstLoanOpenMonth': {
          label: '首笔贷款发放月份',
          type: 'date',
          maxLength: 7,
          format: 'yyyy/MM',
          valid: 'datetime,,,,YYYY/MM',
          sort: 3
        },
        'loanCardCount': {
          label: '贷记卡账户数',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 4
        },
        'firstLoanCardOpenMonth': {
          label: '首张贷记卡发卡月份',
          type: 'date',
          maxLength: 7,
          format: 'yyyy/MM',
          valid: 'datetime,,,,YYYY/MM',
          sort: 5
        },
        'standardLoanCardCount': {
          label: '准贷记卡账户数',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 6
        },
        'firstStandardLoanCardOpenMonth': {
          label: '首张准贷记卡发卡月份',
          type: 'date',
          maxLength: 7,
          format: 'yyyy/MM',
          valid: 'datetime,,,,YYYY/MM',
          sort: 7
        },
        'announceCount': {
          label: '本人声明数目',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 8
        },
        'dissentCount': {
          label: '异议标准数目',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 9
        }
      })]
    }
  },
  computed: {
    ...mapGetters([
      'reditCueInfo'
    ])
  },
  methods: {
    doSave (bool) {
      return this.validateInput(this.reditCueInfo, this.config, bool, 'input-', '信用提示')
    }
  }
}
</script>
