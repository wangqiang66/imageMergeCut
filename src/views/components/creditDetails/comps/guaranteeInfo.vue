<!--
  function: 对外贷款担保信息
  author  : wq
  update  : 2018/8/15 18:43
-->
<template>
  <div class="guarantee-info-box" id="guarantee-info">
    <div class="row list-title-wrap">
      <h5 class="title flex1">对外贷款担保信息</h5>
      <div class="btn-title row">
        <div class="btn-div" @click.stop="doAddList(-1)">添加第一条</div>
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
        v-for="(item, idx) in guaranteeInfo"
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
  name: 'guarantee-info',
  mixins: [InputMixin],
  data () {
    return {
      config: switchObjectToArray({
        'no': {
          label: '编号',
          type: 'no',
          width: 4,
          sort: 0
        },
        'organName': {
          label: '发放机构',
          require: true,
          valid: 'require',
          width: 9,
          sort: 1
        },
        'contractMoney': {
          label: '合同金额',
          type: 'money',
          require: true,
          width: 9,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,1',
          sort: 2
        },
        'beginDate': {
          label: '发放日期',
          type: 'date',
          maxLength: 10,
          require: true,
          width: 9,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,1,YYYY/MM/DD',
          sort: 3
        },
        'endDate': {
          label: '到期日期',
          type: 'date',
          maxLength: 10,
          width: 9,
          require: true,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,1,YYYY/MM/DD',
          sort: 4
        },
        'guananteeMoney': {
          label: '担保金额',
          type: 'money',
          require: true,
          width: 9,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,1',
          sort: 5
        },
        'guaranteeBalance': {
          label: '本金余额',
          type: 'money',
          width: 9,
          require: true,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,1',
          sort: 6
        },
        'class5State': {
          label: '五级分类',
          require: true,
          width: 9,
          valid: 'require',
          sort: 7
        },
        'billingDate': {
          label: '应还日期',
          type: 'date',
          width: 9,
          maxLength: 10,
          require: true,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,1,YYYY/MM/DD',
          sort: 8
        },
        'opera': {
          label: '操作',
          type: 'btn',
          width: 8,
          sort: 9
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'guaranteeInfo'
    ])
  },
  methods: {
    doDeleteAllList () {
      const layer = window.layer
      const layIndex = layer.confirm('确定删除所有的对外贷款担保信息？', () => {
        this.$store.commit('setGuaranteeInfo', [])
        layer.close(layIndex)
      })
    },
    // 添加逾期信息列表
    doAddList (idx) {
      const list = this.guaranteeInfo || []
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit('setGuaranteeInfo', list)
    },
    // 删除逾期信息列表
    doMinuteList (idx) {
      const list = this.guaranteeInfo || []
      list.splice(idx, 1)
      this.$store.commit('setGuaranteeInfo', list)
    },
    // 保存验证
    doSave (bool) {
      return this.validateInputList(this.guaranteeInfo, this.config, bool, 'input-', '对外贷款担保信息')
    }
  }
}
</script>

<style lang="scss">
  .guarantee-info-box {
    margin-top: 10px;
  }
</style>
