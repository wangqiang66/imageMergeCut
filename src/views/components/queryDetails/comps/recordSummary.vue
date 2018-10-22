<!--
  function: recordSummary
  author  : wq
  update  : 2018/8/15 11:37
-->
<template>
  <div>
    <h5 class="title">查询记录汇总</h5>
    <div class="table-wrap">
      <ul class="tr-wrap">
        <li class="td-li-wrap flex1 center-wrap">最近一个月内的查询机构数</li>
        <li class="td-li-wrap flex1 center-wrap">最近一个月内的查询次数</li>
        <li class="td-li-wrap flex1 center-wrap">最近两年内的查询次数</li>
      </ul>
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
              v-model="recordSummaryInfo[itm.key]"
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
  name: 'record-summary',
  mixins: [InputMixin],
  data () {
    return {
      config: [switchObjectToArray({
        'orgSum1': {
          label: '贷款审批',
          type: 'tel',
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 0,
          width: 3
        },
        'orgSum2': {
          label: '信用卡审批',
          type: 'tel',
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 1,
          width: 3
        },
        'recordSum1': {
          label: '贷款审批',
          type: 'tel',
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 2,
          width: 2
        },
        'recordSum2': {
          label: '信用卡审批',
          type: 'tel',
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 3,
          width: 2
        },
        'recordSumSelf': {
          label: '本人查询',
          type: 'tel',
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 4,
          width: 2
        },
        'towYearRecordSum1': {
          label: '贷后管理',
          type: 'tel',
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 5,
          width: 2
        },
        'towYearRecordSum2': {
          label: '担保资格审查',
          type: 'tel',
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 6,
          width: 2
        },
        'towYearRecordSum3': {
          label: '特约商户实名审查',
          type: 'tel',
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 7,
          width: 2
        }
      })]
    }
  },
  computed: {
    ...mapGetters([
      'recordSummaryInfo'
    ])
  },
  methods: {
    doSave (bool) {
      return this.validateInput(this.recordSummaryInfo, this.config, bool, 'input-', '查询记录汇总')
    }
  }
}
</script>
