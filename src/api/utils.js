/**
 * function: utils
 * author  : wq
 * update  : 2018/7/31 10:00
 */

export const isObject = function(param) {
  return 'object' === typeof param;
}

export const isString = function(param) {
  return 'string' === typeof param;
}

export const isFunction = function(param) {
  return 'function' === typeof param;
}

// 合并
export const combinationObjectIgnoreCase = function(args1, args2, ...args) {
  const list = [].slice.call(arguments);
  if (list.length < 1) {
    return {};
  }
  if (list.length === 1) {
    return args1;
  } else {
    const splits = ",";
    const key1 = Object.keys(args1).join(splits);
    const key2 = Object.keys(args2);
    const obj = Object.assign({}, args2);
    const key1StrArray = key1.replace(new RegExp('(^|' + splits + ')' + key2.join("|"), 'ig'), "$1").split(splits);
    for (let i = 0, l = key1StrArray.length; i < l; i++) {
      if (key1StrArray[i] && args1[key1StrArray[i]]) {
        obj[key1StrArray[i]] = args1[key1StrArray[i]];
      }
    }
    return combinationObjectIgnoreCase(obj, ...args);
  }
}
