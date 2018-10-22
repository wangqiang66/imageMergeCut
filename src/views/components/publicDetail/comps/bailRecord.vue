<!--
  function: 低保救助记录
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
      title: '低保救助记录',
      resource: 'salvationInfo',
      saveResource: 'setSalvationInfo',
      singleConfig: true,
      config: switchObjectToArray({
        'no': {
          label: '编号',
          type: 'no',
          width: 1,
          sort: 0
        },
        'personnelType': {
          label: '人员类别',
          width: 2,
          sort: 1
        },
        'area': {
          label: '所在地',
          width: 2,
          sort: 2
        },
        'organName': {
          label: '工作单位',
          width: 3,
          sort: 3
        },
        'money': {
          label: '家庭月收入',
          type: 'money',
          width: 2,
          format: 'floatNumber,,',
          valid: 'floatNumber,,,,',
          sort: 4
        },
        'registerDate': {
          label: '申请日期',
          type: 'date',
          width: 3,
          maxLength: 10,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/DD',
          sort: 5
        },
        'passDate': {
          label: '批准日期',
          type: 'date',
          width: 3,
          maxLength: 10,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/DD',
          sort: 6
        },
        'getTime': {
          label: '信息更新日期',
          type: 'date',
          width: 3,
          maxLength: 10,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/DD',
          sort: 7
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
