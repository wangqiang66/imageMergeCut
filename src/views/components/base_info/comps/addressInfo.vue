<!--
  function: 个人基本信息中的居住信息
  author  : wq
  update  : 2018/8/13 15:49
-->
<template>
  <div>
    <h5 class="title">居住信息</h5>
    <div class="table-wrap">
      <template>
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
          v-for="(item, idx) in residenceInfo"
          :key="`ul-idx2-${item.id}`"
          class="tr-wrap">
          <li
            v-for="itm in config"
            :ref="`input-${item.id}-${itm.key}`"
            :key="`li-input-${item.id}-${itm.key}`"
            class="td-wrap center-wrap"
            :class="[itm.width ? 'flex' + itm.width : 'flex1', itm.type === 'btn' ? 'operate-wrap' : '']">
            <label v-if="itm.type === 'no'">{{idx + 1}}</label>
            <template v-else-if="itm.type === 'btn'">
              <div @click.stop="doAdd(idx)">+</div>
              <div @click.stop="doMinute(idx)">-</div>
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
      </template>
    </div>
  </div>
</template>

<script>
import {switchObjectToArray, discToPick} from '@/utils/common'
import { mapGetters } from 'vuex'
import InputMixin from '@/views/mixins'
import {LivingConditionList} from '@/config/dict'
export default {
  name: 'address-info',
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
        'address': {
          label: '居住地址',
          width: 9,
          sort: 1
        },
        'residenceType': {
          label: '居住情况',
          type: 'pick',
          list: discToPick(LivingConditionList),
          width: 5,
          sort: 2
        },
        'getTime': {
          label: '信息更新日期',
          type: 'date',
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/DD',
          maxLength: 10,
          width: 4,
          sort: 3
        },
        'opera': {
          label: '操作',
          type: 'btn',
          width: 2,
          sort: 4
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'residenceInfo'
    ])
  },
  methods: {
    doAdd (idx) {
      const list = this.residenceInfo
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit('setResidenceInfo', list)
    },
    doMinute (idx) {
      const list = this.residenceInfo
      list.splice(idx, 1)
      console.log(list)
      this.$store.commit('setResidenceInfo', list)
    },
    doSave (bool) {
      return this.validateInputList(this.residenceInfo, this.config, bool, 'input-', '居住信息')
    }
  }
}
</script>
