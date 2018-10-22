<!--
  function: 民事判决记录
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
      title: '养老保险金发放记录',
      resource: 'endowmentObtainsInfo',
      saveResource: 'setEndowmentObtainsInfo',
      singleConfig: false,
      config: [
        switchObjectToArray({
          'no': {
            label: '编号',
            type: 'no',
            width: 1,
            sort: 0
          },
          'area': {
            label: '发放地',
            width: 3,
            sort: 1
          },
          'retireType': {
            label: '离退休类别',
            width: 3,
            sort: 2
          },
          'retiredDate': {
            label: '离退休月份',
            type: 'date',
            width: 3,
            maxLength: 7,
            format: 'yyyy/MM',
            valid: 'datetime,,,,YYYY/MM',
            sort: 3
          },
          'workDate': {
            label: '参加工作月份',
            type: 'date',
            width: 3,
            maxLength: 7,
            format: 'yyyy/MM',
            valid: 'datetime,,,,YYYY/MM',
            sort: 4
          },
          'money': {
            label: '本月实发养老金',
            type: 'money',
            width: 3,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 5
          },
          'pauseReason': {
            label: '停发原因',
            width: 3,
            sort: 6
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
          'organName': {
            label: '原单位名称',
            width: 17,
            sort: 1
          },
          'getTime': {
            label: '信息更新日期',
            type: 'date',
            width: 3,
            maxLength: 7,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/DD',
            sort: 2
          }
        })
      ]
    }
  }
}
</script>
