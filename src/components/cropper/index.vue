<!--
  function: index
  author  : wq
  update  : 2018/10/17 9:34
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
              <slot name="btn">
                <button @click.stop="doClipSlot">确定</button>
                <button @click="endClip">取消</button>
              </slot>
            </div>
            <div v-if="cropped">
              <span class="crop-line line-w" @mousedown.stop="changeCropSize($event, false, true, 0, 1)" @touchstart="changeCropSize($event, false, true, 0, 1)"></span>
              <span class="crop-line line-a" @mousedown.stop="changeCropSize($event, true, false, 1, 0)" @touchstart="changeCropSize($event, true, false, 1, 0)"></span>
              <span class="crop-line line-s" @mousedown.stop="changeCropSize($event, false, true, 0, 2)" @touchstart="changeCropSize($event, false, true, 0, 2)"></span>
              <span class="crop-line line-d" @mousedown.stop="changeCropSize($event, true, false, 2, 0)" @touchstart="changeCropSize($event, true, false, 2, 0)"></span>
              <span class="crop-point point1" @mousedown.stop="changeCropSize($event, true, true, 1, 1)" @touchstart="changeCropSize($event, true, true, 1, 1)"></span>
              <span class="crop-point point2" @mousedown.stop="changeCropSize($event, false, true, 0, 1)" @touchstart="changeCropSize($event, false, true, 0, 1)"></span>
              <span class="crop-point point3" @mousedown.stop="changeCropSize($event, true, true, 2, 1)" @touchstart="changeCropSize($event, true, true, 2, 1)"></span>
              <span class="crop-point point4" @mousedown.stop="changeCropSize($event, true, false, 1, 0)" @touchstart="changeCropSize($event, true, false, 1, 0)"></span>
              <span class="crop-point point5" @mousedown.stop="changeCropSize($event, true, false, 2, 0)" @touchstart="changeCropSize($event, true, false, 2, 0)"></span>
              <span class="crop-point point6" @mousedown.stop="changeCropSize($event, true, true, 1, 2)" @touchstart="changeCropSize($event, true, true, 1, 2)"></span>
              <span class="crop-point point7" @mousedown.stop="changeCropSize($event, false, true, 0, 2)" @touchstart="changeCropSize($event, false, true, 0, 2)"></span>
              <span class="crop-point point8" @mousedown.stop="changeCropSize($event, true, true, 2, 2)" @touchstart="changeCropSize($event, true, true, 2, 2)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    isClip: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'isClip'
  },
  data () {
    return {
      scale: 100,
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
      }
    }
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
    endClip () {
      this.$emit('input', false)
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
      this.$emit('doneClipImage', dataURL)
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
    // 改变截图框大小
    changeCropSize (e, canChangeW, canChangeH, typeW, typeH) {
      e.preventDefault()
      window.addEventListener('mousemove', this.changeCropNow)
      window.addEventListener('mouseup', this.changeCropEnd)
      window.addEventListener('touchmove', this.changeCropNow)
      window.addEventListener('touchend', this.changeCropEnd)
      this.cropOption.canChangeW = canChangeW
      this.cropOption.canChangeH = canChangeH
      // 0: 表示不是该位置， 1： 表示上或者左 2： 表示下或者右
      this.cropOption.changeXType = typeW
      this.cropOption.changeYType = typeH
      if (canChangeW && typeW !== 0) {
        // 拉动的是上面的线或者点
        // 偏移X位置
        const nowX = e.clientX ? e.clientX : e.touches ? e.touches[0].clientX : 0
        const cropX = this.cropOption.cropX
        const cropW = this.cropOption.cropW
        if (typeW === 1) {
          this.cropOption.deviationX = nowX - cropX
          this.cropOption.cropChangeX = cropX + cropW
        } else if (typeW === 2) {
          this.cropOption.deviationX = nowX - cropX - cropW
          this.cropOption.cropChangeX = cropX
        }
      }
      if (canChangeH && typeH !== 0) {
        let nowY = e.clientY ? e.clientY : e.touches ? e.touches[0].clientY : 0
        const cropY = this.cropOption.cropY
        const cropH = this.cropOption.cropH
        if (typeH === 1) {
          this.cropOption.deviationY = nowY - cropY
          this.cropOption.cropChangeY = cropY + cropH
        } else if (typeH === 2) {
          this.cropOption.deviationY = nowY - cropY - cropH
          this.cropOption.cropChangeY = cropY
        }
      }
    },
    // 正在改变
    changeCropNow (e) {
      e.preventDefault()
      // 容器的宽高
      this.$nextTick(() => {
        if (this.cropOption.canChangeW && this.cropOption.changeXType !== 0) {
          const deviationX = this.cropOption.deviationX
          let nowX = e.clientX ? e.clientX : e.touches ? e.touches[0].clientX : 0
          if (nowX < 0) {
            nowX = 0
          }
          if (nowX > document.body.offsetWidth) {
            nowX = document.body.offsetWidth
          }
          nowX = nowX - deviationX
          const fw = ~~(nowX - this.cropOption.cropChangeX)
          if (fw > 0) {
            this.cropOption.cropW = fw
            this.cropOption.cropX = this.cropOption.cropChangeX
          } else {
            this.cropOption.cropW = 0 - fw
            this.cropOption.cropX = nowX
          }
        }
        if (this.cropOption.canChangeH && this.cropOption.changeYType !== 0) {
          const deviationY = this.cropOption.deviationY
          let nowY = e.clientY ? e.clientY : e.touches ? e.touches[0].clientY : 0
          if (nowY < 0) {
            nowY = 0
          }
          if (nowY > document.documentElement['clientHeight']) {
            nowY = document.documentElement['clientHeight']
          }
          nowY = nowY - deviationY
          const fh = ~~(nowY - this.cropOption.cropChangeY)
          if (fh > 0) {
            this.cropOption.cropH = fh
            this.cropOption.cropY = this.cropOption.cropChangeY
          } else {
            this.cropOption.cropH = 0 - fh
            this.cropOption.cropY = nowY
          }
        }
      })
    },
    // 结束改变
    changeCropEnd (e) {
      window.removeEventListener('mousemove', this.changeCropNow)
      window.removeEventListener('mouseup', this.changeCropEnd)
      window.removeEventListener('touchmove', this.changeCropNow)
      window.removeEventListener('touchend', this.changeCropEnd)
    }
  }
}
</script>

<style scoped>
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
    background-image: url(../../images/texture.png), linear-gradient(hsla(0, 0%, 32%, .99), hsla(0, 0%, 27%, .95));
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
    content: url(../../images/toolbarButton-zoomOut.png);
  }

  .toolbarButton.zoomIn:before {
    position: absolute;
    display: inline-block;
    top: 4px;
    left: 7px;
    content: url(../../images/toolbarButton-zoomIn.png);
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

  /** 切图的拉动 **/
  .crop-line {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0.1;
  }
  .line-w {
    top: -3px;
    left: 0;
    height: 5px;
    cursor: n-resize;
  }
  .line-a {
    top: 0;
    left: -3px;
    width: 5px;
    cursor: w-resize;
  }
  .line-s {
    bottom: -3px;
    left: 0;
    height: 5px;
    cursor: s-resize;
  }
  .line-d {
    top: 0;
    right: -3px;
    width: 5px;
    cursor: e-resize;
  }
  .crop-point {
    position: absolute;
    width: 8px;
    height: 8px;
    opacity: 0.75;
    background-color: #39f;
    border-radius: 100%;
  }
  .point1 {
    top: -4px;
    left: -4px;
    cursor: nw-resize;
  }
  .point2 {
    top: -5px;
    left: 50%;
    margin-left: -3px;
    cursor: n-resize;
  }
  .point3 {
    top: -4px;
    right: -4px;
    cursor: ne-resize;
  }
  .point4 {
    top: 50%;
    left: -4px;
    margin-top: -3px;
    cursor: w-resize;
  }
  .point5 {
    top: 50%;
    right: -4px;
    margin-top: -3px;
    cursor: w-resize;
  }
  .point6 {
    bottom: -5px;
    left: -4px;
    cursor: sw-resize;
  }
  .point7 {
    bottom: -5px;
    left: 50%;
    margin-left: -3px;
    cursor: s-resize;
  }
  .point8 {
    bottom: -5px;
    right: -4px;
    cursor: se-resize;
  }
  @media screen and (max-width: 500px) {
    .crop-point {
      position: absolute;
      width: 20px;
      height: 20px;
      opacity: 0.45;
      background-color: #39f;
      border-radius: 100%;
    }
    .point1 {
      top: -10px;
      left: -10px;
    }
    .point2,
    .point4,
    .point5,
    .point7 {
      display: none;
    }
    .point3 {
      top: -10px;
      right: -10px;
    }
    .point4 {
      top: 0;
      left: 0;
    }
    .point6 {
      bottom: -10px;
      left: -10px;
    }
    .point8 {
      bottom: -10px;
      right: -10px;
    }
  }
</style>
