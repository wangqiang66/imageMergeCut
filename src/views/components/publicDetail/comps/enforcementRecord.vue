<!--
  function: 强制执行记录
  author  : wq
  update  : 2018/9/27 18:25
-->
<script>
import { switchObjectToArray } from '@/utils/common'
import BaseView from './base'

export default {
  extends: BaseView,
  data () {
    return {
      title: '强制执行记录',
      resource: 'forceExecutionInfo',
      saveResource: 'setForceExecutionInfo',
      singleConfig: false,
      config: [
        switchObjectToArray({
          'no': {
            label: '编号',
            type: 'no',
            width: 1,
            sort: 0
          },
          'court': {
            label: '执行法院',
            width: 6,
            sort: 1
          },
          'caseReason': {
            label: '执行案由',
            width: 6,
            sort: 3
          },
          'registerDate': {
            label: '立案时间',
            type: 'date',
            width: 3,
            maxLength: 10,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/dd',
            sort: 4
          },
          'closedType': {
            label: '结案方式',
            width: 3,
            sort: 5
          },
          'opera': {
            label: '操作',
            type: 'btn',
            width: 2,
            sort: 9
          }
        }),
        switchObjectToArray({
          'no': {
            label: '编号',
            type: 'no',
            width: 1,
            sort: 0
          },
          'casesTate': {
            label: '案件状态',
            width: 5,
            sort: 1
          },
          'closedDate': {
            label: '结案日期',
            type: 'date',
            width: 3,
            maxLength: 10,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/dd',
            sort: 3
          },
          'enforceBigDecimal': {
            label: '申请执行标的',
            width: 3,
            sort: 4
          },
          'enforceBigDecimalMoney': {
            label: '申请执行标的价值',
            type: 'money',
            width: 3,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 5
          },
          'alreadyEnforceBigDecimal': {
            label: '已执行标的',
            width: 3,
            sort: 6
          },
          'alreadyEnforceBigDecimalMoney': {
            label: '已执行标的金额',
            type: 'money',
            width: 3,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 7
          }
        })
      ]
    }
  }
}
</script>
