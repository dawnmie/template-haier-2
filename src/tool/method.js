// 设置或更新url参数
// 例：updateQueryParam(item.componentUrl, '_hwork_timestamp', Date.now())
export const updateQueryParam = (url, key, value) => {
  if (!value) {
    return url
  }

  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
  const separator = url.indexOf('?') !== -1 ? '&' : '?'

  if (url.match(re)) {
    return url.replace(re, '$1' + key + '=' + value + '$2')
  }

  return url + separator + key + '=' + value
}

// 自增版本
export const autoAddVersion = (data) => {
  const maxVersion = data.replace(/v|V/g, '') // v99.99.99
  let newMax = ''
  const oldVersionArr = maxVersion.split('.')
  const oldV_1 = +oldVersionArr[0]
  const oldV_2 = +oldVersionArr[1]
  const oldV_3 = +oldVersionArr[2]
  if (oldV_3 < 99) {
    newMax = oldV_1 + '.' + oldV_2 + '.' + (oldV_3 + 1)
  } else if (oldV_2 < 99) {
    newMax = oldV_1 + '.' + (oldV_2 + 1) + '.' + 0
  } else if (oldV_1 < 99) {
    newMax = oldV_1 + 1 + '.' + 0 + '.' + 0
  } else {
    newMax = '99.99.99'
  }
  return newMax
}

// url是否有效
export const isUrl = (url) => {
  const reg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return reg.test(url)
}

export const recordLog = (type, ...args) => {
  const isDev = import.meta.env.VITE_TARGET_ENV === 'development'
  if (isDev) {
    console[type] && console[type](...args);
  }
}

// 获取url的相关参数
export const parseUrl = (url) => {
  const a = document.createElement('a')
  a.href = url

  return {
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [undefined, ''])[1], // eslint-disable-line no-useless-escape
    hash: a.hash.replace('#', ''),
    hashArr: a.hash.replace('#', '').split('/'),
    host: a.hostname,
    params: (function () {
      const ret = {}
      const seg = a.search.replace(/^\?/, '').split('&')
      let s
      for (let i = 0; i < seg.length; i++) {
        if (!seg[i]) { continue; }
        s = seg[i].split('=')
        ret[s[0]] = s[1]
      }
      return ret
    })(),
    path: a.pathname.replace(/^([^\/])/, '/$1'), // eslint-disable-line no-useless-escape
    port: a.port,
    protocol: a.protocol.replace(':', ''),
    query: a.search,
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [undefined, ''])[1], // eslint-disable-line no-useless-escape
    segments: a.pathname.replace(/^\//, '').split('/'),
    source: url
  }
}

// 年月日 时分秒
export const formatDate = function(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

// 冻结对象
function deepFreeze(obj) {
  if (!obj || typeof obj !== 'object') {
    return
  }

  // 获取对象的属性名
  // const propNames = Reflect.ownKeys(obj)
  const propNames = Object.getOwnPropertyNames(obj)

  // 冻结自身前先冻结属性
  for (const name of propNames) {
    const value = obj[name]

    if ((value && typeof value === 'object') || typeof value === 'function') {
      deepFreeze(value)
    }
  }

  return Object.freeze(obj)
}

// 冻结window下的变量
export function freezeObjProp(obj, prop) {
  deepFreeze(obj[prop])
  Object.defineProperty(obj, prop, {
    configurable: false,
    writable: false
  })
}
