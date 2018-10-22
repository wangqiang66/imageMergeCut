/**
 * function: api 协议组件 协议返回promise 协议类型对于web采用fetch请求，不用第三方框架
 * 协议地址默认是用当前请求的相对地址
 * 参数
 * data: 协议请求的参数
 * cachedTime: 默认不进行缓存，需要进行缓存则需要传递缓存时间
 * author  : wq
 * update  : 2018/7/20 18:03
 */
import Header from './head'
import {isObject, isString, isFunction} from './utils'
import AppConfig from '@/config'
import Mock from './mock'
import fetch from './fetch'

const basePath = (() => {
  // return 'http://10.1.108.150:18400'
  if (process.env.NODE_ENV === 'development') {
    return 'http://10.1.108.150:18400'
  }
  return window.document.location.origin
})()

let layer = window.layer
if (layer) {
  (function getLayer () {
    if ((layer = window.layer)) {
      setTimeout(getLayer, 30)
    }
  }())
}
class Api {
  // 缓存请求返回数据
  data = {};
  // 协议发送拦截过滤
  throttleData = {};
  // 加载协议数量, 当加载协议的时候开始加载loading图标，协议完成的时候关闭loading图标的加载
  loadingNum = 0;
  // 业务类型：web 还是小程序 wx 还是weex
  mode = process.env.mode;
  // 组合的方式，将header的实例注入进来
  header = Header;
  // 实例默认设置
  defaults = {
    throttleTime: 0,
    cachedTime: 0,
    data: {},
    params: {},
    loading: true,
    defineErrorTip: false,
    timeout: 30000,
    transformRequest: function (data) {
      return data
    },
    transformResponse: function (data) {
      return data
    },
    errorMsg: function (msg) {
      return msg
    },
    filterResponse: function (url, opts, json) {
      // if (!json) return {}
      // if (json.code !== 0) {
      //   /**
      //    * 添加一些协议拦截处理
      //    */
      //   const Promise = window.Promise
      //   return Promise.reject({
      //     msg: json.message || '-006 服务器繁忙！',
      //     code: json.code,
      //     data: json.result
      //   })
      // }
      opts.cachedTime && this.sessionRequest((url + JSON.stringify(opts)), json.result, opts.cachedTime)
      return json
    },
    showToastErrorTip (msg) {

    }
  }

  // 创建新的实例
  createInstance () {
    return new Api()
  }

  // 构造函数
  constructor () {
    this.init()
  }

  // 数据初始化
  init () {
    this.requestMode = fetch
  }

  // 缓存协议 默认缓存60秒
  sessionRequest (key, result, sessionTime) {
    this.data[key] = {
      result: result,
      datetime: new Date().getTime(),
      sessionTime: (sessionTime || 5) * 60 * 1000
    }
  }

  // 清除缓存数据
  clearSessionRequest (key) {
    this.data[key] = null
    delete this.data[key]
  }

  // 显示加载框
  showLoading () {
    this.loader = layer && layer.load(1, {
      shade: [0.1, '#fff']
    })
  }

  // 关闭加载框
  closeLoading () {
    if (this.loader) {
      layer.close(this.loader)
      this.loader = null
    }
  }

  // 处理错误提示
  showErrorTip (err) {
    const msg = (err || {}).msg || '系统错误'
    layer && layer.toast(msg)
  }

  // 自定义协议请求方式
  defineRequest (func) {
    this.requestMode = func
  }

  // 发送请求
  sendRequest (url, opts) {
    // 如果url是对象，则表示url放在对象里面了
    if (isObject(url)) {
      opts = url
      url = opts.url
    }
    // 如果请求中要求防止抖动，一点时间内只能发送一点协议，则多余的协议则无效，被过滤
    if (this.judgeThrottleData(url, opts)) {
      return {
        then: function () {
        }
      }
    }
    // 如果请求缓存，并且请求在缓存有效期内，则从缓存中读取数据
    let result
    if ((result = this.judgeCache(url, opts))) {
      return new Promise((resolve, reject) => {
        resolve(result)
      })
    }
    // 加载框处理
    const loading = typeof opts.loading === 'undefined' ? this.defaults.loading : opts.loading
    if (loading !== false) {
      if (this.loadingNum === 0) {
        this.showLoading()
      }
      this.loadingNum += 1
    }
    // 处理参数，将参数加到url上面
    const params = opts.params
    const finalUrl = this.addParamsToUrl(url, params)

    // 处理headers的信息
    opts.headers = this.header.combinationHeader(opts.headers)
    // 单个函数应答拦截
    let filterResponse = opts.filterResponse
    if (filterResponse && isFunction(filterResponse)) {
      opts.filterResponse = null
      delete opts.filterResponse
    } else {
      filterResponse = this.defaults.filterResponse
    }
    // 自定义错误提示
    const defineErrorTip = opts.defineErrorTip
    const definedUrl = opts.definedUrl
    opts.definedUrl = undefined
    delete opts.definedUrl
    if (AppConfig.debug) {
      return new Promise((resolve, reject) => {
        resolve(Mock[definedUrl](opts))
      }).then(response => filterResponse.call(this, url, opts, response))
    }
    return this.requestMode(finalUrl, opts)
      .then(response => filterResponse.call(this, url, opts, response))
      .catch((error) => {
        if (!defineErrorTip) {
          this.defaults.showToastErrorTip(error)
        }
        return Promise.reject(error)
      })
      .finally(() => {
        if (loading !== false) {
          if (--this.loadingNum === 0) {
            this.closeLoading()
          }
        }
      })
  }

  // 添加对应的params参数到url上面
  addParamsToUrl (url, params) {
    let paramsStr = ''
    if (isObject(params) && Object.keys(params).length > 0) {
      // 处理params参数，将参数加到
      for (let key in params) {
        if (params[key] === undefined || params[key] === null || params[key] === '') {
          continue
        }
        paramsStr += key + '=' + encodeURIComponent(params[key]) + '&'
      }
      paramsStr = paramsStr.substring(0, paramsStr.length - 1)
    } else if (isString(params) && params !== '') {
      paramsStr = params
    }
    if (url.indexOf('?') > -1) {
      url += '&' + paramsStr
    }
    return this.getUrl(url)
  }

  /**
   * 判断缓存中是否发送过对应的请求，如果发送过则用对应的缓存数据
   * 如果没有设置缓存时间，或者缓存时间不是数字，则数据不会进行缓存
   * 缓存时间单位是分钟
   */
  judgeCache (url, opts) {
    const cTime = Number(opts.cachedTime)
    if (isNaN(cTime) || cTime <= 0) {
      return false
    }
    const time = cTime * 60 * 1000
    const params = url + JSON.stringify(opts)
    const data = this.data[params]
    if (data) {
      if ((new Date().getTime() - data.datetime) < time) {
        return data.result
      } else {
        // 过期的协议进行删除
        this.clearSessionRequest(params)
        return false
      }
    }
    return false
  }

  /**
   * 判断相同协议在1秒内是否多次发送，多次发送则只有第一次的发送数据成功，其他的都过滤掉
   * 缓存时间单位是秒钟
   */
  judgeThrottleData (url, opts) {
    const tTime = Number(opts.throttleTime)
    if (isNaN(tTime) || tTime <= 0) {
      return false
    } else {
      const time = tTime * 1000
      const params = url + JSON.stringify(opts)
      const data = this.throttleData[params]
      const curTime = new Date().getTime()
      if (data) {
        if ((curTime - data.datetime) < time) {
          return true
        } else {
          // 过期的协议进行删除
          this.throttleData[params].datetime = curTime
          return false
        }
      }
      this.throttleData[params] = {
        datetime: curTime
      }
    }
    return false
  }

  // 获取请求的地址
  getUrl (url) {
    if (/^(?:http|ftp|file|tcp|assets)s?:\/\//.test(url)) {
      return url
    }
    return basePath + url
  }
}

export default new Api()
