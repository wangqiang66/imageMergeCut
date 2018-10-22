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
      title: '民事判决记录',
      resource: 'civilJudgementInfo',
      saveResource: 'setCivilJudgementInfo',
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
            label: '立案法院',
            width: 6,
            sort: 1
          },
          'caseReason': {
            label: '案由',
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
          'caseResult': {
            label: '判决/调解结果',
            width: 9,
            sort: 1
          },
          'caseValidateDate': {
            label: '判决/调解生效日期',
            type: 'date',
            width: 3,
            maxLength: 10,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,,YYYY/MM/dd',
            sort: 3
          },
          'suitObject': {
            label: '诉讼标的',
            width: 5,
            sort: 4
          },
          'suitObjectMoney': {
            label: '诉讼标的金额',
            type: 'money',
            width: 3,
            format: 'floatNumber,,',
            valid: 'floatNumber,,,,',
            sort: 5
          }
        })
      ]
    }
  }
}
</script>
