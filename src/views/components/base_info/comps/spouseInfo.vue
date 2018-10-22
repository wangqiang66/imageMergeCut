<!--
  function: 个人基本信息中的配偶信息
  author  : wq
  update  : 2018/8/13 15:49
-->
<template>
  <div>
    <h5 class="title">配偶信息</h5>
    <div class="table-wrap">
      <template
        v-for="(item, idx) in config">
        <ul
          :key="`ul-idx1-${idx}`"
          class="tr-wrap">
          <template
            v-for="itm in item">
            <li
              :key="`li-text-${itm.key}`"
              class="td-wrap center-wrap"
              :class="[itm.width ? 'flex' + itm.width : 'flex1']">
              <form-label :value="itm.label" :require="itm.require"></form-label>
            </li>
          </template>
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
              v-model="spouseInfo[itm.key]"
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
import {switchObjectToArray, discToPick} from '@/utils/common'
import { mapGetters } from 'vuex'
import InputMixin from '@/views/mixins'
import {CardTypes} from '@/config/dict'
export default {
  name: 'spouse-info',
  mixins: [InputMixin],
  data () {
    return {
      config: [
        switchObjectToArray({
          'name': {
            label: '姓名',
            width: 1,
            sort: 0
          },
          'certType': {
            label: '证件类型',
            width: 2,
            type: 'pick',
            list: discToPick(CardTypes),
            sort: 1
          },
          'certNo': {
            label: '证件号码',
            width: 3,
            sort: 2
          },
          'employer': {
            label: '工作单位',
            width: 3,
            sort: 3
          },
          'telephoneNo': {
            label: '联系电话',
            width: 2,
            type: 'tel',
            sort: 4
          }
        })
      ]
    }
  },
  computed: {
    ...mapGetters([
      'spouseInfo'
    ])
  },
  methods: {
    doSave (bool) {
      return this.validateInput(this.spouseInfo, this.config, bool, 'input-', '配偶信息')
    }
  }
}
</script>
