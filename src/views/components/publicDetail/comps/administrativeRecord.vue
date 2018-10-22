<!--
  function: 行政处罚记录
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
      title: '行政处罚记录',
      resource: 'adminPunishmentInfo',
      saveResource: 'setAdminPunishmentInfo',
      singleConfig: true,
      config: switchObjectToArray({
        'no': {
          label: '编号',
          type: 'no',
          width: 1,
          sort: 0
        },
        'organName': {
          label: '处罚机构',
          width: 3,
          sort: 1
        },
        'content': {
          label: '处罚内容',
          width: 3,
          sort: 2
        },
        'money': {
          label: '处罚金额',
          type: 'money',
          width: 3,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 3
        },
        'beginDate': {
          label: '生效日期',
          type: 'date',
          width: 3,
          maxLength: 10,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/dd',
          sort: 4
        },
        'endDate': {
          label: '截止日期',
          type: 'date',
          width: 3,
          maxLength: 10,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/dd',
          sort: 5
        },
        'result': {
          label: '行政复议结果',
          width: 3,
          sort: 6
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
