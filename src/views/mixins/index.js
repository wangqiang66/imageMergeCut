/**
 * function: index
 * author  : wq
 * update  : 2018/8/20 17:06
 */
import {InputValidator} from '@/utils/validator'
import {globalFirstErrorData} from '@/utils/common'
import {dealErrorsMsg} from '@/utils/globalParams'
const timeTip = 3000
export default {
  methods: {
    // 请求列表
    validateInput (dataList, configList, bool = false, tipLabel = 'input-', block) {
      const config = configList || []
      const dataItem = dataList || {}
      let valid = true
      let isFirst = globalFirstErrorData.getData()
      config.forEach(item => {
        item.forEach(itm => {
          if (itm.valid) {
            const args = itm.valid.split(',')
            const name = args[0]
            try {
              const value = dataItem[itm.key]
              if (bool || value) {
                let tmpValue = InputValidator[name](value, ...args.slice(1))
                if (typeof tmpValue === 'object') {
                  let node = this.$refs[tipLabel + itm.key]
                  if (Array.isArray(node)) {
                    node = node[0]
                  }
                  dealErrorsMsg.push({
                    ...tmpValue,
                    ref: node,
                    value,
                    block,
                    ...itm
                  })
                  tmpValue = true
                }
                if (tmpValue !== true) {
                  let node = this.$refs[tipLabel + itm.key]
                  if (Array.isArray(node)) {
                    node = node[0]
                  }
                  try {
                    if (isFirst) {
                      globalFirstErrorData.setData(isFirst = false)
                      node.scrollIntoView()
                    }
                  } catch (e) {
                  }
                  valid = false
                  const layer = window.layer
                  layer.tips(tmpValue, node, {
                    tipsMore: true,
                    tips: 3,
                    time: timeTip
                  })
                }
              }
            } catch (e) {
              console.log(`没有实现${this.format}类型的格式化`, itm)
            }
          }
        })
      })
      return valid
    },
    validateInputList (dataList, configList, bool = false, tipLabel = 'input-', block) {
      const config = configList || []
      const datalist = dataList || []
      let valid = true
      let isFirst = globalFirstErrorData.getData()
      datalist.forEach((dataItem, index) => {
        config.forEach(itm => {
          if (itm.valid) {
            const args = itm.valid.split(',')
            const name = args[0]
            try {
              const value = dataItem[itm.key]
              if (bool || value) {
                let tmpValue = InputValidator[name](value, ...args.slice(1))
                if (typeof tmpValue === 'object') {
                  let node = this.$refs[tipLabel + dataItem.id + '-' + itm.key]
                  if (Array.isArray(node)) {
                    node = node[0]
                  }
                  dealErrorsMsg.push({
                    ...tmpValue,
                    ref: node,
                    value,
                    block: `${block}${index + 1}`,
                    ...itm
                  })
                  tmpValue = true
                }
                if (tmpValue !== true) {
                  let node = this.$refs[tipLabel + dataItem.id + '-' + itm.key]
                  if (Array.isArray(node)) {
                    node = node[0]
                  }
                  try {
                    if (isFirst) {
                      globalFirstErrorData.setData(isFirst = false)
                      node.scrollIntoView()
                    }
                  } catch (e) {
                  }
                  valid = false
                  const layer = window.layer
                  layer.tips(tmpValue, node, {
                    tipsMore: true,
                    tips: 3,
                    time: timeTip
                  })
                }
              }
            } catch (e) {
              console.log(`没有实现${this.format}类型的格式化`, itm)
            }
          }
        })
      })
      return valid
    },
    validateInputConfigList (dataList, configList, bool = false, tipLabel = 'input-', block) {
      const config = configList || []
      const datalist = dataList || []
      let valid = true
      let isFirst = globalFirstErrorData.getData()
      datalist.forEach((dataItem, index) => {
        config.forEach(configItem => {
          configItem.forEach(itm => {
            if (itm.valid) {
              const args = itm.valid.split(',')
              const name = args[0]
              try {
                const value = dataItem[itm.key]
                if (bool || value) {
                  let tmpValue = InputValidator[name](value, ...args.slice(1))
                  if (typeof tmpValue === 'object') {
                    let node = this.$refs[tipLabel + dataItem.id + '-' + itm.key]
                    if (Array.isArray(node)) {
                      node = node[0]
                    }
                    dealErrorsMsg.push({
                      ...tmpValue,
                      ref: node,
                      value,
                      block: `${block}${index + 1}`,
                      ...itm
                    })
                    tmpValue = true
                  }
                  if (tmpValue !== true) {
                    let node = this.$refs[tipLabel + dataItem.id + '-' + itm.key]
                    if (Array.isArray(node)) {
                      node = node[0]
                    }
                    try {
                      if (isFirst) {
                        globalFirstErrorData.setData(isFirst = false)
                        node.scrollIntoView()
                      }
                    } catch (e) {
                    }
                    valid = false
                    const layer = window.layer
                    layer.tips(tmpValue, node, {
                      tipsMore: true,
                      tips: 3,
                      time: timeTip
                    })
                  }
                }
              } catch (e) {
                console.log(`没有实现${this.format}类型的格式化`, itm)
              }
            }
          })
        })
      })
      return valid
    },
    validErrorTips (refName, tmpValue) {
      let node = this.$refs[refName]
      let isFirst = globalFirstErrorData.getData()
      if (Array.isArray(node)) {
        node = node[0]
      }
      try {
        if (isFirst) {
          globalFirstErrorData.setData(isFirst = false)
          node.scrollIntoView()
        }
      } catch (e) {
      }
      const layer = window.layer
      layer.tips(tmpValue, node, {
        tipsMore: true,
        tips: 3,
        time: timeTip
      })
    }
  }
}
