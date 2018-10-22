/**
 * write by wangqiang 2018-03-30
 *
 * 协议拦截接口定义
 */
import DefineApi from './defined'
import AppConfig from '@/config'
import RequestObj from './api'

/**
 *
 * @type {{login: requestApi.login}}
 * options 参数和ajax方式一样
 *  method: "POST",  // (String) (GET | POST | PUT | PATCH | DELETE | HEAD, default: POST)
 *  headers: {},     // (Object) default: {}
 *  type: "JSON",    // (String) (json | jsonp | text, default: json)
 *  data: null       // (Object) default: null
 *  success：function// 成功处理方法（会将协议里面的data作为参数传入回掉函数中）
 *  error  ：function// 错误处理，默认进行了错误弹框处理，需要特殊处理的可以调用
 *  beforeSend：function 发送协议是做的处理，默认的是弹出加载请求处理中的旋转
 */
const requestApi = {
  requestOcrCreditInfo: (options) => {
    const url = DefineApi.get_ocr_credit_info.replace(/(?:\$\{([^}]+)\})/g, function (a, b) {
      if (AppConfig.debug) {
        return a
      }
      const params = options.innerParams || {}
      return params[b] || ''
    })
    options.innerParams = null
    delete options.innerParams

    return RequestObj.sendRequest(url, options)
  },
  queryExistReport: (options) => {
    const url = DefineApi.existReportNo.replace(/(?:\$\{([^}]+)\})/g, function (a, b) {
      if (AppConfig.debug) {
        return a
      }
      const params = options.innerParams || {}
      return params[b]
    })
    options.innerParams = null
    delete options.innerParams
    return RequestObj.sendRequest(url, options)
  },
  queryReportByTaskId: (options) => {
    const url = DefineApi.queryReportByNo.replace(/(?:\$\{([^}]+)\})/g, function (a, b) {
      if (AppConfig.debug) {
        return a
      }
      const params = options.innerParams || {}
      return params[b]
    })
    options.innerParams = null
    delete options.innerParams
    return RequestObj.sendRequest(url, options)
  },
  saveOcrCreditInfo: (options) => {
    const url = DefineApi.save_ocr_credit_info.replace(/(?:\$\{([^}]+)\})/g, function (a, b) {
      const params = options.innerParams || {}
      return params[b]
    })
    options.innerParams = null
    delete options.innerParams
    return RequestObj.sendRequest(url, options)
  },
  sumbitOcrCreditInfo: (options) => {
    const url = DefineApi.submit_ocr_credit_info.replace(/(?:\$\{([^}]+)\})/g, function (a, b) {
      const params = options.innerParams || {}
      return params[b]
    })
    options.innerParams = null
    delete options.innerParams
    return RequestObj.sendRequest(url, options)
  },
  // 获取图片信息
  getImageList: (options) => {
    const url = DefineApi.get_img_list.replace(/(?:\$\{([^}]+)\})/g, function (a, b) {
      const params = options.innerParams || {}
      return params[b]
    })
    options.innerParams = null
    delete options.innerParams
    return RequestObj.sendRequest(url, {...options, definedUrl: DefineApi.get_img_list})
  },
  // 截图识别
  getClipSlot: (options) => {
    const url = DefineApi.clip_slot.replace(/(?:\$\{([^}]+)\})/g, function (a, b) {
      const params = options.innerParams || {}
      return params[b]
    })
    options.innerParams = null
    delete options.innerParams
    return RequestObj.sendRequest(url, {...options, definedUrl: DefineApi.clip_slot})
  }
}

export default requestApi
