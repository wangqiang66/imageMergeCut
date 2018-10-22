<!--
  function: 电信缴费记录
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
      title: '电信缴费记录',
      resource: 'telPaymentInfo',
      saveResource: 'setTelPaymentInfo',
      singleConfig: false,
      config: [
        switchObjectToArray({
          'no': {
            label: '编号',
            type: 'no',
            width: 1,
            sort: 0
          },
          'organName': {
            label: '电信运营商',
            width: 3,
            sort: 1
          },
          'type': {
            label: '业务类型',
            width: 3,
            sort: 2
          },
          'registerDate': {
            label: '业务开通日期',
            type: 'date',
            width: 3,
            maxLength: 10,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/DD',
            sort: 3
          },
          'state': {
            label: '当前缴费状态',
            width: 3,
            sort: 4
          },
          'arrearMoney': {
            label: '当前欠费金额',
            type: 'money',
            width: 2,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 5
          },
          'arrearMonths': {
            label: '当前欠费月数',
            type: 'tel',
            maxLength: 2,
            width: 2,
            format: 'intNumber',
            valid: 'intNumber',
            sort: 6
          },
          'getTime': {
            label: '记账年月',
            type: 'date',
            maxLength: 7,
            width: 2,
            format: 'yyyy/MM',
            valid: 'datetime,,,,YYYY/MM',
            sort: 7
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
          'status24': {
            label: '最近24个月缴费记录',
            type: '24status',
            width: 20,
            sort: 0
          }
        })
      ]
    }
  }
}
</script>
