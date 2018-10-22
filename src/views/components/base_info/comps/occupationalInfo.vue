<!--
  function: 个人基本信息中的职业信息
  author  : wq
  update  : 2018/8/13 15:49
-->
<template>
  <div>
    <h5 class="title">职业信息</h5>
    <div class="table-wrap">
      <template v-for="(configList, index) in config">
        <ul :key="`ul-idx1-${index}`" class="tr-wrap">
          <li
            v-for="itm in configList"
            :key="`li-text-${itm.key}`"
            class="td-li-wrap center-wrap"
            :class="[itm.width ? 'flex' + itm.width : 'flex1']">
            <form-label :value="itm.label" :require="itm.require" :import="itm.import"></form-label>
          </li>
        </ul>
        <ul
          v-for="(item, idx) in professionalInfo"
          :key="`ul-idx2-${item.id}-${index}`"
          class="tr-wrap">
          <li
            v-for="itm in configList"
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
import {switchObjectToArray} from '@/utils/common'
import {mapGetters} from 'vuex'
import InputMixin from '@/views/mixins'

export default {
  name: 'occupational-info',
  mixins: [InputMixin],
  data () {
    return {
      config: [
        switchObjectToArray({
          'no': {
            label: '编号',
            type: 'no',
            width: 1,
            sort: 0
          },
          'employer': {
            label: '工作单位',
            width: 9,
            import: true,
            sort: 1
          },
          'employerAddress': {
            label: '单位地址',
            width: 9,
            sort: 2
          },
          'opera': {
            label: '操作',
            type: 'btn',
            width: 2,
            sort: 4
          }
        }),
        switchObjectToArray({
          'no': {
            label: '编号',
            type: 'no',
            width: 1,
            sort: 0
          },
          'occupation': {
            label: '职业',
            width: 3,
            sort: 1
          },
          'industry': {
            label: '行业',
            width: 3,
            sort: 2
          },
          'duty': {
            label: '职务',
            width: 3,
            sort: 3
          },
          'title': {
            label: '职称',
            width: 3,
            sort: 4
          },
          'startYear': {
            label: '进入本单位年份',
            width: 3,
            sort: 5
          },
          'getTime': {
            label: '信息更新日',
            type: 'date',
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/DD',
            maxLength: 10,
            width: 3,
            sort: 6
          },
          'opera': {
            label: '操作',
            type: 'btn',
            width: 2,
            sort: 7
          }
        })]
    }
  },
  computed: {
    ...mapGetters([
      'professionalInfo'
    ])
  },
  methods: {
    doAdd (idx) {
      const list = this.professionalInfo
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit('setProfessionalInfo', list)
    },
    doMinute (idx) {
      const list = this.professionalInfo
      list.splice(idx, 1)
      this.$store.commit('setProfessionalInfo', list)
    },
    doSave (bool) {
      return this.validateInputConfigList(this.professionalInfo, this.config, bool, 'input-', '职业信息')
    }
  }
}
</script>
