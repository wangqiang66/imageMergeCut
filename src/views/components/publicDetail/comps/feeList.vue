<!--
  function: 欠费记录
  author  : wq
  update  : 2018/9/27 18:19
-->
<script>
import { switchObjectToArray } from '@/utils/common'
import BaseView from './base'

export default {
  extends: BaseView,
  data () {
    return {
      title: '欠税记录',
      resource: 'taxArrearInfo',
      saveResource: 'setTaxArrearInfo',
      singleConfig: true,
      config: switchObjectToArray({
        'no': {
          label: '编号',
          type: 'no',
          width: 1,
          sort: 0
        },
        'organName': {
          label: '主管税务机关',
          width: 12,
          sort: 1
        },
        'taxArreaAmount': {
          label: '欠税总额',
          type: 'money',
          width: 3,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 3
        },
        'revenueDate': {
          label: '欠税统计日期',
          type: 'date',
          width: 3,
          maxLength: 10,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/dd',
          sort: 4
        },
        'opera': {
          label: '操作',
          type: 'btn',
          width: 2,
          sort: 9
        }
      })
    }
  }
}
</script>
