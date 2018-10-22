<!--
  function: 未销户贷记卡信息汇总
  author  : wq
  update  : 2018/8/15 11:18
-->
<template>
  <div>
    <h6 class="title">未销户贷记卡信息汇总</h6>
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
            <form-label :value="itm.label" :require="itm.require" :import="itm.import"></form-label>
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
              v-model="unDestoryLoanCardInfo[itm.key]"
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
  name: 'un-destory-loan-card',
  mixins: [InputMixin],
  data () {
    return {
      config: [switchObjectToArray({
        'financeCorpCount': {
          label: '发卡法人机构数',
          type: 'tel',
          maxLength: 4,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 0
        },
        'financeOrgCount': {
          label: '发卡机构数',
          type: 'tel',
          maxLength: 4,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 1
        },
        'accountCount': {
          label: '账户数',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 2
        },
        'creditLimit': {
          label: '授信总额',
          type: 'money',
          import: true,
          maxLength: 12,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 3
        },
        'maxCreditLimitPerOrg': {
          label: '单家行最高授信额',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 4
        },
        'minCreditLimitPerOrg': {
          label: '单家行最低授信额',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 5
        },
        'usedCreditLimit': {
          label: '已用额度',
          type: 'money',
          maxLength: 12,
          import: true,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 6
        },
        'latest6MonthUseDavgAmount': {
          label: '最近6个月平均使用额',
          type: 'money',
          maxLength: 12,
          import: true,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 7
        }
      })]
    }
  },
  computed: {
    ...mapGetters([
      'unDestoryLoanCardInfo'
    ])
  },
  methods: {
    doSave (bool) {
      return this.validateInput(this.unDestoryLoanCardInfo, this.config, bool, 'input-', '未销户贷记卡信息汇总')
    }
  }
}
</script>
