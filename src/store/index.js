/**
 * function: index.js
 * author  : wq
 * update  : 2018/8/13 18:15
 */
import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/api'
Vue.use(Vuex)

const store = {
  state: {
    IcrCredit: {
      icrProfessional: [],
      icrResidence: []
    },
    initIcrCredit: {},
    initResponseData: {},
    imgList: [],
    dataType: {}
  },
  mutations: {
    setInitOcrCreditInfo (state, data) {
      state.initIcrCredit = data
    },
    setOcrCreditInfo (state, data) {
      state.IcrCredit = data
    },
    setInitResponseData (state, data) {
      state.initResponseData = data
    },
    // 设置图片列表
    setImageList (state, data) {
      state.imgList = data
    },
    // 设置
    setDataType (state, data) {
      state.dataType = data
    },
    // 修改头部信息
    setHeadInfo (state, data) {
      Vue.set(state.IcrCredit, 'reportBaseInfo', data)
    },
    // 修改头部信息某一部分
    setHeadInfoPart (state, data) {
      const headInfo = Object.assign({}, state.IcrCredit.reportBaseInfo, data)
      Vue.set(state.IcrCredit, 'reportBaseInfo', headInfo)
    },
    // 居住信息
    // 整体字段修改
    setResidenceInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrResidence', data)
    },
    // 职业信息
    // 整体字段修改
    setProfessionalInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrProfessional', data)
    },
    // 贷款信息
    // 整体字段修改
    setLoanInfo (state, data) {
      Vue.set(state.IcrCredit, 'loanList', data)
    },
    // 处理贷款中的特殊信息
    setLoanSpecialInfo (state, data) {
      Vue.set(state.IcrCredit.loanList, data.idx, Object.assign({}, ((state.IcrCredit || {}).loanList || [])[data.idx], {specialTradeList: data.list}))
    },
    // 处理贷款中的逾期信息
    setLoanOverdueInfo (state, data) {
      Vue.set(state.IcrCredit.loanList, data.idx, Object.assign({}, ((state.IcrCredit || {}).loanList || [])[data.idx], {latest5yearOverdueDetailList: data.list}))
    },
    /**
     * 贷记卡
     */
    // 设置贷记卡
    setLoanCardInfo (state, data) {
      Vue.set(state.IcrCredit, 'loanCardList', data)
    },
    // 处理贷款中的逾期信息
    setLoanCardOverdueInfo (state, data) {
      Vue.set(state.IcrCredit.loanCardList, data.idx, Object.assign({}, ((state.IcrCredit || {}).loanCardList || [])[data.idx], {latest5yearOverdueDetailList: data.list}))
    },
    /**
     * 准贷记卡
     */
    // 设置贷记卡
    setSemiLoanCardInfo (state, data) {
      Vue.set(state.IcrCredit, 'standLoanCardList', data)
    },
    // 处理贷款中的逾期信息
    setSemiLoanCardOverdueInfo (state, data) {
      Vue.set(state.IcrCredit.standLoanCardList, data.idx, Object.assign({}, ((state.IcrCredit || {}).standLoanCardList || [])[data.idx], {latest5yearOverdueDetailList: data.list}))
    },
    /**
     * 准贷记卡
     */
    // 担保人偿还信息
    setGuaranterInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrAssurerRepay', data)
    },
    // 对外贷款担保信息
    setGuaranteeInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrGuarantee', data)
    },
    // 对外信用卡担保信息
    setCardGuaranteeInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrCardGuarantee', data)
    },
    /**
     * 公共部分
     */
    // 设置欠费记录
    setTaxArrearInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrTaxArrear', data)
    },
    // 设置民事判决记录
    setCivilJudgementInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrCivilJudgement', data)
    },
    // 设置强制执行记录
    setForceExecutionInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrForceExecution', data)
    },
    // 设置行政处罚记录
    setAdminPunishmentInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrAdminPunishment', data)
    },
    // 设置住房公积金参缴记录
    setAccFundInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrAccFund', data)
    },
    // 设置养老保险金存缴记录
    setEndowmentPaymentInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrEndowmentInsuranceDeposit', data)
    },
    // 设置养老保险金发放记录
    setEndowmentObtainsInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrEndowmentInsuranceDeliver', data)
    },
    // 设置低保救助记录
    setSalvationInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrSalvation', data)
    },
    // 设置执业资格记录
    setCompetenceInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrCompetence', data)
    },
    // 设置行政奖励记录
    setAdminAwardInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrAdminAward', data)
    },
    // 设置车辆交易和抵押记录
    setVehicleInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrVehicle', data)
    },
    // 设置电信缴费记录
    setTelPaymentInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrTelPayment', data)
    },
    // 查询记录明细
    setRecordDetailInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrRecordDetail', data)
    },
    // 个人查询记录明细
    setRecordSelfDetailInfo (state, data) {
      Vue.set(state.IcrCredit, 'icrPersonRecordDetail', data)
    }
  },
  actions: {
    // 获取Ocr识别的信息
    requestOcrCreditInfo ({commit}, opts) {
      function setOcrCreditInfo (data) {
        const tdata = JSON.parse(JSON.stringify(data || {}))
        // 头部
        !tdata.reportBaseInfo && (tdata.reportBaseInfo = {})
        // 身份信息
        !tdata.icrIdentity && (tdata.icrIdentity = {})
        // 配偶信息
        !tdata.icrSpouse && (tdata.icrSpouse = [])
        if (tdata.icrSpouse.length < 1) {
          tdata.icrSpouse.push({})
        }
        // 职业信息
        !tdata.icrProfessional && (tdata.icrProfessional = [])
        if (tdata.icrProfessional.length < 1) {
          tdata.icrProfessional.push({})
        }
        // 居住信息
        !tdata.icrResidence && (tdata.icrResidence = [])
        if (tdata.icrResidence.length < 1) {
          tdata.icrResidence.push({})
        }
        tdata.icrResidence.map(item => {
          item.residenceType = (item.residenceType || '').replace(/其它/, '其他')
        })
        // 信用信息
        !tdata.icrCreditCue && (tdata.icrCreditCue = {})
        // 违约及违约信息概要
        !tdata.icrFellBackSummary && (tdata.icrFellBackSummary = {})
        // 未结清贷款信息汇总
        !tdata.icrUnpaidLoan && (tdata.icrUnpaidLoan = {})
        // 未销户贷记卡信息汇总
        !tdata.icrUndestoryLoanCard && (tdata.icrUndestoryLoanCard = {})
        // 未销户准贷记卡信息汇总
        !tdata.icrUndestoryStandardLoanCard && (tdata.icrUndestoryStandardLoanCard = {})
        // 获取逾期(透支)信息汇总
        !tdata.icrOverdueSummary && (tdata.icrOverdueSummary = {})
        // 贷款
        !tdata.loanList && (tdata.loanList = [])
        tdata.loanList.map(item => {
          item.guaranteeType = (item.guaranteeType || '').replace(/其它/, '其他')
          const list = []
          const overdueList = item.latest5yearOverdueDetailList || []
          for (let i = 0, l = overdueList.length; i < l; i += 2) {
            let obj = {}
            overdueList[i].amount && (obj.amount = overdueList[i].amount)
            overdueList[i].lastMonths && (obj.lastMonths = overdueList[i].lastMonths)
            overdueList[i].month && (obj.month = overdueList[i].month);
            (overdueList[i + 1] || {}).amount && (obj.amount1 = (overdueList[i + 1] || {}).amount);
            (overdueList[i + 1] || {}).lastMonths && (obj.lastMonths1 = (overdueList[i + 1] || {}).lastMonths);
            (overdueList[i + 1] || {}).month && (obj.month1 = (overdueList[i + 1] || {}).month)
            list.push(obj)
          }
          item.latest5yearOverdueDetailList = list
        })
        try {
          const loanInfo = (tdata.dataType || {}).loanList || {}
          const modify = loanInfo.modify !== false
          if (!modify) {
            const start = Number(loanInfo.start || 0)
            const end = Number(loanInfo.end || start)
            const diff = end - start + 1
            let i = 0
            while (i < diff) {
              tdata.loanList.push({})
              i++
            }
            tdata.loanList = tdata.loanList.slice(0, diff)
          }
        } catch (e) { }
        // 贷记卡
        !tdata.loanCardList && (tdata.loanCardList = [])
        tdata.loanCardList.map(item => {
          item.guaranteeType = (item.guaranteeType || '').replace(/其它/, '其他')
          const list = []
          const overdueList = item.latest5yearOverdueDetailList || []
          for (let i = 0, l = overdueList.length; i < l; i += 2) {
            let obj = {}
            overdueList[i].amount && (obj.amount = overdueList[i].amount)
            overdueList[i].lastMonths && (obj.lastMonths = overdueList[i].lastMonths)
            overdueList[i].month && (obj.month = overdueList[i].month);
            (overdueList[i + 1] || {}).amount && (obj.amount1 = (overdueList[i + 1] || {}).amount);
            (overdueList[i + 1] || {}).lastMonths && (obj.lastMonths1 = (overdueList[i + 1] || {}).lastMonths);
            (overdueList[i + 1] || {}).month && (obj.month1 = (overdueList[i + 1] || {}).month)
            list.push(obj)
          }
          item.latest5yearOverdueDetailList = list
        })
        try {
          const loanInfo = (tdata.dataType || {}).loanCardList || {}
          const modify = loanInfo.modify !== false
          if (!modify) {
            const start = Number(loanInfo.start || 0)
            const end = Number(loanInfo.end || start)
            const diff = end - start + 1
            let i = 0
            while (i < diff) {
              tdata.loanCardList.push({})
              i++
            }
            tdata.loanCardList = tdata.loanCardList.slice(0, diff)
          }
        } catch (e) { }
        // 准贷记卡
        !tdata.standLoanCardList && (tdata.standLoanCardList = [])
        tdata.standLoanCardList.map(item => {
          item.guaranteeType = (item.guaranteeType || '').replace(/其它/, '其他')
          const list = []
          const overdueList = item.latest5yearOverdueDetailList || []
          for (let i = 0, l = overdueList.length; i < l; i += 2) {
            let obj = {}
            overdueList[i].amount && (obj.amount = overdueList[i].amount)
            overdueList[i].lastMonths && (obj.lastMonths = overdueList[i].lastMonths)
            overdueList[i].month && (obj.month = overdueList[i].month);
            (overdueList[i + 1] || {}).amount && (obj.amount1 = (overdueList[i + 1] || {}).amount);
            (overdueList[i + 1] || {}).lastMonths && (obj.lastMonths1 = (overdueList[i + 1] || {}).lastMonths);
            (overdueList[i + 1] || {}).month && (obj.month1 = (overdueList[i + 1] || {}).month)
            list.push(obj)
          }
          item.latest5yearOverdueDetailList = list
        })
        try {
          const loanInfo = (tdata.dataType || {}).standLoanCardList || {}
          const modify = loanInfo.modify !== false
          if (!modify) {
            const start = Number(loanInfo.start || 0)
            const end = Number(loanInfo.end || start)
            const diff = end - start + 1
            let i = 0
            while (i < diff) {
              tdata.standLoanCardList.push({})
              i++
            }
            tdata.standLoanCardList = tdata.standLoanCardList.slice(0, diff)
          }
        } catch (e) { }
        // end
        !tdata.icrGuaranteeSummary && (tdata.icrGuaranteeSummary = {})
        !tdata.icrGuarantee && (tdata.icrGuarantee = [])
        !tdata.icrCardGuarantee && (tdata.icrCardGuarantee = [])
        !tdata.icrRecordSummary && (tdata.icrRecordSummary = {})
        !tdata.icrRecordDetail && (tdata.icrRecordDetail = [])
        !tdata.icrPersonRecordDetail && (tdata.icrPersonRecordDetail = [])
        !tdata.icrAssurerRepay && (tdata.icrAssurerRepay = [])
        /**   公共信息明细  **/
        // 欠费记录
        !tdata.icrTaxArrear && (tdata.icrTaxArrear = [])
        // 民事判决记录
        !tdata.icrCivilJudgement && (tdata.icrCivilJudgement = [])
        // 强制执行记录
        !tdata.icrForceExecution && (tdata.icrForceExecution = [])
        // 行政处罚记录
        !tdata.icrAdminPunishment && (tdata.icrAdminPunishment = [])
        // 住房公积金参缴记录
        !tdata.icrAccFund && (tdata.icrAccFund = [])
        // 养老保险金存缴记录
        !tdata.icrEndowmentInsuranceDeposit && (tdata.icrEndowmentInsuranceDeposit = [])
        // 设置养老保险金发放记录
        !tdata.icrEndowmentInsuranceDeliver && (tdata.icrEndowmentInsuranceDeliver = [])
        // 设置低保救助记录
        !tdata.icrSalvation && (tdata.icrSalvation = [])
        // 执业资格记录
        !tdata.icrCompetence && (tdata.icrCompetence = [])
        // 行政奖励记录
        !tdata.icrAdminAward && (tdata.icrAdminAward = [])
        // 设置车辆交易和抵押记录
        !tdata.icrVehicle && (tdata.icrVehicle = [])
        // 电信缴费记录
        !tdata.icrTelPayment && (tdata.icrTelPayment = [])
        commit('setDataType', tdata.dataType || {})
        commit('setInitOcrCreditInfo', tdata)
        commit('setOcrCreditInfo', JSON.parse(JSON.stringify(tdata)))
        commit('setInitResponseData', data)
        return tdata || {}
      }
      return Api.requestOcrCreditInfo(opts)
        .then(data => {
          return setOcrCreditInfo(data)
        })
        .catch(() => {
          return setOcrCreditInfo()
        })
    },
    queryExistReport ({commit}, opts) {
      return Api.queryExistReport(opts)
    },
    queryReportByTaskId ({commit}, opts) {
      return Api.queryReportByTaskId(opts)
        .then(data => {
          // return setOcrCreditInfo(data)
        })
        .catch(() => {
          // return setOcrCreditInfo()
        }).finally(() => {
          document.location.reload()
        })
    },
    // 保存填写的识别信息
    saveOcrCreditInfo ({commit}, opts) {
      Api.saveOcrCreditInfo(opts)
    },
    // 提交填写的识别信息
    submitOcrCreditInfo ({commit}, opts) {
      Api.sumbitOcrCreditInfo(opts)
    },
    // 获取图片信息
    getImageList ({commit}, opts) {
      return Api.getImageList(opts).then(data => {
        commit('setImageList', data)
        return data
      })
    },
    // 截图解析
    getClipSlot ({commit}, opts) {
      return Api.getClipSlot(opts).then(data => {
        return data
      })
    }
  },
  getters: {
    // 获取头部基本信息
    headInfo (state) {
      const icrCredit = state.IcrCredit || {}
      return icrCredit.reportBaseInfo || {}
    },
    // 获取身份信息
    creditInfo (state) {
      const icrCredit = state.IcrCredit || {}
      return icrCredit.icrIdentity || {}
    },
    // 获取配偶信息
    spouseInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrSpouse = icrCredit.icrSpouse || []
      return icrSpouse[0] || {}
    },
    // 获取居住信息
    residenceInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrResidence = icrCredit.icrResidence || []
      const time = new Date().getTime()
      let residenceList = icrResidence
      if (icrResidence.length > 0) {
        residenceList.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      } else {
        Vue.set(state.IcrCredit, 'icrResidence', [{id: time}])
        residenceList = icrCredit.icrResidence
      }
      return residenceList
    },
    // 获取职业信息
    professionalInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrProfessional = icrCredit.icrProfessional || []
      let professionalList = icrProfessional
      const time = new Date().getTime()
      if (icrProfessional.length < 1) {
        Vue.set(state.IcrCredit, 'icrProfessional', [{id: time}])
        professionalList = icrCredit.icrProfessional
      } else {
        professionalList.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return professionalList
    },
    /**
     * 信息概要
     * @param state
     * @returns {*|{}}
     */
    // 获取信用提示
    reditCueInfo (state) {
      const icrCredit = state.IcrCredit || {}
      return icrCredit.icrCreditCue || {}
    },
    // 违约及违约信息概要
    fellBackSummaryInfo (state) {
      const icrCredit = state.IcrCredit || {}
      return icrCredit.icrFellBackSummary || {}
    },
    // 获取逾期(透支)信息汇总
    verdueSummaryInfo (state) {
      const icrCredit = state.IcrCredit || {}
      return icrCredit.icrOverdueSummary || {}
    },
    // 获取未结清贷款信息汇总
    unpaidLoanInfo (state) {
      const icrCredit = state.IcrCredit || {}
      return icrCredit.icrUnpaidLoan || {}
    },
    // 获取未销户贷记卡信息汇总
    unDestoryLoanCardInfo (state) {
      const icrCredit = state.IcrCredit || {}
      return icrCredit.icrUndestoryLoanCard || {}
    },
    // 获取未销户准贷记卡信息汇总
    unDestoryStandardLoanCardInfo (state) {
      const IcrCredit = state.IcrCredit || {}
      return IcrCredit.icrUndestoryStandardLoanCard || {}
    },
    // 对外担保信息汇总
    outGuaranteeSummary (state) {
      const IcrCredit = state.IcrCredit || {}
      return IcrCredit.icrGuaranteeSummary || {}
    },
    /**
     * 信贷交易信息明细
     * @param state
     * @returns {*|{}}
     */
    // 保证人代偿信息
    assurerRepayInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrAssurerRepay = icrCredit.icrAssurerRepay || []
      const time = new Date().getTime()
      if (icrAssurerRepay.length > 0) {
        icrAssurerRepay.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrAssurerRepay
    },
    // 获取贷款信息
    loanInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const loanList = icrCredit.loanList || []
      const time = new Date().getTime()
      if (loanList.length > 0) {
        loanList.map((item, idx) => {
          item.id = item.id || (time + idx)
          if (item.specialTradeList && item.specialTradeList.length > 0) {
            item.specialTradeList.map((itm, index) => {
              itm.id = itm.id || (time + index)
            })
          }
          if (item.latest5yearOverdueDetailList && item.latest5yearOverdueDetailList.length > 0) {
            item.latest5yearOverdueDetailList.map((itm, index) => {
              itm.id = itm.id || (time + index)
            })
          }
        })
      }
      return loanList
    },
    // 贷记卡信息
    loanCardListInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const loanCardList = icrCredit.loanCardList || []
      const time = new Date().getTime()
      if (loanCardList.length > 0) {
        loanCardList.map((item, idx) => {
          item.id = item.id || (time + idx)
          if (item.latest5yearOverdueDetailList && item.latest5yearOverdueDetailList.length > 0) {
            item.latest5yearOverdueDetailList.map((itm, index) => {
              itm.id = itm.id || (time + index)
            })
          }
        })
      }
      return loanCardList
    },
    // 准贷记卡信息
    standLoanCardListInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const standLoanCardList = icrCredit.standLoanCardList || []
      const time = new Date().getTime()
      if (standLoanCardList.length > 0) {
        standLoanCardList.map((item, idx) => {
          item.id = item.id || (time + idx)
          if (item.latest5yearOverdueDetailList && item.latest5yearOverdueDetailList.length > 0) {
            item.latest5yearOverdueDetailList.map((itm, index) => {
              itm.id = itm.id || (time + index)
            })
          }
        })
      }
      return standLoanCardList
    },
    // 对外担保信息汇总
    guaranteeSummaryInfo (state) {
      const icrCredit = state.IcrCredit || {}
      return icrCredit.icrGuaranteeSummary || {}
    },
    // 对外贷款担保信息
    guaranteeInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrGuarantee = icrCredit.icrGuarantee || []
      const time = new Date().getTime()
      if (icrGuarantee.length > 0) {
        icrGuarantee.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrGuarantee
    },
    // 对外信用卡担保信息
    cardGuaranteeInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrCardGuarantee = icrCredit.icrCardGuarantee || []
      const time = new Date().getTime()
      if (icrCardGuarantee.length > 0) {
        icrCardGuarantee.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrCardGuarantee
    },
    /**
     * 公共信息明细
     */
    // 欠费记录
    taxArrearInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrTaxArrear = icrCredit.icrTaxArrear || []
      const time = new Date().getTime()
      if (icrTaxArrear.length > 0) {
        icrTaxArrear.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrTaxArrear
    },
    // 民事判决记录
    civilJudgementInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrCivilJudgement = icrCredit.icrCivilJudgement || []
      const time = new Date().getTime()
      if (icrCivilJudgement.length > 0) {
        icrCivilJudgement.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrCivilJudgement
    },
    // 强制执行记录
    forceExecutionInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrForceExecution = icrCredit.icrForceExecution || []
      const time = new Date().getTime()
      if (icrForceExecution.length > 0) {
        icrForceExecution.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrForceExecution
    },
    // 行政处罚记录
    adminPunishmentInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrAdminPunishment = icrCredit.icrAdminPunishment || []
      const time = new Date().getTime()
      if (icrAdminPunishment.length > 0) {
        icrAdminPunishment.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrAdminPunishment
    },
    // 住房公积金参缴记录
    accFundInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrAccFund = icrCredit.icrAccFund || []
      const time = new Date().getTime()
      if (icrAccFund.length > 0) {
        icrAccFund.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrAccFund
    },
    // 养老保险金存缴记录
    endowmentPaymentInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrEndowmentInsuranceDeposit = icrCredit.icrEndowmentInsuranceDeposit || []
      const time = new Date().getTime()
      if (icrEndowmentInsuranceDeposit.length > 0) {
        icrEndowmentInsuranceDeposit.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrEndowmentInsuranceDeposit
    },
    // 养老保险金发放记录
    endowmentObtainsInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrEndowmentInsuranceDeliver = icrCredit.icrEndowmentInsuranceDeliver || []
      const time = new Date().getTime()
      if (icrEndowmentInsuranceDeliver.length > 0) {
        icrEndowmentInsuranceDeliver.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrEndowmentInsuranceDeliver
    },
    // 低保救助记录
    salvationInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrSalvation = icrCredit.icrSalvation || []
      const time = new Date().getTime()
      if (icrSalvation.length > 0) {
        icrSalvation.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrSalvation
    },
    // 执业资格记录
    competenceInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrCompetence = icrCredit.icrCompetence || []
      const time = new Date().getTime()
      if (icrCompetence.length > 0) {
        icrCompetence.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrCompetence
    },
    // 行政奖励记录
    adminAwardInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrAdminAward = icrCredit.icrAdminAward || []
      const time = new Date().getTime()
      if (icrAdminAward.length > 0) {
        icrAdminAward.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrAdminAward
    },
    // 车辆交易和抵押记录
    vehicleInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrVehicle = icrCredit.icrVehicle || []
      const time = new Date().getTime()
      if (icrVehicle.length > 0) {
        icrVehicle.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrVehicle
    },
    // 电信缴费记录
    telPaymentInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrTelPayment = icrCredit.icrTelPayment || []
      const time = new Date().getTime()
      if (icrTelPayment.length > 0) {
        icrTelPayment.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrTelPayment
    },
    // 查询记录汇总
    recordSummaryInfo (state) {
      const icrCredit = state.IcrCredit || {}
      return icrCredit.icrRecordSummary || {}
    },
    // 信贷审批查询记录明细
    recordDetailInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrRecordDetail = icrCredit.icrRecordDetail || []
      const time = new Date().getTime()
      if (icrRecordDetail.length > 0) {
        icrRecordDetail.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrRecordDetail
    },
    // 个人查询记录明细
    recordSelfDetailInfo (state) {
      const icrCredit = state.IcrCredit || {}
      const icrPersonRecordDetail = icrCredit.icrPersonRecordDetail || []
      const time = new Date().getTime()
      if (icrPersonRecordDetail.length > 0) {
        icrPersonRecordDetail.map((item, idx) => {
          item.id = item.id || (time + idx)
        })
      }
      return icrPersonRecordDetail
    }
  }
}

export default new Vuex.Store(store)
