/**
 * function: common
 * author  : wq
 * update  : 2018/8/15 9:49
 */
export const switchObjectToArray = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('switchObjectToArray function params is not object')
  }
  return Object.keys(obj).map(key => {
    return Object.assign({}, obj[key], { key })
  }).sort((itm1, itm2) => itm1.sort - itm2.sort)
}

export const discToPick = (arr) => {
  if (!Array.isArray(arr)) {
    return []
  }
  return arr.map((item) => ({
    value: Object.keys(item)[0],
    label: Object.values(item)[0]
  }))
}

export const getQueryStr = function (str, addr) {
  const rs = new RegExp('(^|\\?|\\&)' + str + '=([^&#]*)(#|&|$)', 'gi').exec(addr || String(window.document.location.href))
  let tmp
  if ((tmp = rs)) {
    return tmp[2]
  }
  return ''
}

export const globalFirstErrorData = (function () {
  let isFirst = true
  return {
    getData () {
      return isFirst
    },
    setData (data) {
      isFirst = data
    }
  }
}())
