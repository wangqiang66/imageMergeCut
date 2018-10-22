<!--
  function: 录入分片引入的文件
  author  : wq
  update  : 2018/9/25 9:12
-->
<template>
  <div>
    <div class="main-box" id="app">
      <component :key="`component-${idx}`" v-for="(item, idx) in comps" :ref="`comp-${item.name}`" :is="item.name" :child="item.children"></component>
      <div v-if="readonly" class="div-mask"></div>
      <el-dialog title="提示" :visible.sync="dialogTableVisible">
        <p style="margin: -20px 0 20px 10px">存在疑似异常数据，是否继续？</p>
        <el-table :data="dialogTableData" @row-click="doClickDialogRow">
          <el-table-column property="block" label="模块" width="150"></el-table-column>
          <el-table-column property="label" label="标签" width="120"></el-table-column>
          <el-table-column property="value" label="当前值" width="80"></el-table-column>
          <el-table-column property="maxValue" label="最大值"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
        <el-button @click="doDialogStop">取 消</el-button>
        <el-button type="primary" @click="doDialogContinue">继 续</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import HeadInfo from './components/headInfo'
import BaseInfo from './components/base_info/index'
import SummaryInfo from './components/summary_info/index'
import CreditDetails from './components/creditDetails/index'
import QueryDetails from './components/queryDetails/index'
import PublicDetails from './components/publicDetail/index'
import NavList from './components/nav/index'
import { mapActions } from 'vuex'
import {getQueryStr, globalFirstErrorData} from '../utils/common'
import {dealErrorsMsg} from '../utils/globalParams'
export default {
  name: 'main-split',
  components: {
    HeadInfo,
    BaseInfo,
    SummaryInfo,
    CreditDetails,
    PublicDetails,
    QueryDetails,
    NavList
  },
  data () {
    return {
      readonly: false,
      dialogTableVisible: false,
      dialogTableData: []
    }
  },
  created () {
    this.readonly = !!getQueryStr('readonly')
    this.rid = getQueryStr('taskId')
    this.type = getQueryStr('type')
    this.subTaskId = getQueryStr('subTaskId')
    window.storeGlobalIoc.doGetData = this.doGetData.bind(this)
    window.storeGlobalIoc.doValidate = this.validate.bind(this)
    window.storeGlobalIoc.doResetData = this.doClickReset.bind(this)
    window.storeGlobalIoc.doSetBlockMask = this.doSetBlock.bind(this)
    this.doClickReset()
  },
  computed: {
    comps () {
      const data = this.$store.state.initResponseData || {}
      const list = []
      // 报告头部，则获取报告头部
      if (data.reportBaseInfo) {
        list.push({
          // component: HeadInfo,
          name: 'head-info'
        })
      }
      // 如果基本信息中存在一个，则应该显示基本信息
      if (data.icrIdentity || data.icrSpouse || data.icrProfessional || data.icrResidence) {
        list.push({
          // component: BaseInfo,
          name: 'base-info',
          children: [!!data.icrIdentity, !!data.icrSpouse, !!data.icrResidence, !!data.icrProfessional]
        })
      }
      // 如果汇总信息中存在一个，则显示汇总信息
      if (data.icrCreditCue || data.icrFellBackSummary || data.icrOverdueSummary || data.icrUnpaidLoan || data.icrUndestoryLoanCard || data.icrUndestoryStandardLoanCard || data.icrGuaranteeSummary) {
        list.push({
          // component: SummaryInfo,
          name: 'summary-info',
          children: [!!data.icrCreditCue, !!data.icrFellBackSummary, !!data.icrOverdueSummary, [!!data.icrUnpaidLoan, !!data.icrUndestoryLoanCard, !!data.icrUndestoryStandardLoanCard, !!data.icrGuaranteeSummary]]
        })
      }
      // 如果信贷信息中存在一个信息，在显示信贷信息
      if (data.icrAssurerRepay || data.loanList || data.loanCardList || data.standLoanCardList || data.icrGuarantee || data.icrCardGuarantee) {
        list.push({
          // component: CreditDetails,
          name: 'credit-details',
          children: [!!data.icrAssurerRepay, !!data.loanList, !!data.loanCardList, !!data.standLoanCardList, !!data.icrGuarantee, !!data.icrCardGuarantee]
        })
      }
      // 如果公共信息中存在一个信息，在显示公共信息
      if (data.icrTaxArrear || data.icrCivilJudgement || data.icrForceExecution || data.icrAdminPunishment ||
        data.icrAccFund || data.icrEndowmentInsuranceDeposit || data.icrEndowmentInsuranceDeliver || data.icrSalvation ||
        data.icrCompetence || data.icrAdminAward || data.icrVehicle || data.icrTelPayment) {
        list.push({
          // component: CreditDetails,
          name: 'public-details',
          children: [!!data.icrTaxArrear, !!data.icrCivilJudgement, !!data.icrForceExecution, !!data.icrAdminPunishment,
            !!data.icrAccFund, !!data.icrEndowmentInsuranceDeposit, !!data.icrEndowmentInsuranceDeliver, !!data.icrSalvation,
            !!data.icrCompetence, !!data.icrAdminAward, !!data.icrVehicle, !!data.icrTelPayment]
        })
      }
      // 如果存在查询信息，则显示查询信息
      if (data.icrRecordSummary || data.icrRecordDetail || data.icrPersonRecordDetail) {
        list.push({
          // component: BaseInfo,
          name: 'query-details',
          children: [!!data.icrRecordSummary, !!data.icrRecordDetail, !!data.icrPersonRecordDetail]
        })
      }
      return list
    }
  },
  methods: {
    ...mapActions([
      'requestOcrCreditInfo',
      'saveOcrCreditInfo',
      'submitOcrCreditInfo'
    ]),
    doClickReset () {
      this.requestOcrCreditInfo({
        innerParams: {
          taskId: this.rid,
          writeType: this.type || 'write',
          subTaskId: this.subTaskId
        }
      })
    },
    validate (bool, func) {
      if (typeof bool === 'function') {
        func = bool
        bool = false
      }
      dealErrorsMsg.clear()
      globalFirstErrorData.setData(true)
      // return new Promise((resolve, reject) => {
      const refs = this.$refs
      let valid = true
      const layer = window.layer
      layer.closeAll()
      for (let i in refs) {
        let ref = refs[i]
        if (Array.isArray(ref)) {
          ref = ref[0]
        }
        if (i.indexOf('comp-') === 0) {
          if (typeof ref.doSave === 'function' && !ref.doSave(bool)) {
            valid = false
          }
        }
      }
      // if (valid) {
      //   resolve(true)
      // } else {
      //   resolve(false)
      //   console.log('验证失败，不进行提交')
      //   reject(new Error('验证失败，不进行提交'))
      // }
      if (bool === true && valid === true) {
        const errorList = dealErrorsMsg.get()
        if (errorList.length > 0) {
          this.doValidateCallBack = func
          this.dialogTableVisible = true
          this.dialogTableData = errorList
          return true
        }
      }
      typeof func === 'function' && func(valid)
      return valid
      // }).catch(e => {})
    },
    doGetData () {
      // return new Promise((resolve, reject) => {
      const data = this.$store.state.IcrCredit
      const finalData = Object.assign({}, data)
      const shadeDueConfig = ['转出', '结清']
      finalData.loanList = (finalData.loanList || []).map(item => {
        const finalItem = Object.assign({}, item)
        if (shadeDueConfig.indexOf(item.state) >= 0) {
          const clearList = [
            'class5State', 'balance', 'remainPayMentcyc', 'scheduledPayMentAmount', 'scheduledPayMentDate', 'actualPayMentAmount', 'recentPayDate',
            'currOverdueCyc', 'currOverdueAmount', 'overdue31To60Amount', 'overdue61To90Amount', 'overdue91To180Amount', 'overdueOver180Amount',
            'latest24State', 'beginMonth', 'endMonth'
          ]
          clearList.forEach(itm => {
            finalItem[itm] = ''
            // delete finalItem[itm]
          })
        }
        // 处理逾期记录
        const overdueList = [];
        (item.latest5yearOverdueDetailList || []).forEach(item => {
          if (item.amount || item.lastMonths || item.month) {
            let obj = {}
            item.amount && (obj.amount = item.amount)
            item.lastMonths && (obj.lastMonths = item.lastMonths)
            item.month && (obj.month = item.month)
            overdueList.push(obj)
          }
          if (item.amount1 || item.lastMonths1 || item.month1) {
            let obj = {}
            item.amount1 && (obj.amount = item.amount1)
            item.lastMonths1 && (obj.lastMonths = item.lastMonths1)
            item.month1 && (obj.month = item.month1)
            overdueList.push(obj)
          }
        })
        finalItem.latest5yearOverdueDetailList = overdueList
        return finalItem
      })
      finalData.loanCardList = (finalData.loanCardList || []).map(item => {
        const finalItem = Object.assign({}, item)
        if (item.state === '未激活' || item['state'] === '销户') {
          const clearList = [
            'usedCreditLimitAmount', 'latest6MonthUsedAvgAmount', 'usedHighestAmount', 'scheduledPaymentAmount',
            'scheduledPaymentDate', 'actualPaymentAmount', 'recentPayDate', 'currOverdueCyc', 'currOverdueAmount',
            'latest24State', 'beginMonth', 'endMonth'
          ]
          clearList.forEach(itm => {
            finalItem[itm] = ''
            // delete finalItem[itm]
          })
        }
        // 处理逾期记录
        const overdueList = [];
        (item.latest5yearOverdueDetailList || []).forEach(item => {
          if (item.amount || item.lastMonths || item.month) {
            let obj = {}
            item.amount && (obj.amount = item.amount)
            item.lastMonths && (obj.lastMonths = item.lastMonths)
            item.month && (obj.month = item.month)
            overdueList.push(obj)
          }
          if (item.amount1 || item.lastMonths1 || item.month1) {
            let obj = {}
            item.amount1 && (obj.amount = item.amount1)
            item.lastMonths1 && (obj.lastMonths = item.lastMonths1)
            item.month1 && (obj.month = item.month1)
            overdueList.push(obj)
          }
        })
        finalItem.latest5yearOverdueDetailList = overdueList
        return finalItem
      })
      finalData.standLoanCardList = (finalData.standLoanCardList || []).map(item => {
        const finalItem = Object.assign({}, item)
        if (item.state === '未激活' || item['state'] === '销户') {
          const clearList = [
            'usedCreditLimitAmount', 'latest6MonthUsedAvgAmount', 'usedHighestAmount', 'scheduledPaymentDate', 'actualPaymentAmount', 'recentPayDate', 'currOverdueAmount',
            'latest24State', 'beginMonth', 'endMonth'
          ]
          clearList.forEach(itm => {
            finalItem[itm] = ''
            // delete finalItem[itm]
          })
        }
        // 处理逾期记录
        const overdueList = [];
        (item.latest5yearOverdueDetailList || []).forEach(item => {
          if (item.amount || item.lastMonths || item.month) {
            let obj = {}
            item.amount && (obj.amount = item.amount)
            item.lastMonths && (obj.lastMonths = item.lastMonths)
            item.month && (obj.month = item.month)
            overdueList.push(obj)
          }
          if (item.amount1 || item.lastMonths1 || item.month1) {
            let obj = {}
            item.amount1 && (obj.amount = item.amount1)
            item.lastMonths1 && (obj.lastMonths = item.lastMonths1)
            item.month1 && (obj.month = item.month1)
            overdueList.push(obj)
          }
        })
        finalItem.latest5yearOverdueDetailList = overdueList
        return finalItem
      })
      const submitData = {}
      const initData = this.$store.state.initResponseData || {}
      Object.keys(finalData).forEach(item => {
        if (initData[item] !== undefined) {
          submitData[item] = finalData[item]
        }
      })
      submitData.dataType = undefined
      delete submitData.dataType
      return JSON.parse(JSON.stringify(submitData))
      // resolve(finalData)
      // })
    },
    doSetBlock (bool) {
      this.readonly = bool
    },
    doClickDialogRow (item) {
      const node = item.ref
      node.scrollIntoView()
      const layer = window.layer
      layer.tips(item.msg, node, {
        tipsMore: true,
        tips: 3,
        time: 3000
      })
    },
    doDialogStop () {
      this.dialogTableVisible = false
      this.dialogTableData = []
      typeof this.doValidateCallBack === 'function' && this.doValidateCallBack(false)
    },
    doDialogContinue () {
      this.dialogTableVisible = false
      this.dialogTableData = []
      typeof this.doValidateCallBack === 'function' && this.doValidateCallBack(true)
    }
  }
}
</script>

<style lang="scss">
  .main-box {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 10px;
    h1 {
      text-align: center;
    }

    .div-mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 10;
    }
  }
</style>
