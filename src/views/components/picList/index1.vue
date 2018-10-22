<!--
  function: 处理图片列表
  author  : wq
  update  : 2018/9/25 9:16
-->
<template>
  <div class="column image-box">
    <clip-slot :list="list" v-model="isClip" @doneClipImage="doneClipImage"></clip-slot>
    <el-dialog title="截图解析" :visible.sync="queryListDialog.visible" width="90%">
      <div class="clip-title">截图信息</div>
      <div class="clip-img-wrap"><img :src="queryListDialog.clipImage" /></div>
      <div class="clip-title">解析结果</div>
      <div class="table-wrap div-wrap">
        <ul class="tr-wrap">
          <li
            v-for="itm in queryListDialog.config"
            :key="`li-text-${itm.key}`"
            class="td-li-wrap center-wrap"
            :class="[itm.width ? 'flex' + itm.width : 'flex1']">
            <form-label :value="itm.label" :require="itm.require"></form-label>
          </li>
        </ul>
        <ul
          v-for="(item, idx) in queryListDialog.list"
          :key="`ul-input-${item.id}`"
          class="tr-wrap">
          <li
            v-for="(itm, index) in queryListDialog.config"
            :ref="`input-${item.id}-${itm.key}`"
            :key="`li-input-${item.id}-${itm.key}`"
            class="td-wrap center-wrap"
            :class="[itm.width ? 'flex' + itm.width : 'flex1', itm.type === 'btn' ? 'operate-wrap' : '']">
            <label v-if="itm.type === 'no'">{{parseInt(item[index]) || ''}}</label>
            <template v-else-if="itm.type === 'btn'">
              <div @click.stop="doAddList(idx)">+</div>
              <div @click.stop="doMinuteList(idx)">-</div>
            </template>
            <form-input
              v-else
              v-model="item[index]"
              :type="itm.type"
              :list="itm.list"
              :placeholder="itm.placeholder"
              :max-length="itm.maxLength"
              :pos="itm.pos"
              :format="itm.format"></form-input>
          </li>
        </ul>
      </div>
      <div class="row form-wrap align-middle">
        <div class="row align-middle">
          <label>{{ `信息内容:　` }}</label>
            <select v-model="queryListDialog.type">
            <option value="1" selected>机构查询记录</option>
            <option value="2">个人查询记录</option>
          </select>
        </div>
        <div class="flex1 row align-middle">
          <label>记录开始序号:　</label> <input v-model="queryListDialog.start" />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="queryListDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="doSureClipData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ClipSlot from '@/components/cropper/index'
import { switchObjectToArray, discToPick, getQueryStr } from '@/utils/common'
import { SearchReson } from '@/config/dict'

export default {
  name: 'img-list',
  components: {
    ClipSlot
  },
  data () {
    return {
      list: [],
      isClip: false,
      queryListDialog: {
        config: switchObjectToArray({
          'no': {
            label: '编号',
            type: 'no',
            width: 1,
            sort: 0
          },
          'queryDate': {
            label: '查询日期',
            type: 'date',
            width: 4,
            maxLength: 10,
            require: true,
            format: 'yyyy/MM/dd',
            valid: 'datetime,,,1,YYYY/MM/DD',
            sort: 1
          },
          'querier': {
            label: '查询操作员',
            width: 9,
            require: true,
            valid: 'require',
            sort: 2
          },
          'queryReason': {
            label: '查询原因',
            type: 'pick',
            width: 5,
            list: discToPick(SearchReson),
            require: true,
            valid: 'require',
            sort: 3
          },
          'opera': {
            label: '操作',
            type: 'btn',
            width: 2,
            sort: 9
          }
        }),
        visible: false,
        clipImage: '',
        type: '1',
        start: '',
        list: []
      }
    }
  },
  created () {
    const subTaskId = getQueryStr('subTaskId')
    this.taskId = getQueryStr('taskId')
    this.$store.dispatch('getImageList', {
      innerParams: {
        subTaskId
      }
    }).then(data => {
      this.list = (data || []).sort((item1, item2) => {
        return item1.serialNo - item2.serialNo
      })
      return data
    })
  },
  mounted () {
    window.beginShot = this.beginShot.bind(this)
  },
  methods: {
    beginShot (type) {
      this.type = type
      this.isClip = true
    },
    doneClipImage (dataURL) {
      // 获取截图的图片
      const id = this.taskId
      const type = this.type || ''
      this.$store.dispatch('getClipSlot', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          screenshot: dataURL,
          id,
          type
        }
      }).then(data => {
        if (type === '1') {
          this.showClipQueryList(data, dataURL)
        } else {
          this.showClipData(data, dataURL)
        }
      })
    },
    // 处理解析后的数据进行展示
    showClipData (data, dataURL) {
      let screeshotHtml = '<table class="layui-table" lay-skin="line"><tr><img src="' + dataURL + '"></tr>'
      if (data.retCode === '0000') {
        for (var i = 1; i <= data.data.length; i++) {
          screeshotHtml = screeshotHtml + '<tr><td>' + i + '</td><td>' + data.data[i - 1] + '</td></tr>'
        }
        screeshotHtml += '</table>'
      } else {
        screeshotHtml = '<div style="padding: 20px 80px;">' + data.retMsg + '</div>'
      }
      // 边缘弹出
      const layer = window.layer
      layer.open({
        type: 1,
        offset: 'auto', // 具体配置参考：offset参数项
        content: screeshotHtml,
        btn: '关闭全部',
        btnAlign: 'c', // 按钮居中
        shade: 0, // 不显示遮罩
        title: '解析结果',
        yes: function () {
          layer.closeAll()
        }
      })
      return data
    },
    // 展示识别的查询机构或者个人列表
    showClipQueryList (data, dataURL) {
      if (data.retCode !== '0000') {
        const layer = window.layer
        layer.open({
          type: 1,
          content: '<div style="padding: 20px 80px;">' + data.retMsg + '</div>',
          btn: '关闭全部',
          btnAlign: 'c', // 按钮居中
          shade: 0, // 不显示遮罩
          title: '截图解析',
          btn1: function () {
            layer.closeAll()
          }
        })
      } else {
        const time = new Date().getTime() + 1000
        const rData = (data.data || []).map((item, index) => {
          item = typeof item === 'string' ? JSON.parse(item) : item
          item[1] = (item[1] || '').replace(/\s/g, '').replace(/\./g, '/')
          item.id = time + index
          return item
        })
        this.queryListDialog.clipImage = dataURL
        this.queryListDialog.list = rData
        this.queryListDialog.visible = true
      }
    },
    // 添加逾期信息列表
    doAddList (idx) {
      const list = this.queryListDialog.list || []
      list.splice(idx + 1, 0, {
        id: new Date().getTime() + 1000
      })
      this.queryListDialog.list = list
    },
    // 删除逾期信息列表
    doMinuteList (idx) {
      const list = this.queryListDialog.list || []
      list.splice(idx, 1)
      this.queryListDialog.list = list
    },
    doSureClipData () {
      const queryListDialog = this.queryListDialog
      const type = queryListDialog.type
      const start = queryListDialog.start
      const list = queryListDialog.list
      const layer = window.layer
      if (Number(start).toString() !== start) {
        layer.msg('记录序号输入有误')
        return false
      }
      if (type === '1') {
        try {
          window.parent.frames['iframeInput'].storeGlobalIoc.doReplaceRecordDetailList(Number(start), list)
        } catch (e) {
          console.log('执行出错')
        }
      } else {
        try {
          window.parent.frames['iframeInput'].storeGlobalIoc.doReplaceSelfRecordDetailList(Number(start), list)
        } catch (e) {
          console.log('执行出错')
        }
      }
      // console.log(list)
    }
    // showClipQueryList (data, dataURL) {
    //   let screeshotHtml = []
    //   let flag = true
    //   screeshotHtml.push('<div class="clip-title">截图信息</div>')
    //   screeshotHtml.push('<div class="clip-img-wrap"><img src="' + dataURL + '"></div>')
    //   screeshotHtml.push('<br />')
    //   screeshotHtml.push('<div class="clip-title">解析结果</div>')
    //   screeshotHtml.push('<div class="clip-table-wrap"><table class="layui-table" lay-skin="line">')
    //   let reData
    //   if (data.retCode === '0000') {
    //     screeshotHtml.push('<thead><tr><th colspan="4">查询日期</th><th colspan="9">查询操作员\n</th><th colspan="5">查询原因</th></tr></thead>')
    //     const rData = data.data || []
    //     let tmpData
    //     reData = rData.map(item => {
    //       tmpData = item
    //       if (typeof item === 'string') {
    //         tmpData = JSON.parse(item)
    //       }
    //       screeshotHtml.push('<tr class="no"><td colspan="4">' + (tmpData[0] || '') + '</td><td colspan="9">' + (tmpData[1] || '') + '</td><td colspan="5">' + (tmpData[2] || '') + '</td></tr>')
    //     })
    //     screeshotHtml.push('</table></div>')
    //     screeshotHtml.push('<div class="row form-wrap align-middle">')
    //     screeshotHtml.push('<div class="row align-middle"><label>信息内容:　</label><select id="clip-block-type"><option value="1">机构查询记录</option><option value="2">个人查询记录</option></select></div>')
    //     screeshotHtml.push('<div class="flex1 row align-middle"><label>记录开始序号:　</label><input id="clip-no-start" /></div>')
    //     screeshotHtml.push('</div>')
    //     flag = true
    //   } else {
    //     screeshotHtml = ['<div style="padding: 20px 80px;">' + data.retMsg + '</div>']
    //     flag = false
    //   }
    //   // 边缘弹出
    //   const layer = window.layer
    //   // const maxHeight = 0.9 * document.documentElement.clientHeight
    //   layer.open({
    //     type: 1,
    //     area: ['90%', ''],
    //     content: screeshotHtml.join(''),
    //     btn: flag ? ['取消', '确认'] : '关闭全部',
    //     btnAlign: 'c', // 按钮居中
    //     shade: 0, // 不显示遮罩
    //     title: ['截图解析', 'text-align: center'],
    //     skin: 'layer-query-list-clip',
    //     maxHeight: '80%',
    //     btn1: function () {
    //       layer.closeAll()
    //     },
    //     btn2: function () {
    //       const type = document.getElementById('clip-block-type').value
    //       const start = document.getElementById('clip-no-start').value
    //       if (Number(start).toString() !== start) {
    //         layer.msg('记录序号输入有误')
    //         return false
    //       }
    //       if (type === '1') {
    //         try {
    //           window.parent.frames['iframeInput'].storeGlobalIoc.doReplaceRecordDetailList(Number(start), reData)
    //         } catch (e) {
    //           console.log('执行出错')
    //         }
    //       } else {
    //         try {
    //           window.parent.frames['iframeInput'].storeGlobalIoc.doReplaceSelfRecordDetailList(Number(start), reData)
    //         } catch (e) {
    //           console.log('执行出错')
    //         }
    //       }
    //       layer.closeAll()
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
  .image-box {
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: inset 1px 0 0 hsla(0, 0%, 100%, .05);
  }

  .preview-img {
    width: 100%;
    text-decoration: none;
    user-select: none;
    margin-top: 20px;
  }

  .preview-img:first-of-type {
    margin-top: 0
  }

  .toolbar {
    position: relative;
    height: 32px;
    left: 0;
    right: 0;
    z-index: 9999;
    cursor: default;
  }

  .toolbarContainer {
    position: fixed;
    width: 100%;
    height: 32px;
    box-shadow: inset 1px 0 0 hsla(0, 0%, 100%, .08), inset 0 1px 1px hsla(0, 0%, 0%, .15), inset 0 -1px 0 hsla(0, 0%, 100%, .05), 0 1px 0 hsla(0, 0%, 0%, .15), 0 1px 1px hsla(0, 0%, 0%, .1);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    background-color: #474747;
    background-image: url(../../../images/texture.png), linear-gradient(hsla(0, 0%, 32%, .99), hsla(0, 0%, 27%, .95));
  }

  .toolbarButton {
    position: relative;
    min-width: 32px;
    min-height: 24px;
    padding: 2px 6px 0;
    border: 1px solid transparent;
    border-radius: 2px;
    color: hsla(0, 0%, 100%, .8);
    font-size: 12px;
    line-height: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: default;
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 150ms;
    transition-timing-function: ease
  }

  .toolbarButton.zoomOut:before {
    position: absolute;
    display: inline-block;
    top: 4px;
    left: 7px;
    content: url(../../../images/toolbarButton-zoomOut.png);
  }

  .toolbarButton.zoomIn:before {
    position: absolute;
    display: inline-block;
    top: 4px;
    left: 7px;
    content: url(../../../images/toolbarButton-zoomIn.png);
  }

  .splitToolbarButtonSeparator {
    padding: 8px 0;
    width: 1px;
    background-color: hsla(0, 0%, 0%, .5);
    z-index: 99;
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .08);
    margin: 5px 0;
  }

  .toolbarButton > span {
    display: inline-block;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .image-outer-wrap {
    position: relative;
  }

  .image-wrap {
    transform-origin: top left;
    cursor: grab;
    position: relative;
    background-color: rgba(0, 0, 0, 1);
  }

  .image-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .clip-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: crosshair;
  }

  .clip-btn-wrap {
    position: absolute;
    bottom: -40px;
    white-space: nowrap;
    width: 120px;
    left: 50%;
    margin-left: -60px;
  }

  .clip-btn-wrap button {
    padding: 5px 15px;
    border: 1px solid;
    border-radius: 12px;
    margin-right: 5px;
    font-size: 12px;
    background: #fff;
  }

  /** 弹框样式 **/

  .clip-title {
    padding: 0 8px;
    background-color: #fff;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .form-wrap {
    padding: 20px 10px;
    height: 80px;
    font-size: 15px;
    & > div {
        height: 100%;
        padding-right: 25px;
      }
    select, input {
      height: 100%;
      width: 160px;
      box-sizing: border-box;
      border: 1px solid #eee;
      text-align: center;
    }
  }
  .clip-img-wrap img {
    width: 100%;
  }
</style>
