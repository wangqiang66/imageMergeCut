<!--
  function: recordDetailInfo
  author  : wq
  update  : 2018/8/15 19:03
-->
<template>
  <div class="record-detail-info-box">
    <div class="row list-title-wrap">
      <h5 class="title flex1">个人查询记录明细</h5>
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
        v-for="(item, idx) in recordSelfDetailInfo"
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
import {switchObjectToArray, discToPick} from '@/utils/common'
import {SearchReson} from '@/config/dict'
import {mapGetters} from 'vuex'
import InputMixin from '@/views/mixins'
export default {
  name: 'record-detail-info',
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
        'queryDate': {
          label: '查询日期',
          type: 'date',
          width: 4,
          maxLength: 10,
          require: true,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,1,YYYY/MM/DD',
          sort: 1
        },
        'querier': {
          label: '查询操作员',
          width: 9,
          require: true,
          valid: 'require',
          sort: 2
        },
        'queryReason': {
          label: '查询原因',
          type: 'pick',
          width: 5,
          list: discToPick(SearchReson),
          require: true,
          valid: 'require',
          sort: 3
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
      'recordSelfDetailInfo'
    ])
  },
  created () {
    window.storeGlobalIoc.doReplaceSelfRecordDetailList = this.doReplaceList.bind(this)
  },
  methods: {
    doDeleteAllList () {
      const layer = window.layer
      const list = JSON.parse(JSON.stringify(this.recordDetailInfo))
      layer.prompt({
        title: '请输入编号',
        content: '<p class="pad-b-normal">请输入开始编号和结束编号(如果有，中间以“-”分割)</p><input type="text" class="layui-layer-input text-center">'
      }, (value, index) => {
        let start, end, tip
        if (value.indexOf('-') > -1) {
          let tmp = value.split('-')
          start = parseInt(tmp[0])
          end = parseInt(tmp[1])
        } else {
          start = parseInt(value)
          end = list.length
        }
        if (isNaN(start)) {
          start = 1
        }
        if (isNaN(end)) {
          end = list.length
        }
        start = Math.max(1, start)
        end = Math.min(list.length, end)
        if (start <= 1 && end >= list.length) {
          tip = '全部'
        } else if (end > list.length) {
          tip = `编号从${start}后面的所有`
        } else {
          tip = `编号从${start}到${end}的`
        }
        list.splice(start - 1, end - start + 1)
        layer.confirm(`确定删除${tip}个人查询记录明细？`, (index1) => {
          this.$store.commit('setRecordSelfDetailInfo', list)
          layer.close(index1)
          layer.close(index)
        })
      })
    },
    // 添加逾期信息列表
    doAddList (idx) {
      const list = this.recordSelfDetailInfo || []
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit('setRecordSelfDetailInfo', list)
    },
    // 删除逾期信息列表
    doMinuteList (idx) {
      const list = this.recordSelfDetailInfo || []
      list.splice(idx, 1)
      this.$store.commit('setRecordSelfDetailInfo', list)
    },
    // 保存验证
    doSave (bool) {
      return this.validateInputList(this.recordSelfDetailInfo, this.config, bool, 'input-', '个人查询记录明细')
    },
    // 替换多条记录
    doReplaceList (idx, data) {
      if (idx < 1) {
        idx = 1
      }
      const list = this.recordSelfDetailInfo || []
      let arr = new Array(0)
      if (list.length < idx) {
        arr = new Array(idx - list.length - 1)
      }
      const time = new Date().getTime() + 1000
      const tData = [...arr, ...data].map((item, index) => {
        if (item && Array.isArray(item)) {
          return {
            queryDate: item[1] || '',
            querier: item[2] || '',
            queryReason: item[3] || '',
            id: time + index
          }
        } else {
          return {
            id: time + index
          }
        }
      })
      list.splice(idx - 1, tData.length, ...tData)
      this.$store.commit('setRecordSelfDetailInfo', list)
    }
  }
}
</script>

<style>
  .record-detail-info-box {
    margin-top: 10px;
  }
</style>
