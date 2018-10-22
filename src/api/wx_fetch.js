/**
 * function: wx_fetch
 * author  : wq
 * update  : 2018/8/1 10:54
 */

class Fetch {
  defaults = {
    method: 'POST',
    dataType: 'json',
    responseType: 'text'
  }

  constructor () {
    this.init()
  }

  init () {
    // this.baseURL = basePath;
    this.addTimeout()
  }

  // 增加超时机制
  addTimeout () {
    const newFetch = (url, opts) => {
      const timeout = parseInt(opts.timeout) || this.defaults.timeout
      const oldFetch = (url, _opts) => {
        const header = _opts.headers || this.defaults.headers
        const method = _opts.method || this.defaults.method
        const dataType = _opts.dataType || this.defaults.dataType
        const responseType = _opts.responseType || this.defaults.responseType

        return new Promise(function (resolve, reject) {
          wx.request({
            url,
            header,
            method,
            dataType,
            responseType,
            success: (data) => {
              resolve(data)
            },
            fail: (data) => {
              reject(data)
            }
          })
        })
      }
      const timeoutPromise = new Promise(function (resolve, reject) {
        setTimeout(() => {
          oldFetch.abort()
          reject({
            code: '-001',
            msg: 'fetch timeout'
          })
        }, timeout)
      })
      return Promise.race([oldFetch, timeoutPromise])
    }
    this.fetch = (url, opts) => {
      return newFetch(url, opts)
    }
  }

  createInstance () {
    return new Fetch()
  }
}

export default new Fetch().fetch
