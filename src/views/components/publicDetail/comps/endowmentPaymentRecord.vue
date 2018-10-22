<!--
  function: 养老保险金存缴记录
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
      title: '养老保险金存缴记录',
      resource: 'endowmentPaymentInfo',
      saveResource: 'setEndowmentPaymentInfo',
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
            label: '参保地',
            width: 2,
            sort: 1
          },
          'registerDate': {
            label: '参保日期',
            type: 'date',
            width: 3,
            maxLength: 10,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/dd',
            sort: 2
          },
          'monthDuration': {
            label: '累计缴纳月数',
            type: 'tel',
            width: 2,
            format: 'intNumber,,',
            valid: 'intNumber,,,,',
            sort: 3
          },
          'workDate': {
            label: '参加工作月份',
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
          'ownBasicMoney': {
            label: '个人缴费基数',
            type: 'money',
            width: 2,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 6
          },
          'money': {
            label: '本月缴费金额',
            type: 'money',
            width: 2,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 7
          },
          'getTime': {
            label: '信息更新日期',
            width: 3,
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
            width: 10,
            sort: 1
          },
          'pauseReason': {
            label: '中断或终止缴费原因',
            width: 10,
            sort: 3
          }
        })
      ]
    }
  }
}
</script>
