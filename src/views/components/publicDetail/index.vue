<!--
  function: 查询记录
  author  : wq
  update  : 2018/8/13 17:29
-->
<template>
  <div id="public-details" class="public-details">
    <div class="row list-title-wrap">
      <h3 class="title flex1">四、公共信息明细</h3>
      <div class="public-index-btn-title btn-title row">
        <el-select
          multiple
          collapse-tags
          v-model="value"
          @change="doChange"
          style="margin-left: 20px;"
          placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="btn-div">
          <el-button>　添加<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        </div>
      </div>
    </div>
    <component
      :key="`component-${idx}`" v-for="(item, idx) in comps" :ref="`comp-${item.name}`"
      :is="item.name"></component>
  </div>
</template>

<script>
import PublicFeeList from './comps/feeList'
import PublicCivilJudgementRecord from './comps/civilJudgementRecord'
import PublicEnforcementRecord from './comps/enforcementRecord'
import PublicAdminRecord from './comps/administrativeRecord'
import PublicProvideFundPaymentRecord from './comps/provideFundPaymentRecord'
import PublicEndowmentPaymentRecord from './comps/endowmentPaymentRecord'
import PublicEndowmentObtainRecord from './comps/endowmentObtainRecord'
import PublicBailRecord from './comps/bailRecord'
import PublicPracticeQualificationRecord from './comps/practiceQualificationRecord'
import PublicAdminAwardRecord from './comps/administrativeAwardRecord'
import PublicTelFeeRecord from './comps/telecFeeRecord'
import PublicVehicleDealRecord from './comps/vehicleDealRecord'
import IndexValidateInfo from '@/views/mixins/indexSave'
import { mapGetters } from 'vuex'

export default {
  name: 'query-detail-wrap',
  mixins: [IndexValidateInfo],
  components: {
    PublicFeeList,
    PublicEnforcementRecord,
    PublicCivilJudgementRecord,
    PublicAdminRecord,
    PublicEndowmentPaymentRecord,
    PublicProvideFundPaymentRecord,
    PublicEndowmentObtainRecord,
    PublicBailRecord,
    PublicPracticeQualificationRecord,
    PublicAdminAwardRecord,
    PublicVehicleDealRecord,
    PublicTelFeeRecord
  },
  props: {
    child: {
      type: Array
    }
  },
  data () {
    return {
      innerComps: ['public-fee-list', 'public-civil-judgement-record', 'public-enforcement-record',
        'public-admin-record', 'public-provide-fund-payment-record', 'public-endowment-payment-record',
        'public-endowment-obtain-record',
        'public-bail-record', 'public-practice-qualification-record', 'public-admin-award-record',
        'public-vehicle-deal-record', 'public-tel-fee-record'],
      value: '',
      options: [{
        value: 'taxArrearInfo',
        label: '欠税记录'
      }, {
        value: 'civilJudgementInfo',
        label: '民事判决记录'
      }, {
        value: 'forceExecutionInfo',
        label: '强制执行记录'
      }, {
        value: 'adminPunishmentInfo',
        label: '行政处罚记录'
      }, {
        value: 'accFundInfo',
        label: '住房公积金参缴记录'
      }, {
        value: 'endowmentPaymentInfo',
        label: '养老保险金缴存记录'
      }, {
        value: 'endowmentObtainsInfo',
        label: '养老保险金发放记录'
      }, {
        value: 'salvationInfo',
        label: '低保救助记录'
      }, {
        value: 'competenceInfo',
        label: '执业资格记录'
      }, {
        value: 'adminAwardInfo',
        label: '行政奖励记录'
      }, {
        value: 'vehicleInfo',
        label: '车辆交易和抵押记录'
      }, {
        value: 'telPaymentInfo',
        label: '电信缴费记录'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'taxArrearInfo', 'civilJudgementInfo', 'forceExecutionInfo', 'adminPunishmentInfo', 'accFundInfo',
      'endowmentPaymentInfo', 'endowmentObtainsInfo', 'salvationInfo', 'competenceInfo', 'adminAwardInfo',
      'vehicleInfo', 'telPaymentInfo'
    ])
  },
  watch: {
    taxArrearInfo () {
      const text = 'taxArrearInfo'
      const data = this[text]
      if (data.length < 1) {
        const value = this.value || []
        const index = value.indexOf(text)
        if (index > -1) {
          value.splice(index, 1)
        }
      }
    },
    civilJudgementInfo () {
      const text = 'civilJudgementInfo'
      const data = this[text]
      if (data.length < 1) {
        const value = this.value || []
        const index = value.indexOf(text)
        if (index > -1) {
          value.splice(index, 1)
        }
      }
    },
    forceExecutionInfo () {
      const text = 'forceExecutionInfo'
      const data = this[text]
      if (data.length < 1) {
        const value = this.value || []
        const index = value.indexOf(text)
        if (index > -1) {
          value.splice(index, 1)
        }
      }
    },
    adminPunishmentInfo () {
      const text = 'adminPunishmentInfo'
      const data = this[text]
      if (data.length < 1) {
        const value = this.value || []
        const index = value.indexOf(text)
        if (index > -1) {
          value.splice(index, 1)
        }
      }
    },
    accFundInfo () {
      const text = 'accFundInfo'
      const data = this[text]
      if (data.length < 1) {
        const value = this.value || []
        const index = value.indexOf(text)
        if (index > -1) {
          value.splice(index, 1)
        }
      }
    },
    endowmentPaymentInfo () {
      const text = 'endowmentPaymentInfo'
      const data = this[text]
      if (data.length < 1) {
        const value = this.value || []
        const index = value.indexOf(text)
        if (index > -1) {
          value.splice(index, 1)
        }
      }
    },
    endowmentObtainsInfo () {
      const text = 'endowmentObtainsInfo'
      const data = this[text]
      if (data.length < 1) {
        const value = this.value || []
        const index = value.indexOf(text)
        if (index > -1) {
          value.splice(index, 1)
        }
      }
    },
    salvationInfo () {
      const text = 'salvationInfo'
      const data = this[text]
      if (data.length < 1) {
        const value = this.value || []
        const index = value.indexOf(text)
        if (index > -1) {
          value.splice(index, 1)
        }
      }
    },
    competenceInfo () {
      const text = 'competenceInfo'
      const data = this[text]
      if (data.length < 1) {
        const value = this.value || []
        const index = value.indexOf(text)
        if (index > -1) {
          value.splice(index, 1)
        }
      }
    },
    adminAwardInfo () {
      const text = 'adminAwardInfo'
      const data = this[text]
      if (data.length < 1) {
        const value = this.value || []
        const index = value.indexOf(text)
        if (index > -1) {
          value.splice(index, 1)
        }
      }
    },
    vehicleInfo () {
      const text = 'vehicleInfo'
      const data = this[text]
      if (data.length < 1) {
        const value = this.value || []
        const index = value.indexOf(text)
        if (index > -1) {
          value.splice(index, 1)
        }
      }
    },
    telPaymentInfo () {
      const text = 'telPaymentInfo'
      const data = this[text]
      if (data.length < 1) {
        const value = this.value || []
        const index = value.indexOf(text)
        if (index > -1) {
          value.splice(index, 1)
        }
      }
    }
  },
  methods: {
    doChange (item) {
      const tmpData = this.tmpData || []
      if (item !== tmpData) {
        // 比较增加或者删除了哪一个
        // 删除
        tmpData.forEach(itm => {
          if (item.indexOf(itm) < 0) {
            this.$store.commit(`set${itm[0].toUpperCase()}${itm.substring(1)}`, [])
          }
        })
        // 添加
        item.forEach(itm => {
          if (tmpData.indexOf(itm) < 0) {
            if (this.$store.getters[itm].length === 0) {
              this.$store.commit(`set${itm[0].toUpperCase()}${itm.substring(1)}`, [{
                id: new Date().getTime() + 1000
              }])
            }
          }
        })
        this.tmpData = item
      }
    }
  }
}
</script>

<style lang="scss">
  .public-details {
    margin-top: 20px;
    .public-index-btn-title {
      width: 120px;
      .btn-div {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        pointer-events: none;
        z-index: 10;
      }
      .el-select__tags {
        white-space: nowrap;
      }
      .el-button--default {
        background-color: transparent;
        border: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0;
        width: 100%;
        color: #fff;
      }
      .el-button--default span {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0;
        width: 100%;
      }
    }
  }
</style>
