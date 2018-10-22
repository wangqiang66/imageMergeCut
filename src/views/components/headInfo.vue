<!--
  function: 报告头部信息
  author  : wq
  update  : 2018/8/13 11:32
-->
<template>
  <div id="head">
    <h3 class="title">报告头部信息</h3>
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
            <li
              v-if="itm.isRow"
              :key="`li-input-${itm.key}`"
              :ref="`input-${itm.key}`"
              class="td-wrap center-wrap"
              :class="[itm.width ? 'flex' + itm.rowWidth : 'flex1']">
              <form-input
                v-model="headInfo[itm.key]"
                :type="itm.type"
                :list="itm.list"
                :hidden="itm.hidden"
                :placeholder="itm.placeholder"
                :max-length="itm.maxLength"
                :pos="itm.pos"
                :is-choose-time="itm.isChooseTime"
                :format="itm.format"></form-input>
            </li>
          </template>
        </ul>
        <ul
          :key="`ul-idx2-${idx}`"
          v-if="item.filter(itm => !itm.isRow).length > 0"
          class="tr-wrap">
          <li
            v-if="!itm.isRow"
            v-for="itm in item"
            :ref="`input-${itm.key}`"
            :key="`li-input-${itm.key}`"
            class="td-wrap center-wrap"
            :class="[itm.width ? 'flex' + itm.width : 'flex1']">
            <form-input
              v-model="headInfo[itm.key]"
              :type="itm.type"
              :list="itm.list"
              :hidden="itm.hidden"
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
import { switchObjectToArray, discToPick } from '@/utils/common'
import { mapGetters, mapActions } from 'vuex'
import InputMixin from '@/views/mixins'
// import { CardTypes, SearchReson } from '@/config/dict'
import { SearchReson } from '@/config/dict'

export default {
  name: 'headInfo',
  mixins: [InputMixin],
  data () {
    return {
      config: [
        switchObjectToArray({
          'reportNo': {
            label: '报告编号',
            type: 'tel',
            isRow: true,
            width: 1,
            rowWidth: 3,
            maxLength: 22,
            require: true,
            valid: 'tel,22,22',
            format: 'tel',
            sort: 0
          },
          'queryTime': {
            label: '查询时间',
            type: 'datetime',
            isRow: true,
            maxLength: 19,
            width: 1,
            rowWidth: 2,
            require: true,
            valid: 'datetime,-1',
            sort: 1
          },
          'reportCreateTime': {
            label: '报告时间',
            type: 'datetime',
            isRow: true,
            maxLength: 19,
            width: 1,
            rowWidth: 2,
            require: true,
            valid: 'datetime,-1',
            sort: 2
          }
        }),
        switchObjectToArray({
          'name': {
            // label: '被查询者姓名',
            // require: true,
            // valid: 'require',
            hidden: true,
            sort: 0
          },
          'certType': {
            // label: '被查询者证件类型',
            // require: true,
            // type: 'pick',
            // list: discToPick(CardTypes),
            // valid: 'require',
            hidden: true,
            sort: 1
          },
          'certNo': {
            // label: '被查询者证件号码',
            // require: true,
            // valid: 'require',
            hidden: true,
            sort: 2
          },
          'operateUser': {
            label: '查询操作员',
            sort: 3
          },
          'queryReason': {
            label: '查询原因',
            type: 'pick',
            list: discToPick(SearchReson),
            sort: 4
          }
        })
      ],
      cardType: [{
        value: 1,
        label: '身份证'
      }],
      queryReason: []
    }
  },
  computed: {
    ...mapGetters([
      'headInfo'
    ]),
    reportNo () {
      return this.headInfo.reportNo
    },
    queryTime () {
      return this.headInfo.queryTime
    },
    reportCreateTime () {
      return this.headInfo.reportCreateTime
    }
  },
  watch: {
    queryTime () {
      const queryTime = this.queryTime
      const reportCreateTime = this.reportCreateTime
      if (queryTime !== reportCreateTime) {
        this.$store.commit('setHeadInfoPart', { reportCreateTime: queryTime })
      }
    },
    reportCreateTime () {
      const queryTime = this.queryTime
      const reportCreateTime = this.reportCreateTime
      if (queryTime !== reportCreateTime) {
        this.$store.commit('setHeadInfoPart', { queryTime: reportCreateTime })
      }
    }
  },
  methods: {
    ...mapActions([
      'queryExistReport',
      'queryReportByTaskId'
    ]),
    doSave (bool) {
      return this.validateInput(this.headInfo, this.config, bool, 'input-', '报告头部信息')
    }
  }
}
</script>
