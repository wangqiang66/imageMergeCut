<!--
  function: 保证人信息
  author  : wq
  update  : 2018/9/25 14:31
-->
<template>
  <div class="guaranter-info-box" id="guarantee-info">
    <div class="row list-title-wrap">
      <h5 class="title flex1">保证人代偿信息</h5>
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
        v-for="(item, idx) in assurerRepayInfo"
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
  name: 'guaranter-info',
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
          label: '代偿机构',
          width: 6,
          sort: 1
        },
        'latestAssurerRepayDate': {
          label: '最近一次代偿日期',
          type: 'date',
          maxLength: 10,
          width: 3,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/DD',
          sort: 3
        },
        'money': {
          label: '累计代偿金额',
          type: 'money',
          width: 3,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 2
        },
        'latestRepayDate': {
          label: '最近一次还款日期',
          type: 'date',
          maxLength: 10,
          width: 3,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/DD',
          sort: 4
        },
        'balance': {
          label: '余额',
          type: 'money',
          width: 3,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 5
        },
        'opera': {
          label: '操作',
          type: 'btn',
          width: 2,
          sort: 9
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'assurerRepayInfo'
    ])
  },
  methods: {
    doDeleteAllList () {
      const layer = window.layer
      const layIndex = layer.confirm('确定删除所有的保证人代偿信息？', () => {
        this.$store.commit('setGuaranterInfo', [])
        layer.close(layIndex)
      })
    },
    // 添加逾期信息列表
    doAddList (idx) {
      const list = this.assurerRepayInfo || []
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit('setGuaranterInfo', list)
    },
    // 删除逾期信息列表
    doMinuteList (idx) {
      const list = this.assurerRepayInfo || []
      list.splice(idx, 1)
      this.$store.commit('setGuaranterInfo', list)
    },
    // 保存验证
    doSave (bool) {
      return this.validateInputList(this.assurerRepayInfo, this.config, bool, 'input-', '保证人代偿信息')
    }
  }
}
</script>

<style lang="scss">
  .guaranter-info-box {
    margin-top: 10px;
    margin-bottom: 20px;
  }
</style>
