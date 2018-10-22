<!--
  function: 逾期（透支）信息
  author  : wq
  update  : 2018/8/13 17:50
-->
<template>
  <div>
    <h5 class="title">（三）逾期（透支）信息汇总</h5>
    <div class="table-wrap">
      <ul class="tr-wrap">
        <li class="td-li-wrap flex1 center-wrap">贷款逾期</li>
        <li class="td-li-wrap flex1 center-wrap">贷记卡逾期</li>
        <li class="td-li-wrap flex1 center-wrap">准贷记卡60天以上透支</li>
      </ul>
      <template
        v-for="(item, idx) in config">
        <ul
          :key="`ul-idx1-${idx}`"
          class="tr-wrap">
          <li
            v-for="itm in item"
            :key="`li-text-${itm.key}`"
            class="td-li-wrap flex1 center-wrap">
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
            class="td-wrap flex1 center-wrap">
            <form-input
              v-model="verdueSummaryInfo[itm.key]"
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
  name: 'overdraft-info',
  mixins: [InputMixin],
  data () {
    return {
      config: [switchObjectToArray({
        'count': {
          label: '笔数',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 0
        },
        'months': {
          label: '月份数',
          type: 'tel',
          maxLength: 2,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 1
        },
        'highestOverdueAmountPermon': {
          label: '单月最高逾期',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 2
        },
        'maxDuration': {
          label: '最长逾期月数',
          type: 'tel',
          maxLength: 4,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 3
        },
        'count2': {
          label: '账户数',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 4
        },
        'months2': {
          label: '月份数',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 5
        },
        'highestOverdueAmountPermon2': {
          label: '单月最高逾期',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 6
        },
        'maxDuration2': {
          label: '最长逾期月数',
          type: 'tel',
          maxLength: 4,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 7
        },
        'count3': {
          label: '账户数',
          type: 'tel',
          maxLength: 4,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 8
        },
        'months3': {
          label: '月份数',
          type: 'tel',
          maxLength: 4,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 9
        },
        'highestOverdueAmountPermon3': {
          label: '单月最高逾期',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 10
        },
        'maxDuration3': {
          label: '最长透支月数',
          type: 'tel',
          maxLength: 4,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 11
        }
      })]
    }
  },
  computed: {
    ...mapGetters([
      'verdueSummaryInfo'
    ])
  },
  methods: {
    doSave (bool) {
      return this.validateInput(this.verdueSummaryInfo, this.config, bool, 'input-', '逾期（透支）信息汇总')
    }
  }
}
</script>
