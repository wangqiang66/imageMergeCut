/**
 * function: globalParams
 * author  : wq
 * update  : 2018/9/13 16:13
 */

// 错误消息保存
const errors = []
export const dealErrorsMsg = {
  push (msg) {
    errors.push(msg)
  },
  get () {
    return errors
  },
  clear () {
    errors.splice(0, errors.length)
  }
}
