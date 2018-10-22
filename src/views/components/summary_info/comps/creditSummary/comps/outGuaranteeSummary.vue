<!--
  function: outGuaranteeSummary
  author  : wq
  update  : 2018/10/9 16:03
-->
<template>
  <div>
    <h6 class="title">对外担保信息汇总</h6>
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
              v-model="outGuaranteeSummary[itm.key]"
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
import { switchObjectToArray } from '@/utils/common'
import { mapGetters } from 'vuex'
import InputMixin from '@/views/mixins'

export default {
  name: 'un-destory-loan-card',
  mixins: [InputMixin],
  data () {
    return {
      config: [switchObjectToArray({
        'count': {
          label: '担保笔数',
          type: 'tel',
          maxLength: 4,
          format: 'intNumber',
          valid: 'intNumber,,,',
          sort: 0
        },
        'amount': {
          label: '担保金额',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 1
        },
        'balance': {
          label: '担保本金余额',
          type: 'money',
          maxLength: 12,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 3
        }
      })]
    }
  },
  computed: {
    ...mapGetters([
      'outGuaranteeSummary'
    ])
  },
  methods: {
    doSave (bool) {
      return this.validateInput(this.outGuaranteeSummary, this.config, bool, 'input-', '对外担保信息汇总')
    }
  }
}
</script>
