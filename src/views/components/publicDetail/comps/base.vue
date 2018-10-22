<!--
  function: base
  author  : wq
  update  : 2018/9/28 9:36
-->
<!--
  function: 民事判决记录
  author  : wq
  update  : 2018/9/27 18:25
-->
<template>
  <div class="public-base-info-box" v-if="datas.length > 0">
    <div class="row list-title-wrap">
      <h5 class="title flex1">{{ title }}</h5>
      <div class="btn-title row">
        <div class="btn-div btn-red" @click.stop="doDeleteAllList">删除记录</div>
      </div>
    </div>
    <div class="table-wrap div-wrap" v-if="singleConfig">
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
        v-for="(item, idx) in datas"
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
    <div class="table-wrap div-wrap" v-else>
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
          v-for="(item, idx) in datas"
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
      </template>
    </div>
  </div>
</template>

<script>
import InputMixin from '@/views/mixins'
export default {
  name: 'fee-list',
  mixins: [InputMixin],
  data () {
    return {
      title: '',
      resource: '',
      saveResource: '',
      singleConfig: true,
      config: []
    }
  },
  computed: {
    datas () {
      return this.$store.getters[this.resource]
    }
  },
  methods: {
    doDeleteAllList () {
      const layer = window.layer
      const title = this.title
      layer.confirm(`确定删除全部${title}？`, (index) => {
        this.$store.commit(this.saveResource, [])
        layer.close(index)
      })
    },
    // 添加逾期信息列表
    doAddList (idx) {
      const list = this.datas || []
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.$store.commit(this.saveResource, list)
    },
    // 删除逾期信息列表
    doMinuteList (idx) {
      const list = this.datas || []
      list.splice(idx, 1)
      this.$store.commit(this.saveResource, list)
    },
    // 保存验证
    doSave (bool) {
      const title = this.title
      return this.validateInputList(this.datas, this.config, bool, 'input-', title)
    }
  }
}
</script>

<style>
  .public-base-info-box {
    margin-top: 10px;
  }
</style>
