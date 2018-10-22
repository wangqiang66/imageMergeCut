<!--
  function: 未结清贷款信息汇总
  author  : wq
  update  : 2018/8/15 11:06
-->
<template>
  <div>
    <h6 class="title">未结清贷款信息汇总</h6>
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
            :ref="`input-${itm.key}`"
            v-for="itm in item"
            :key="`li-input-${itm.key}`"
            class="td-wrap center-wrap"
            :class="[itm.width ? 'flex' + itm.width : 'flex1']">
            <form-input
              v-model="unpaidLoanInfo[itm.key]"
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
  name: 'unpaid-loan',
  mixins: [InputMixin],
  data () {
    return {
      config: [switchObjectToArray({
        'financeCorpCount': {
          label: '贷款法人机构数',
          type: 'tel',
          maxLength: 4,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 0
        },
        'financeOrgCount': {
          label: '贷款机构数',
          type: 'tel',
          maxLength: 4,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 1
        },
        'accountCount': {
          label: '笔数',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 2
        },
        'creditLimit': {
          label: '合同总款',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 3
        },
        'balance': {
          label: '余额',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 4
        },
        'latest6MonthUseDavgAmount': {
          label: '最近6个月平均',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 5
        }
      })]
    }
  },
  computed: {
    ...mapGetters([
      'unpaidLoanInfo'
    ])
  },
  methods: {
    doSave (bool) {
      return this.validateInput(this.unpaidLoanInfo, this.config, bool, 'input-', '未结清贷款信息汇总')
    }
  }
}
</script>
