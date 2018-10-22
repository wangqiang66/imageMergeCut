<!--
  function: 执业资格记录
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
      title: '执业资格记录',
      resource: 'competenceInfo',
      saveResource: 'setCompetenceInfo',
      singleConfig: true,
      config: switchObjectToArray({
        'no': {
          label: '编号',
          type: 'no',
          width: 1,
          sort: 0
        },
        'competencyName': {
          label: '执业资格名称',
          width: 3,
          sort: 1
        },
        'grade': {
          label: '等级',
          width: 3,
          sort: 2
        },
        'awardDate': {
          label: '获得日期',
          type: 'date',
          width: 3,
          maxLength: 10,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/DD',
          sort: 3
        },
        'endDate': {
          label: '到期日期',
          width: 2,
          sort: 4
        },
        'revokeDate': {
          label: '吊销日期',
          width: 2,
          sort: 5
        },
        'organName': {
          label: '颁发结构',
          width: 2,
          sort: 6
        },
        'area': {
          label: '机构所在地',
          width: 3,
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
