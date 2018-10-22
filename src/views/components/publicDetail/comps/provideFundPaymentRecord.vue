<!--
  function: 住房公积金参缴记录
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
      title: '住房公积金参缴记录',
      resource: 'accFundInfo',
      saveResource: 'setAccFundInfo',
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
            label: '参缴地',
            width: 3,
            sort: 1
          },
          'registerDate': {
            label: '参缴日期',
            type: 'date',
            width: 3,
            maxLength: 10,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/dd',
            sort: 2
          },
          'firstMonth': {
            label: '初缴月份',
            type: 'date',
            width: 2,
            maxLength: 7,
            format: 'yyyy/MM',
            valid: 'datetime,,,,YYYY/MM',
            sort: 3
          },
          'toMonth': {
            label: '缴至月份',
            type: 'date',
            width: 2,
            maxLength: 7,
            format: 'yyyy/MM',
            valid: 'datetime,,,,YYYY/MM',
            sort: 4
          },
          'state': {
            label: '缴费状态',
            width: 2,
            sort: 5
          },
          'pay': {
            label: '月缴存额',
            type: 'money',
            width: 2,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 6
          },
          'ownPercent': {
            label: '个人缴存比例',
            width: 2,
            sort: 7
          },
          'comPercent': {
            label: '单位缴存比例',
            width: 2,
            sort: 8
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
            label: '缴费单位',
            width: 17,
            sort: 1
          },
          'getTime': {
            label: '信息更新日期',
            type: 'date',
            width: 3,
            maxLength: 10,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/dd',
            sort: 3
          }
        })
      ]
    }
  }
}
</script>
