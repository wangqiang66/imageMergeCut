<!--
  function: 逾期（透支）信息
  author  : wq
  update  : 2018/8/13 17:50
-->
<template>
  <div>
    <h5 class="title">（二）违约及违约信息概要</h5>
    <div class="table-wrap">
      <ul class="tr-wrap">
        <li class="td-li-wrap flex1 center-wrap">呆账信息汇总</li>
        <li class="td-li-wrap flex1 center-wrap">资产处置信息汇总</li>
        <li class="td-li-wrap flex1 center-wrap">保证人代偿信息汇总</li>
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
              v-model="fellBackSummaryInfo[itm.key]"
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
import InputMixin from '@/views/mixins/index'
export default {
  name: 'illegal-info',
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
        'balance': {
          label: '余额',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber，，',
          valid: 'floatNumber,,,,',
          sort: 1
        },
        'count2': {
          label: '笔数',
          type: 'tel',
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 4
        },
        'balance2': {
          label: '余额',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber，，',
          valid: 'floatNumber,,,,',
          sort: 5
        },
        'count3': {
          label: '笔数',
          type: 'tel',
          maxLength: 4,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 8
        },
        'balance3': {
          label: '余额',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber，，',
          valid: 'floatNumber,,,,',
          sort: 9
        }
      })]
    }
  },
  computed: {
    ...mapGetters([
      'fellBackSummaryInfo'
    ])
  },
  methods: {
    doSave (bool) {
      return this.validateInput(this.fellBackSummaryInfo, this.config, bool, 'input-', '违约及违约信息概要')
    }
  }
}
</script>
