<!--
  function: 对外信用卡担保信息
  author  : wq
  update  : 2018/8/15 18:58
-->
<template>
  <div class="card-guarantee-info-box">
    <div class="row list-title-wrap">
      <h5 class="title flex1">对外信用卡担保信息</h5>
      <div class="btn-title row">
        <div class="btn-div" @click.stop="addFirstList">添加第一条</div>
        <div class="btn-div btn-red" @click.stop="doDeleteAllList">删除记录</div>
      </div>
    </div>
    <div class="table-wrap div-wrap">
      <ul class="tr-wrap">
        <li
          v-for="itm in config"
          :key="`li-text-${itm.key}`"
          class="td-li-wrap center-wrap"
          :class="[itm.width ? 'flex' + itm.width : 'flex1']">
          <form-label :value="itm.label" :require="itm.require"></form-label>
        </li>
      </ul>
      <ul
        v-for="(item, idx) in cardGuaranteeInfo"
        :key="`ul-input-${item.id}`"
        class="tr-wrap">
        <li
          v-for="itm in config"
          :ref="`input-${item.id}-${itm.key}`"
          :key="`li-input-${item.id}-${itm.key}`"
          class="td-wrap center-wrap"
          :class="[itm.width ? 'flex' + itm.width : 'flex1', itm.type === 'btn' ? 'operate-wrap' : '']">
          <label v-if="itm.type === 'no'">{{idx + 1}}</label>
          <template v-else-if="itm.type === 'btn'">
            <div @click.stop="doAddList(idx)">+</div>
            <div @click.stop="doMinuteList(idx)">-</div>
          </template>
          <form-input
            v-else
            v-model="item[itm.key]"
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
</template>

<script>
import {switchObjectToArray} from '@/utils/common'
import {mapGetters} from 'vuex'
import InputMixin from '@/views/mixins'
export default {
  name: 'card-guarantee-info',
  mixins: [InputMixin],
  data () {
    return {
      config: switchObjectToArray({
        'no': {
          label: '编号',
          type: 'no',
          width: 1,
          sort: 0
        },
        'organName': {
          label: '发放机构',
          require: true,
          width: 3,
          valid: 'require',
          sort: 1
        },
        'creditLimit': {
          label: '授信额度',
          type: 'money',
          width: 3,
          require: true,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,1',
          sort: 2
        },
        'beginDate': {
          label: '发卡日期',
          type: 'date',
          width: 3,
          maxLength: 10,
          require: true,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,1,YYYY/MM/DD',
          sort: 3
        },
        'guananteeMoney': {
          label: '担保金额',
          type: 'money',
          width: 3,
          require: true,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,1',
          sort: 5
        },
        'usedLimit': {
          label: '已用额度',
          type: 'money',
          width: 3,
          require: true,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,1',
          sort: 6
        },
        'billingDate': {
          label: '账单日',
          type: 'date',
          width: 3,
          maxLength: 10,
          require: true,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,1,YYYY/MM/DD',
          sort: 8
        },
        'opera': {
          label: '操作',
          width: 2,
          type: 'btn',
          sort: 9
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'cardGuaranteeInfo'
    ])
  },
  methods: {
    addFirstList () {
      const list = this.cardGuaranteeInfo
      const idx = -1
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit('setCardGuaranteeInfo', list)
    },
    doDeleteAllList () {
      const layer = window.layer
      const index = layer.confirm('确定删除全部对外信用卡担保信息？', () => {
        this.$store.commit('setCardGuaranteeInfo', [])
        layer.close(index)
      })
    },
    // 添加逾期信息列表
    doAddList (idx) {
      const list = this.cardGuaranteeInfo || []
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit('setCardGuaranteeInfo', list)
    },
    // 删除逾期信息列表
    doMinuteList (idx) {
      const list = this.cardGuaranteeInfo || []
      list.splice(idx, 1)
      this.$store.commit('setCardGuaranteeInfo', list)
    },
    // 保存验证
    doSave (bool) {
      return this.validateInputList(this.cardGuaranteeInfo, this.config, bool, 'input-', '对外信用卡担保信息')
    }
  }
}
</script>

<style lang="scss">
  .card-guarantee-info-box {
    margin-top: 10px;
  }
</style>
