<!--
  function: 行政奖励记录
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
      title: '行政奖励记录',
      resource: 'adminAwardInfo',
      saveResource: 'setAdminAwardInfo',
      singleConfig: true,
      config: switchObjectToArray({
        'no': {
          label: '编号',
          type: 'no',
          width: 1,
          sort: 0
        },
        'organName': {
          label: '奖励机构',
          width: 6,
          sort: 1
        },
        'content': {
          label: '奖励内容',
          width: 6,
          maxLength: 10,
          sort: 2
        },
        'beginDate': {
          label: '生效日期',
          type: 'date',
          width: 3,
          maxLength: 10,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/DD',
          sort: 3
        },
        'endDate': {
          label: '截止日期',
          type: 'date',
          width: 3,
          maxLength: 10,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/DD',
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
