/**
 * function: 对协议head进行处理
 * author  : wq
 * update  : 2018/7/31 9:58
 */
import {isObject, isString, combinationObjectIgnoreCase} from './utils';

class Head {
  headers = {
    'Content-Type': 'application/json'
  }
  // 创建新的实例
  create () {
    return new Head ()
  }
  // 用于动态或者中途增加headers内容, 如果当前header里面存在忽略大小写的头部信息，则将这个头部信息替换
  addHeadContent (params, value) {
    // 如果params是一个对象，则表示，没有value，对象可能包含多个需要拆分
    if (isObject(params)) {
      Object.keys(params).forEach(item => {
        this.addHeadContent(item, params[item])
      })
      return false
    } else if (isString(params) && isString(value)) {
      const match = new RegExp('(' + params + ')(?:,|$)', 'i').match(Object.keys(this.headers).join(','))
      if (match) {
        this.headers[match[1]] = value
      } else {
        this.headers[params] = value
      }
    } else {
      // 填入的内容不合法，忽略
      throw new Error('add header params is error, please check')
    }
  }
  // 组合当前的headers和实例的headers形成一个新的headers进行返回, 因为head是大小写不敏感的，所以处理的时候需要合并不敏感的大小写数据
  combinationHeader (headers) {
    if (!isObject(headers) || Object.keys(headers).length <= 0) {
      return this.headers
    } else {
      return combinationObjectIgnoreCase(this.headers, headers)
    }
  }
}
export default new Head()
