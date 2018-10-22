/**
 * function: formatInput
 * author  : wq
 * update  : 2018/8/16 10:21
 */
const Number = window.Number
Number.prototype.formatNumber = function (n = 2, replace = '--') {
  const data = Number(this)
  if (isNaN(data)) {
    return replace
  }
  // 处理toFixed方法处理双精度浮点数据的缺陷，对此要求后台返回的数据小数点的位数不能超过我们加的这个数的位数
  const tmpData = data + 0.000000000001
  return tmpData.toFixed(n)
}

const isString = function (value) {
  return typeof value === 'string'
}

export const InputFormat = {
  // 格式化成id类型的数字
  tel (value, n, symbol = ' ') {
    if (!isString(value)) {
      return ''
    }
    const reg = /[^\d]/g
    let tmpValue = value.replace(reg, '')
    if (n && !isNaN(Number(n))) {
      const forReg = new RegExp('([\\d]{' + n + '})', 'g')
      tmpValue = tmpValue.replace(forReg, '$1' + symbol)
    }
    return tmpValue
  },
  money (number, places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2
    symbol = symbol !== undefined ? symbol : ''
    thousand = thousand || ','
    decimal = decimal || '.'
    let j
    let negative = number < 0 ? '-' : ''
    let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
    j = (j = i.length) > 3 ? j % 3 : 0
    return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
  },
  intMoney (number, places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2
    symbol = symbol !== undefined ? symbol : ''
    thousand = thousand || ','
    decimal = decimal || '.'
    let j
    let negative = number < 0 ? '-' : ''
    let i = parseInt(Math.abs(+number || 0), 10) + ''
    if (i === '0') {
      return number
    }
    let floatNumber = ''
    const hasDot = String(number).indexOf('.') > -1
    if (hasDot) {
      floatNumber = decimal + String(number).split('.')[1]
    }
    j = (j = i.length) > 3 ? j % 3 : 0
    return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + floatNumber
  },
  intNumber (value, max, min) {
    if (!isString(value)) {
      return ''
    }
    const reg = /[^\d]/g
    let tmpValue = value.replace(reg, '').replace(/^(00+)/, '0')
    if (max && (Number(tmpValue) > Number(max))) {
      tmpValue = max
    }
    return tmpValue
  },
  intPNNumber (value, max, min) {
    if (!isString(value)) {
      return ''
    }
    const reg = /[^\d-]/g
    let tmpValue = value.replace(reg, '').replace(/(\d)-+/, '$1').replace(/^(00+)/, '0')
    // if (max && (Number(tmpValue) > Number(max))) {
    //   tmpValue = max
    // }
    return tmpValue
  },
  floatNumber (value, max, len) {
    if (!isString(value)) {
      return ''
    }
    const reg = /[^\d.]/g
    let tmpValue = value.replace(reg, '').replace(/^(00+)/, '0').replace(/(\.\d*)\./g, '$1')
    const dotIndex = tmpValue.indexOf('.')
    if (dotIndex > -1 && (len)) {
      tmpValue = tmpValue.substring(0, dotIndex + Number(len) + 1)
    }
    if (max && (Number(tmpValue) > Number(max))) {
      tmpValue = max
    }
    return tmpValue
  },
  state24 (value, len) {
    const reg = /[^/*NDZCG#1234567]/g
    let tmpValue = value.toLocaleUpperCase().replace(reg, '')
    if (len && tmpValue.length > len) {
      tmpValue = tmpValue.substring(0, len)
    }
    return tmpValue
  }
}
