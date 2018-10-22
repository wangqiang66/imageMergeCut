<!--
  function: 准贷记卡
  author  : wq
  update  : 2018/8/15 17:40
-->
<template>
  <div class="semi-credit-card-info-box" id="semi-credit-card-info">
    <div class="row list-title-wrap">
      <h5 class="title flex1">准贷记卡</h5>
      <div v-if="modify" class="btn-div btn-title" @click.stop="doAddLoanCardList(-1)">添加第一条</div>
    </div>
    <div
      v-for="(dataItem, index) in standLoanCardListInfo"
      :key="`debit-card-info-list-${dataItem.id}`"
      class="common-list-wrap">
      <div class="row">
        <div class="flex1 row align-stretch">
          <label class="row align-middle">
            <span class="check-span">准贷记卡{{index + start + 1}}</span>
          </label>
        </div>
        <div class="btn-div" @click.stop="doAddLoanOverdue(index, -1)">添加逾期记录</div>
        <div v-if="modify" class="btn-div" @click.stop="doAddLoanCardList(index)">向下添加</div>
        <div v-if="modify" class="btn-div btn-red" @click.stop="doDeleteLoanCardList(index)">删除记录</div>
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
          v-if="show24Statue(dataItem)"
          :ref="`state24-comp-${dataItem.id}`"
          v-model="dataItem.latest24State"
        ></state24-comp>
      </div>
      <div class="table-wrap div-wrap" v-if="dataItem.latest5yearOverdueDetailList && dataItem.latest5yearOverdueDetailList.length > 0">
        <ul class="tr-wrap">
          <li class="loan-spe-li-wrap td-li-wrap flex1 center-wrap list-title-wrap">
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
    </div>
  </div>
</template>

<script>
import {switchObjectToArray, discToPick} from '@/utils/common'
import {mapGetters} from 'vuex'
import InputDateTime from '@/components/form/inputDate'
import InputText from '@/components/form/inputText'
import {CategoryList, MortgageMode, UserStatusListDj} from '@/config/dict'
import InputMixin from '@/views/mixins'
export default {
  name: 'semi-credit-card-info',
  mixins: [InputMixin],
  components: {
    InputDateTime,
    InputText
  },
  data () {
    return {
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
          'financeOrg': {
            label: '发放机构',
            require: true,
            valid: 'require',
            sort: 1
          },
          'currency': {
            label: '币种',
            type: 'pick',
            require: true,
            list: discToPick(CategoryList),
            valid: 'require',
            sort: 2
          },
          'account': {
            label: '业务号',
            sort: 3
          },
          'creditLimitAmount': {
            label: '授信额度',
            type: 'money',
            require: true,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,1',
            sort: 4
          },
          'shareCreditLimitAmount': {
            label: '共享授信额度',
            type: 'money',
            require: true,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,1',
            sort: 5
          },
          'guaranteeType': {
            label: '担保方式',
            type: 'pick',
            list: discToPick(MortgageMode),
            sort: 6
          },
          'stateEndDate': {
            label: '截止日期',
            type: 'date',
            maxLength: 10,
            require: true,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,1,YYYY/MM/DD',
            sort: 7
          },
          'state': {
            label: '账户状态',
            require: true,
            type: 'pick',
            list: discToPick(UserStatusListDj),
            valid: 'require',
            sort: 8
          }
        }),
        switchObjectToArray({
          'usedCreditLimitAmount': {
            label: '透支余额',
            type: 'money',
            require: true,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,1',
            sort: 0
          },
          'latest6MonthUsedAvgAmount': {
            label: '最近6个月平均使用额度',
            type: 'money',
            require: true,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,1',
            sort: 1
          },
          'usedHighestAmount': {
            label: '最大透支余额',
            type: 'money',
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 3
          },
          'scheduledPaymentDate': {
            label: '账单日',
            type: 'date',
            maxLength: 10,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/DD',
            sort: 4
          },
          'actualPaymentAmount': {
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
          },
          'currOverdueAmount': {
            label: '透支180天以上未付余额',
            type: 'money',
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 6
          }
        })
      ],
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
          sort: 3
        },
        'lastMonths1': {
          label: '逾期持续月份',
          type: 'tel',
          width: 6,
          require: true,
          maxLength: 9,
          format: 'intNumber',
          valid: 'intNumber,#3',
          sort: 4
        },
        'amount1': {
          label: '逾期金额',
          type: 'money',
          width: 7,
          require: true,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,1',
          sort: 5
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
  computed: {
    ...mapGetters([
      'standLoanCardListInfo'
    ]),
    modify () {
      let modify = true
      try {
        const loanInfo = (this.$store.state.dataType || {}).standLoanCardList || {}
        modify = loanInfo.modify !== false
      } catch (e) {}
      return modify
    },
    start () {
      const loanInfo = (this.$store.state.dataType || {}).standLoanCardList || {}
      return Number(loanInfo.start || 0)
    }
  },
  created () {
    window.storeGlobalIoc.allSemiCardClear = this.allLoanClear.bind(this)
  },
  methods: {
    // 判断是否未激活
    judgeStatus (idx, dataItem) {
      return idx < 1 || (dataItem.state !== '未激活' && dataItem.state !== '销户')
    },
    // 判断是否未激活
    show24Statue (dataItem) {
      return (dataItem.state !== '未激活' && dataItem.state !== '销户')
    },
    // 添加准贷记卡列表
    doAddLoanCardList (idx) {
      const list = this.standLoanCardListInfo || []
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit('setSemiLoanCardInfo', list)
    },
    // 删除当前的准贷记卡列表
    doDeleteLoanCardList (idx) {
      const layer = window.layer
      const layIndex = layer.confirm('确定删除当前准贷记卡列表？', () => {
        const list = this.standLoanCardListInfo || []
        list.splice(idx, 1)
        this.$store.commit('setSemiLoanCardInfo', list)
        layer.close(layIndex)
      })
    },
    // 添加逾期信息列表
    doAddLoanOverdue (index, idx) {
      const list = this.standLoanCardListInfo[index].latest5yearOverdueDetailList || []
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit('setSemiLoanCardOverdueInfo', {
        idx: index,
        list
      })
    },
    // 删除逾期信息列表
    doMinuteLoanOverdue (index, idx) {
      const list = this.standLoanCardListInfo[index].latest5yearOverdueDetailList || []
      list.splice(idx, 1)
      this.$store.commit('setSemiLoanCardOverdueInfo', {
        idx: index,
        list
      })
    },
    // 保存验证
    doSave (bool) {
      let valid = true
      const loanCardList = this.standLoanCardListInfo || []
      loanCardList.forEach((loanData, index) => {
        // 验证贷款部分
        // 如果状态是已经结清，请不用校验后面的部分
        let config = this.config
        // const statusIndex = 0
        if (loanData['state'] === '未激活' || loanData['state'] === '销户') {
          config = [] // config.slice(0, statusIndex + 1)
        } else {
          const state24Ref = this.$refs[`state24-comp-${loanData.id}`][0]
          if (!state24Ref.doSave(bool)) {
            valid = false
          }
        }
        if (!this.validateInput(loanData, config, bool, `input-loan-${loanData.id}-`, `准贷记卡${index + 1}`)) {
          valid = false
        }
        // 验证逾期部分
        // 验证逾期部分
        const overdueList = (loanData.latest5yearOverdueDetailList || []).filter(item => item.month || item.lastMonths || item.amount)
        const overdueConfig = this.latest5yearOverdueDetailConfig.filter(item => ['month', 'lastMonths', 'amount'].indexOf(item.key) > -1)
        if (!this.validateInputList(overdueList, overdueConfig, bool, `li-overdue-input-${loanData.id}-`, `准贷记卡${index + 1}-逾期`)) {
          valid = false
        }
        const overdueList1 = (loanData.latest5yearOverdueDetailList || []).filter(item => item.month1 || item.lastMonths1 || item.amount1)
        const overdueConfig1 = this.latest5yearOverdueDetailConfig.filter(item => ['month1', 'lastMonths1', 'amount1'].indexOf(item.key) > -1)
        if (!this.validateInputList(overdueList1, overdueConfig1, bool, `li-overdue-input-${loanData.id}-`, `准贷记卡${index + 1}-逾期`)) {
          valid = false
        }
      })
      return valid
    },
    // 设置销户，未激活
    allLoanClear (start = 1, end = 999999, name = '销户') {
      const list = (this.standLoanCardListInfo || []).map((item, idx) => {
        return Object.assign({}, item, idx + 1 >= start && idx + 1 <= end && {state: name})
      })
      this.$store.commit('setSemiLoanCardInfo', list)
    }
  }
}
</script>

<style lang="scss">
  @import '../../../../css/_var';
  .semi-credit-card-info-box {
    margin-top: 10px;
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
      padding: 5px;
      .input-text {
        text-align: center;
        width: 180px;
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
