<!--
  function: 贷款信息
  author  : wq
  update  : 2018/8/15 14:08
-->
<template>
  <div class="loan-box" id="loan-info">
    <div class="row list-title-wrap">
      <h5 class="title flex1">贷款</h5>
      <div v-if="modify" class="btn-div btn-title" @click.stop="doAddLoanList(-1)">添加第一条</div>
    </div>
    <div
      v-for="(dataItem, index) in loanInfo"
      :key="`loan-list-${dataItem.id}`"
      class="common-list-wrap">
      <div class="row">
        <div class="flex1 row align-stretch">
          <label class="row align-middle">
            <span class="check-span">贷款{{index + start + 1}}</span>
          </label>
        </div>
        <div class="btn-div" @click.stop="doAddLoanSpecial(index, -1)">添加特殊交易</div>
        <div class="btn-div" @click.stop="doAddLoanOverdue(index, -1)">添加逾期记录</div>
        <div class="btn-div" @click.stop="doAddLoanList(index)" v-if="modify">向下添加</div>
        <div class="btn-div btn-red" @click.stop="doDeleteLoanList(index)" v-if="modify">删除记录</div>
      </div>
      <div class="table-wrap div-wrap">
        <!--<ul class="tr-wrap">
          <li class="td-li-wrap flex1 defined-td-wrap">
            <textarea row="2" class="cue-wrap pad-lr-short" v-model="dataItem.cue">
            </textarea>
           </li>
        </ul>-->
        <template
          v-if="judgeStatus(idx, dataItem)"
          v-for="(item, idx) in config">
          <ul
            :key="`ul-loan-info1-${dataItem.id}-${idx}`"
            class="tr-wrap">
            <li
              v-for="itm in item"
              :key="`ul-loan-info-text-${dataItem.id}-${itm.key}`"
              class="td-li-wrap center-wrap"
              :class="[itm.width ? 'flex' + itm.width : 'flex1']">
              <form-label :value="itm.label" :require="itm.require"></form-label>
            </li>
          </ul>
          <ul
            :key="`ul-loan-info2-${dataItem.id}-${idx}`"
            class="tr-wrap">
            <li
              v-for="itm in item"
              :ref="`input-loan-${dataItem.id}-${itm.key}`"
              :key="`ul-loan-info-input-${dataItem.id}-${itm.key}`"
              class="td-wrap center-wrap"
              :class="[itm.width ? 'flex' + itm.width : 'flex1']">
              <form-input
                v-model="dataItem[itm.key]"
                :type="itm.type"
                :list="itm.list"
                :placeholder="itm.placeholder"
                :max-length="itm.maxLength"
                :pos="itm.pos"
                :format="itm.format"></form-input>
            </li>
          </ul>
        </template>
        <ul class="tr-wrap" v-if="show24Statue(dataItem)">
          <li class="loan-spe-li-wrap td-li-wrap flex1 center-wrap">
            <input-date-time
              class="input-text"
              placeholder="请选择日期"
              format="yyyy/MM"
              :max-length="7"
              v-model="dataItem.beginMonth"
            ></input-date-time>
            <span class="">--</span>
            <input-date-time
              class="input-text"
              placeholder="请选择日期"
              format="yyyy/MM"
              :max-length="7"
              v-model="dataItem.endMonth"
            ></input-date-time>
            <span>的还款记录</span>
          </li>
        </ul>
        <state24-comp
          :ref="`state24-comp-${dataItem.id}`"
          v-if="show24Statue(dataItem)"
          v-model="dataItem.latest24State"
        ></state24-comp>
      </div>
      <div class="table-wrap div-wrap" v-if="dataItem.latest5yearOverdueDetailList && dataItem.latest5yearOverdueDetailList.length > 0">
        <ul class="tr-wrap">
          <li class="loan-spe-li-wrap td-li-wrap flex1 center-wrap">
            <input-date-time
              class="input-text"
              placeholder="请选择日期"
              format="yyyy/MM"
              :max-length="7"
              v-model="dataItem.beginOverMonth"
            ></input-date-time>
            <span class="">--</span>
            <input-date-time
              class="input-text"
              placeholder="请选择日期"
              format="yyyy/MM"
              :max-length="7"
              v-model="dataItem.endOverMonth"
            ></input-date-time>
            <span>的逾期记录</span>
          </li>
        </ul>
        <ul class="tr-wrap">
          <li
            v-for="itm in latest5yearOverdueDetailConfig"
            :key="`li-overdue-text-${dataItem.id}-${itm.key}`"
            class="td-li-wrap center-wrap"
            :class="[itm.width ? 'flex' + itm.width : 'flex1']">
            <form-label :value="itm.label" :require="itm.require"></form-label>
          </li>
        </ul>
        <ul
          v-for="(overDueDataItem, idx) in dataItem.latest5yearOverdueDetailList"
          :key="`ul-overdue-${dataItem.id}-${overDueDataItem.id}`"
          class="tr-wrap">
          <li
            v-for="itm in latest5yearOverdueDetailConfig"
            :ref="`li-overdue-input-${dataItem.id}-${overDueDataItem.id}-${itm.key}`"
            :key="`li-overdue-input-${dataItem.id}-${overDueDataItem.id}-${itm.key}`"
            class="td-wrap center-wrap"
            :class="[itm.width ? 'flex' + itm.width : 'flex1', itm.type === 'btn' ? 'operate-wrap' : '']">
            <label v-if="itm.type === 'no'">{{idx + 1}}</label>
            <template v-else-if="itm.type === 'btn'">
              <div @click.stop="doAddLoanOverdue(index, idx)">+</div>
              <div @click.stop="doMinuteLoanOverdue(index, idx)">-</div>
            </template>
            <form-input
              v-else
              v-model="overDueDataItem[itm.key]"
              :type="itm.type"
              :list="itm.list"
              :placeholder="itm.placeholder"
              :max-length="itm.maxLength"
              :pos="itm.pos"
              :format="itm.format"></form-input>
          </li>
        </ul>
      </div>
      <div class="table-wrap div-wrap" v-if="dataItem.specialTradeList && dataItem.specialTradeList.length > 0">
        <ul class="tr-wrap">
          <li
            v-for="itm in specialTradeConfig"
            :key="`li-special-text-${dataItem.id}-${itm.key}`"
            class="td-li-wrap center-wrap"
            :class="[itm.width ? 'flex' + itm.width : 'flex1']">
            <form-label :value="itm.label" :require="itm.require"></form-label>
          </li>
        </ul>
        <ul
          v-for="(specDataItem, idx) in dataItem.specialTradeList"
          :key="`ul-special-${dataItem.id}-${specDataItem.id}`"
          class="tr-wrap">
          <li
            v-for="itm in specialTradeConfig"
            :ref="`li-special-${dataItem.id}-${specDataItem.id}-${itm.key}`"
            :key="`li-special-${dataItem.id}-${specDataItem.id}-${itm.key}`"
            class="td-wrap center-wrap"
            :class="[itm.width ? 'flex' + itm.width : 'flex1', itm.type === 'btn' ? 'operate-wrap' : '']">
            <label v-if="itm.type === 'no'">{{idx + 1}}</label>
            <template v-else-if="itm.type === 'btn'">
              <div @click.stop="doAddLoanSpecial(index, idx)">+</div>
              <div @click.stop="doMinuteLoanSpecial(index, idx)">-</div>
            </template>
            <form-input
              v-else
              v-model="specDataItem[itm.key]"
              :type="itm.type"
              :list="itm.list"
              :placeholder="itm.placeholder"
              :max-length="itm.maxLength"
              :pos="itm.pos"
              :format="itm.format"></form-input>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {switchObjectToArray, discToPick} from '@/utils/common'
import {mapGetters} from 'vuex'
import InputText from '@/components/form/inputText'
import InputDateTime from '@/components/form/inputDate'
import {MoneyTypeList, LoanTypeList, MortgageMode, RepaymentMethod, UserStatusList, FiveLevelClassificationList} from '@/config/dict'
import InputMixin from '@/views/mixins'
export default {
  name: 'loan-info',
  mixins: [InputMixin],
  components: {
    InputText,
    InputDateTime
  },
  data () {
    return {
      shadeDueConfig: ['转出', '结清'],
      config: [
        switchObjectToArray({
          'openDate': {
            label: '发放日期',
            type: 'date',
            maxLength: 10,
            require: true,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,1,YYYY/MM/DD',
            sort: 0
          },
          'financeorg': {
            label: '发放机构',
            require: true,
            valid: 'require',
            sort: 1
          },
          'creditLimitAmount': {
            label: '发放金额',
            type: 'money',
            require: true,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,1',
            sort: 2
          },
          'currency': {
            label: '币种',
            type: 'pick',
            require: true,
            list: discToPick(MoneyTypeList),
            valid: 'require',
            sort: 3
          },
          'type': {
            label: '贷款用途',
            type: 'pick',
            require: true,
            list: discToPick(LoanTypeList),
            valid: 'require',
            sort: 4
          },
          'account': {
            label: '业务号',
            sort: 5
          }
        }),
        switchObjectToArray({
          'guaranteeType': {
            label: '授信方式',
            type: 'pick',
            list: discToPick(MortgageMode),
            require: true,
            valid: 'require',
            sort: 0
          },
          'payMentCyc': {
            label: '期数',
            sort: 1
          },
          'payMentRating': {
            label: '还款方式',
            type: 'pick',
            list: discToPick(RepaymentMethod),
            sort: 2
          },
          'endDate': {
            label: '到期日',
            type: 'date',
            maxLength: 10,
            require: true,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,1,YYYY/MM/DD',
            sort: 3
          },
          'stateendDate': {
            label: '截止日期',
            type: 'date',
            maxLength: 10,
            require: true,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,1,YYYY/MM/DD',
            sort: 4
          },
          'state': {
            label: '账户状态',
            require: true,
            type: 'pick',
            list: discToPick(UserStatusList),
            valid: 'require',
            sort: 5
          }
        }),
        switchObjectToArray({
          'class5State': {
            label: '五级分类',
            type: 'pick',
            list: discToPick(FiveLevelClassificationList),
            require: true,
            valid: 'require',
            sort: 0
          },
          'balance': {
            label: '本金余额',
            type: 'money',
            require: true,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,1',
            sort: 1
          },
          'remainPayMentcyc': {
            label: '剩余还款期数',
            type: 'tel',
            format: 'intNumber',
            valid: 'intNumber,,,',
            sort: 2
          },
          'scheduledPayMentAmount': {
            label: '本月应还款',
            type: 'money',
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 3
          },
          'scheduledPayMentDate': {
            label: '应还日期',
            type: 'date',
            maxLength: 10,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/DD',
            sort: 4
          },
          'actualPayMentAmount': {
            label: '本月实还款',
            type: 'money',
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 5
          },
          'recentPayDate': {
            label: '最近一次还款日期',
            type: 'date',
            maxLength: 10,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/DD',
            sort: 6
          }
        }),
        switchObjectToArray({
          'currOverdueCyc': {
            label: '当前逾期期数',
            type: 'tel',
            format: 'intNumber',
            valid: 'intNumber,,,',
            sort: 0
          },
          'currOverdueAmount': {
            label: '当前逾期金额',
            type: 'money',
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 1
          },
          'overdue31To60Amount': {
            label: '逾期31—60天未还本金',
            type: 'money',
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 2
          },
          'overdue61To90Amount': {
            label: '逾期61—90天未还本金',
            type: 'money',
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 3
          },
          'overdue91To180Amount': {
            label: '逾期91—180天未还本金',
            type: 'money',
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 4
          },
          'overdueOver180Amount': {
            label: '逾期180天以上未还本金',
            type: 'money',
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 5
          }
        })
      ],
      specialTradeConfig: switchObjectToArray({
        'type': {
          label: '特殊交易类型',
          require: true,
          width: 4,
          valid: 'require',
          sort: 0
        },
        'getTime': {
          label: '发生日期',
          require: true,
          width: 4,
          type: 'date',
          maxLength: 10,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,1,YYYY/MM/DD',
          sort: 1
        },
        'changingMonths': {
          label: '变更月数',
          require: true,
          width: 3,
          type: 'tel',
          format: 'intPNNumber',
          valid: 'intPNNumber',
          sort: 2
        },
        'changingAmount': {
          label: '发生金额',
          type: 'money',
          width: 4,
          maxLength: 9,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 3
        },
        'content': {
          label: '明细记录',
          width: 4,
          sort: 4
        },
        'opera': {
          label: '操作',
          type: 'btn',
          width: 2,
          sort: 5
        }
      }),
      latest5yearOverdueDetailConfig: switchObjectToArray({
        'month': {
          label: '逾期月份',
          type: 'date',
          maxLength: 7,
          width: 6,
          require: true,
          format: 'yyyy/MM',
          valid: 'datetime,-1,,1,YYYY/MM',
          sort: 0
        },
        'lastMonths': {
          label: '逾期持续月份',
          type: 'tel',
          width: 6,
          require: true,
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,#3',
          sort: 1
        },
        'amount': {
          label: '逾期金额',
          type: 'money',
          width: 7,
          require: true,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,1',
          sort: 2
        },
        'month1': {
          label: '逾期月份',
          type: 'date',
          maxLength: 7,
          width: 6,
          require: true,
          format: 'yyyy/MM',
          valid: 'datetime,-1,,1,YYYY/MM',
          sort: 4
        },
        'lastMonths1': {
          label: '逾期持续月份',
          type: 'tel',
          width: 6,
          require: true,
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,#3',
          sort: 5
        },
        'amount1': {
          label: '逾期金额',
          type: 'money',
          width: 7,
          require: true,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,1',
          sort: 6
        },
        'opera': {
          label: '操作',
          type: 'btn',
          width: 4,
          sort: 7
        }
      })
    }
  },
  created () {
    window.storeGlobalIoc.allLoanClear = this.allLoanClear.bind(this)
  },
  computed: {
    ...mapGetters([
      'loanInfo'
    ]),
    modify () {
      let modify = true
      try {
        const loanInfo = (this.$store.state.dataType || {}).loanList || {}
        modify = loanInfo.modify !== false
      } catch (e) {}
      return modify
    },
    start () {
      const loanInfo = (this.$store.state.dataType || {}).loanList || {}
      return Number(loanInfo.start || 0)
    }
  },
  methods: {
    // 添加贷款列表
    doAddLoanList (idx) {
      const list = this.loanInfo || []
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit('setLoanInfo', list)
    },
    // 删除当前的贷款列表
    doDeleteLoanList (idx) {
      const layer = window.layer
      const index = layer.confirm('确定删除当前贷款列表？', () => {
        const list = this.loanInfo || []
        list.splice(idx, 1)
        this.$store.commit('setLoanInfo', list)
        layer.close(index)
      })
    },
    // 添加特殊信息列表
    doAddLoanSpecial (index, idx) {
      const list = this.loanInfo[index].specialTradeList || []
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit('setLoanSpecialInfo', {
        idx: index,
        list
      })
    },
    // 删除特殊信息列表
    doMinuteLoanSpecial (index, idx) {
      const list = this.loanInfo[index].specialTradeList || []
      list.splice(idx, 1)
      this.$store.commit('setLoanSpecialInfo', {
        idx: index,
        list
      })
    },
    // 添加逾期信息列表
    doAddLoanOverdue (index, idx) {
      const list = this.loanInfo[index].latest5yearOverdueDetailList || []
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit('setLoanOverdueInfo', {
        idx: index,
        list
      })
    },
    // 删除逾期信息列表
    doMinuteLoanOverdue (index, idx) {
      const list = this.loanInfo[index].latest5yearOverdueDetailList || []
      list.splice(idx, 1)
      this.$store.commit('setLoanOverdueInfo', {
        idx: index,
        list
      })
    },
    doSave (bool) {
      let valid = true
      const loanList = this.loanInfo || []
      const shadeDueConfig = this.shadeDueConfig || []
      loanList.forEach((loanData, index) => {
        // 验证贷款部分
        // 如果状态是shadeDueConfig里面的某个值，请不用校验后面的部分
        let config = this.config
        // const statusIndex = 1
        if (shadeDueConfig.indexOf(loanData['state']) >= 0) {
          config = [] // config.slice(0, statusIndex + 1)
        } else {
          // 验证24
          const state24Ref = this.$refs[`state24-comp-${loanData.id}`][0]
          if (!state24Ref.doSave(bool)) {
            valid = false
          }
        }
        if (!this.validateInput(loanData, config, bool, `input-loan-${loanData.id}-`, `贷款${index + 1}`)) {
          valid = false
        }
        // 验证特殊交易记录部分
        if (!this.validateInputList(loanData.specialTradeList, this.specialTradeConfig, bool, `li-special-${loanData.id}-`, `贷款${index + 1}-特殊交易`)) {
          valid = false
        }
        // 验证逾期部分
        const overdueList = (loanData.latest5yearOverdueDetailList || []).filter(item => item.month || item.lastMonths || item.amount)
        const overdueConfig = this.latest5yearOverdueDetailConfig.filter(item => ['month', 'lastMonths', 'amount'].indexOf(item.key) > -1)
        if (!this.validateInputList(overdueList, overdueConfig, bool, `li-overdue-input-${loanData.id}-`, `贷款${index + 1}-逾期`)) {
          valid = false
        }
        const overdueList1 = (loanData.latest5yearOverdueDetailList || []).filter(item => item.month1 || item.lastMonths1 || item.amount1)
        const overdueConfig1 = this.latest5yearOverdueDetailConfig.filter(item => ['month1', 'lastMonths1', 'amount1'].indexOf(item.key) > -1)
        if (!this.validateInputList(overdueList1, overdueConfig1, bool, `li-overdue-input-${loanData.id}-`, `贷款${index + 1}-逾期`)) {
          valid = false
        }
      })
      return valid
    },
    // 判断是否结清
    judgeStatus (idx, dataItem) {
      const shadeDueConfig = this.shadeDueConfig || []
      return idx < 2 || shadeDueConfig.indexOf(dataItem.state) < 0
    },
    // 判断是否结清
    show24Statue (dataItem) {
      const shadeDueConfig = this.shadeDueConfig || []
      return shadeDueConfig.indexOf(dataItem.state) < 0
    },
    allLoanClear (start = 1, end = 999999) {
      const list = (this.loanInfo || []).map((item, idx) => {
        return Object.assign({}, item, idx + 1 >= start && idx + 1 <= end && {state: '结清'})
      })
      this.$store.commit('setLoanInfo', list)
    }
  }
}
</script>

<style lang="scss">
  @import '../../../../css/_var';
  .loan-box {
    .div-wrap {
      margin-top: 10px;
      .defined-td-wrap {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    .cue-wrap {
      padding-top: 10px;
      padding-bottom: 10px;
      width: 100%;
      height: 3em;
      line-height: 1.5em;
      resize: none;
    }
    .cue-wrap:focus {
      background-color: $color_input_hover;
    }
    .loan-spe-li-wrap {
      padding: 10px;
      .input-text {
        text-align: center;
        width: 180px;
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
        margin: 0 5px;
        border: 1px solid #cccccc;
        flex: initial;
      }
      .input-text:focus {
        background-color: $color_input_hover;
      }
    }
  }
</style>
