<!--
  function: 查询记录
  author  : wq
  update  : 2018/8/13 17:29
-->
<template>
  <div id="query-details">
    <h3 class="title">五、查询记录</h3>
    <component :key="`component-${idx}`" v-for="(item, idx) in comps" :ref="`comp-${item.name}`" :is="item.name"></component>
  </div>
</template>

<script>
import RecordSummary from './comps/recordSummary'
import RecordDetailInfo from './comps/recordDetailInfo'
import RecordSelfDetailInfo from './comps/selfRecordDetailInfo'
import IndexValidateInfo from '@/views/mixins/indexSave'
export default {
  name: 'query-detail-wrap',
  mixins: [IndexValidateInfo],
  components: {
    RecordSummary,
    RecordDetailInfo,
    RecordSelfDetailInfo
  },
  props: {
    child: {
      type: Array
    }
  },
  data () {
    return {
      innerComps: ['record-summary', 'record-detail-info', 'record-self-detail-info']
    }
  }
}
</script>
