<!--
  function: 处理图片列表
  author  : wq
  update  : 2018/9/25 9:16
-->
<template>
  <div class="column image-box">
    <div class="toolbar">
      <div class="toolbarContainer">
        <button id="zoomOut" class="toolbarButton zoomOut" title="缩小" tabindex="21" data-l10n-id="zoom_out"
                @click="doScaleOut">
          <span data-l10n-id="zoom_out_label">缩小</span>
        </button>
        <div class="splitToolbarButtonSeparator"></div>
        <button id="zoomIn" class="toolbarButton zoomIn" title="放大" tabindex="22" data-l10n-id="zoom_in"
                @click="doScaleIn">
          <span data-l10n-id="zoom_in_label">放大</span>
        </button>
      </div>
    </div>
    <div class="column image-outer-wrap" ref="img-wrap">
      <div class="image-wrap" :style="`transform: scale(${scale/100})`">
        <img crossOrigin="anonymous" :style="{height:`${getHeight(item)}px`}" class="preview-img"
             :ref="`preview-${item.location}`" :key="`img-${index}`" v-for="(item, index) in list" :src="item.path" />
      </div>
      <div class="image-mask" :style="{width: `${scale}%`, height: `${scale}%`}">
        <div v-if="isClip" class="clip-wrap" @mousedown.stop="startMove">
          <div :style="clipStyle">
            <div v-if="cropped" class="clip-btn-wrap" @mousedown.stop="() => {}">
              <button @click.stop="doClipSlot">确定</button>
              <button @click="endClip">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
            <option value="1">机构查询记录</option>
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
import { switchObjectToArray, discToPick, getQueryStr } from '@/utils/common'
import { SearchReson } from '@/config/dict'

export default {
  name: 'img-list',
  data () {
    return {
      list: [],
      scale: 100,
      isClip: false,
      cropping: false,
      cropped: false,
      cropOption: {
        cropOffsetX: 0,
        cropOffsetY: 0,
        cropChangeX: 0,
        cropChangeY: 0,
        cropX: 0,
        cropY: 0,
        cropW: 0,
        cropH: 0
      },
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
        type: '',
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
  computed: {
    clipStyle () {
      const {
        cropOffsetX, cropOffsetY, cropX, cropY, cropW, cropH
      } = this.cropOption
      return {
        position: 'absolute',
        top: cropOffsetY + cropY + 'px',
        left: cropOffsetX + cropX + 'px',
        width: cropW + 'px',
        height: cropH + 'px',
        background: 'rgba(0,0,0,0.2)'
      }
    }
  },
  watch: {
    list () {
      const list = this.list || []
      let time = 0
      const self = this

      function dealImagePos () {
        if (list.length > 0) {
          list.forEach(item => {
            if (!item.high || !item.width) {
              const img = new Image()
              img.onload = function () {
                item.high = img.height
                item.width = img.width
              }
              img.src = item.path
            }
          })
          const $ref = self.$refs['preview-current']
          if ($ref && $ref.length > 0 && $ref[0].offsetHeight > 0) {
            $ref[0].scrollIntoView()
            setTimeout(() => {
              const height = document.body.offsetHeight + 1 - (document.documentElement['clientHeight'] + $ref[0].offsetTop)
              if (height > 0) {
                window.scroll(window.scrollX, window.scrollY - Math.min(height, 32))
              }
            }, 10)
          } else if (++time < 4) {
            setTimeout(dealImagePos, 30)
          }
        } else if (++time < 8) {
          setTimeout(dealImagePos, 30)
        }
      }

      dealImagePos()
    }
  },
  methods: {
    doScaleOut () {
      let scale = this.scale - Math.ceil(this.scale * 0.01) * 10
      if (scale < 25) {
        scale = 25
      }
      this.scale = scale
    },
    doScaleIn () {
      let scale = this.scale + Math.ceil(this.scale * 0.01) * 10
      if (scale > 1000) {
        scale = 1000
      }
      this.scale = scale
    },
    getHeight (item, width = document.body.offsetWidth) {
      return item.high / item.width * width
    },
    // 开始移动截图
    startMove (e) {
      if (this.isClip) {
        this.cropping = true
        this.cropped = false
        window.addEventListener('mousemove', this.createCrop)
        window.addEventListener('mouseup', this.endCrop)
        window.addEventListener('mouseleave', this.endCrop)
        this.cropOption.cropOffsetX = e.offsetX - e.clientX
        this.cropOption.cropOffsetY = e.offsetY - e.clientY
        this.cropOption.cropX = e.clientX
        this.cropOption.cropY = e.clientY
        this.cropOption.cropChangeX = this.cropOption.cropX
        this.cropOption.cropChangeY = this.cropOption.cropY
        this.cropOption.cropW = 0
        this.cropOption.cropH = 0
      }
    },
    // 创建截图区域
    createCrop (e) {
      e.preventDefault()
      let nowX = e.clientX
      let nowY = e.clientY
      if (nowX < 0) {
        nowX = 0
      }
      if (nowX > document.body.offsetWidth) {
        nowX = document.body.offsetWidth
      }
      if (nowY < 0) {
        nowY = 0
      }
      if (nowY > document.documentElement['clientHeight']) {
        nowY = document.documentElement['clientHeight']
      }
      this.$nextTick(() => {
        const fw = ~~(nowX - this.cropOption.cropChangeX)
        const fh = ~~(nowY - this.cropOption.cropChangeY)
        if (fw > 0) {
          this.cropOption.cropW = fw
          this.cropOption.cropX = this.cropOption.cropChangeX
        } else {
          this.cropOption.cropW = 0 - fw
          this.cropOption.cropX = nowX
        }
        if (fh > 0) {
          this.cropOption.cropH = fh
          this.cropOption.cropY = this.cropOption.cropChangeY
        } else {
          this.cropOption.cropH = 0 - fh
          this.cropOption.cropY = nowY
        }
      })
    },
    // 截图区域创建完成
    endCrop () {
      this.cropping = false
      if (this.cropOption.cropW !== 0 && this.cropOption.cropH !== 0) {
        this.cropped = true
      }
      window.removeEventListener('mousemove', this.createCrop)
      window.removeEventListener('mouseup', this.endCrop)
      window.removeEventListener('mouseleave', this.endCrop)
    },
    beginShot (type) {
      this.type = type
      this.isClip = true
    },
    endClip () {
      this.isClip = false
      this.cropping = false
      this.cropped = false
      this.cropOption.cropOffsetX = 0
      this.cropOption.cropOffsetY = 0
      this.cropOption.cropChangeX = 0
      this.cropOption.cropChangeY = 0
      this.cropOption.cropX = 0
      this.cropOption.cropY = 0
      this.cropOption.cropW = 0
      this.cropOption.cropH = 0
    },
    doClipSlot () {
      // 获取截图的图片
      const clipImageList = this.getImageListByClipPos()
      const canvas = document.createElement('canvas')
      const self = this
      canvas.width = self.cropOption.cropW
      canvas.style.cssText = `position: absolute; top: ${this.cropOption.cropOffsetY + this.cropOption.cropY - clipImageList.top}px; left: ${self.cropOption.cropX}px;`
      const list = clipImageList.list

      // 获取所有图片的高度
      function getAllImageHeight (list) {
        let h = 0
        list.forEach(item => {
          h += self.getHeight(item, document.body.offsetWidth * self.scale / 100) - item.top - item.bottom
        })
        return h
      }
      canvas.height = getAllImageHeight(list)
      const context = canvas.getContext('2d')

      list.forEach((item, idx) => {
        const img = this.$refs[`preview-${item.location}`][0]
        const rad = item.width / document.body.offsetWidth
        img.crossOrigin = 'Anonymous' // 解决跨域问题
        if (img.complete) {
          context.drawImage(
            img,
            self.cropOption.cropX * rad * 100 / self.scale,
            item.top * rad * 100 / self.scale,
            item.width,
            item.high,
            0,
            getAllImageHeight(list.slice(0, idx)),
            document.body.offsetWidth * self.scale / 100,
            self.getHeight(item) * self.scale / 100
          )
        } else {
          img.onload = function () {
            context.drawImage(
              img,
              self.cropOption.cropX * rad * self.scale / 100,
              item.top * rad * self.scale / 100,
              item.width,
              item.high,
              0,
              getAllImageHeight(list.slice(0, idx)),
              document.body.offsetWidth * self.scale / 100,
              self.getHeight(item) * self.scale / 100
            )
          }
        }
      })
      const dataURL = canvas.toDataURL('image/jpeg')
      this.endClip()
      this.$store.dispatch('getClipSlot', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          screenshot: dataURL,
          id: self.taskId,
          type: this.type || ''
        }
      }).then(data => {
        const type = this.type
        if (type === '1') {
          this.showClipQueryList(data, dataURL)
        } else {
          this.showClipData(data, dataURL)
        }
      })
    },
    // 根据截图的位置，找到是哪部分图片需要合并
    getImageListByClipPos () {
      const {
        cropOffsetY, cropY, cropH
      } = this.cropOption
      const list = this.list
      const top = cropOffsetY + cropY
      const bottom = top + cropH
      const tmpList = []
      let tmpPos = 0
      let marTop = 0
      const width = this.scale * document.body.offsetWidth / 100
      for (let i = 0, l = list.length; i < l; i++) {
        if (tmpPos > bottom) {
          break
        }
        tmpPos += this.getHeight(list[i], width)
        if (tmpPos < top) {
          tmpPos += 20 * this.scale / 100
          marTop = tmpPos
          continue
        }
        if (marTop < top && tmpPos > bottom) {
          tmpList.push({
            ...list[i],
            top: top - marTop,
            bottom: tmpPos - bottom
          })
        } else if (marTop < top) {
          tmpList.push({
            ...list[i],
            top: top - marTop,
            bottom: 0
          })
        } else if (tmpPos > bottom) {
          tmpList.push({
            ...list[i],
            top: 0,
            bottom: tmpPos - bottom
          })
        } else {
          tmpList.push({
            ...list[i],
            top: 0,
            bottom: 0
          })
        }
        tmpPos += 20 * this.scale / 100
        marTop = tmpPos
      }
      return {
        top: marTop,
        list: tmpList
      }
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
