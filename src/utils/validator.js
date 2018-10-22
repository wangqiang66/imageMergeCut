/**
 * function: 常用类型的校验
 * author  : wq
 * update  : 2018/5/29 16:40
 */

/**
 * @type {{name: function(*=): string, number: validator.number, int: function(): (*|string), tel: function(*=): (*|string)}}
 * 基本输入验证
 */
// 对于0等不是空

function isEmpty (data) {
  if (data === null || data === undefined || data === '') {
    return true
  }
  return false
}
const Date = window.Date
Date.prototype.format = function (fm) {
  var date = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'D+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S+': this.getMilliseconds()
  }
  if (/(y+|Y+)/i.test(fm)) {
    fm = fm.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(fm)) {
      fm = fm.replace(RegExp.$1, RegExp.$1.length === 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }
  return fm
}

/**
 * @type {{}}
 * 输入的时候验证，不格式化
 */
export const InputValidator = {
  // 验证数字， max 表示最大长度， min 表示最小长度
  tel (value, max, min, require = true) {
    if (!require && isEmpty(value)) {
      return true
    }
    const strValue = String(value)
    if ((min && strValue.length < min) || (max && strValue.length > max)) {
      return '长度有误'
    } else if (/[^\d]/.test(strValue)) {
      return '包含非法字符'
    }
    return true
  },
  datetime (value, max, min, require = true, format = 'YYYY/MM/DD hh:mm:ss') {
    if (!require && isEmpty(value)) {
      return true
    }
    const reg = new RegExp('^' + format.replace(/[YyMmDdHhSs]/g, '\\d').replace(/\//g, '(?:/|\\.|-)') + '$')
    const strValue = String(value)
    if (!reg.test(strValue)) {
      return '格式有误'
    } else {
      try {
        if (isNaN(new Date(strValue).getTime())) {
          return '格式有误'
        }
      } catch (e) {
        return '格式有误'
      }
    }

    max === '-1' && (max = new Date().format(format))
    if (max && strValue > max) {
      return '时间过大'
    }
    min === '-1' && (min = new Date().format(format))
    if (min && strValue < min) {
      return '时间过小'
    }
    return true
  },
  require (value) {
    if (isEmpty(value)) {
      return '必填'
    }
    return true
  },
  intNumber (value, max, min, require = true) {
    if (!require && isEmpty(value)) {
      return true
    }
    const strValue = String(value)
    let errMsg = {}
    let showErrorMsg = false
    let maxTip = false
    const reg = /^(?:0|[1-9][0-9]*)$/
    if (!reg.test(strValue)) {
      return '格式有误'
    }
    if (max.indexOf('#') === 0) {
      maxTip = true
      max = max.substring(1)
    }
    if (max && (Number(strValue) > Number(max))) {
      if (maxTip) {
        showErrorMsg = true
        errMsg = {
          msg: '超过最大值',
          maxValue: max
        }
      } else {
        return '超过最大值'
      }
    }
    if (min && (Number(strValue) < Number(min))) {
      return '低于最小值'
    }
    if (showErrorMsg) {
      return errMsg
    }
    return true
  },
  intPNNumber (value, max, min, require = true) {
    if (!require && isEmpty(value)) {
      return true
    }
    const reg = /^(?:0|-?[1-9][0-9]*)$/
    const strValue = String(value)
    if (!reg.test(strValue)) {
      return '格式有误'
    }
    if (max && (Number(strValue) > Number(max))) {
      return '超过最大值'
    }
    if (min && (Number(strValue) < Number(min))) {
      return '低于最小值'
    }
    return true
  },
  floatNumber (value, max, min, len, require = true) {
    if (!require && isEmpty(value)) {
      return true
    }
    const strValue = String(value)
    let reg
    if (len) {
      reg = new RegExp('^(?:0|[1-9][0-9]*)(?:\\.[0-9]{0,' + len + '})?$')
    } else {
      reg = /^(?:0|[1-9][0-9]*)(?:\.[0-9]*)?$/
    }
    if (!reg.test(strValue)) {
      return '格式有误'
    }
    if (max && (Number(strValue) > Number(max))) {
      return '超过最大值'
    }
    if (min && (Number(strValue) < Number(min))) {
      return '低于最小值'
    }
    return true
  },
}
