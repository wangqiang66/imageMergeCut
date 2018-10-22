<!--
  function: 车辆交易和抵押记录
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
      title: '车辆交易和抵押记录',
      resource: 'vehicleInfo',
      saveResource: 'setVehicleInfo',
      singleConfig: true,
      config: switchObjectToArray({
        'no': {
          label: '编号',
          type: 'no',
          width: 1,
          sort: 0
        },
        'licenseCode': {
          label: '车牌号码',
          width: 2,
          sort: 1
        },
        'engineCode': {
          label: '发动机号',
          width: 2,
          sort: 2
        },
        'brand': {
          label: '品牌',
          width: 3,
          sort: 3
        },
        'carType': {
          label: '车辆类型',
          width: 2,
          sort: 4
        },
        'useCharacter': {
          label: '使用性质',
          width: 2,
          sort: 5
        },
        'state': {
          label: '车辆状态',
          width: 2,
          sort: 6
        },
        'pledgeFlag': {
          label: '抵押标记',
          width: 2,
          sort: 7
        },
        'getTime': {
          label: '信息更新时间',
          type: 'date',
          width: 3,
          maxLength: 10,
          format: 'yyyy/MM/dd',
          valid: 'datetime,,,,YYYY/MM/DD',
          sort: 8
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
