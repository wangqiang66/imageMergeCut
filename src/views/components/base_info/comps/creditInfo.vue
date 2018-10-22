<!--
  function: 个人基本信息中的身份信息
  author  : wq
  update  : 2018/8/13 15:49
-->
<template>
  <div>
    <h5 class="title">身份信息</h5>
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
              v-model="creditInfo[itm.key]"
              :type="itm.type"
              :list="itm.list"
              :is-choose-time="itm.isChooseTime"
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
import {SexList, MarriageList, EductionList, DegreeList} from '@/config/dict'
import InputMixin from '@/views/mixins'
export default {
  name: 'credit-info',
  mixins: [InputMixin],
  data () {
    return {
      config: [
        switchObjectToArray({
          'gender': {
            label: '性别',
            type: 'pick',
            list: discToPick(SexList),
            sort: 0
          },
          'birthday': {
            label: '出生日期',
            type: 'date',
            maxLength: 10,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/DD',
            sort: 1
          },
          'maritalState': {
            label: '婚姻状况',
            type: 'pick',
            list: discToPick(MarriageList),
            sort: 2
          },
          'mobile': {
            label: '手机号码',
            type: 'tel',
            sort: 4
          }
        }),
        switchObjectToArray({
          'officetelePhoneno': {
            label: '单位电话',
            type: 'tel',
            sort: 0
          },
          'hometelePhoneno': {
            label: '住宅电话',
            type: 'tel',
            sort: 1
          },
          'edulevel': {
            label: '学历',
            type: 'pick',
            list: discToPick(EductionList),
            sort: 2
          },
          'edudegree': {
            label: '学位',
            type: 'pick',
            list: discToPick(DegreeList),
            sort: 3
          }
        }),
        switchObjectToArray({
          'postAddress': {
            label: '通讯地址',
            type: 'tel',
            sort: 0
          },
          'registeredAddress': {
            label: '户籍地址',
            type: 'tel',
            sort: 1
          }
        })
      ]
    }
  },
  computed: {
    ...mapGetters([
      'creditInfo'
    ])
  },
  methods: {
    doSave (bool) {
      return this.validateInput(this.creditInfo, this.config, bool, 'input-', '身份信息')
    }
  }
}
</script>
