import * as Const from '@/tool/const.js'
import { message as AntMessage } from '@hwork/ant-design-vue'
import { container } from '@/main'

// 终端环境
export const terminalEnv = () => {
  const agent = navigator.userAgent
  if (!!agent.match(/AppleWebKit.*Electron.*/)) {
    return agent.includes('Hwork') ? 'desktop' : 'electron'
  }

  return 'web'
}

// 浏览器环境
export const webEnv = () => {
  return Const.IS_HWORK_QIANKUN ? 'qiankun' : 'normal'
}

// 定时器等待埋点对象初始化完成
export const waitBuriedPoint = () => {
  return new Promise((resolve) => {
    if (window.gio) {
      resolve()
    } else {
      const interval = setInterval(() => {
        if (window.gio) {
          clearInterval(interval)
          resolve()
        }
      }, 300)
    }
  })
}

// 删除Head下面所有Style标签
export const deleteStyleTag = (value) => {
  const styleList = document.querySelectorAll(`#${value} style`)
  for (let i = 0; i < styleList.length; i++) {
    if (styleList[i].tagName === 'STYLE') {
      styleList[i].remove()
    }
  }
}

// 获取用户权限 - 按钮
export const getHworkLimit = (assembly) => {
  return assembly || []
}

// 全局错误信息 - 封装 AntMessage，自动设置 appendTo
export const messageTip = (options) => {
  // 获取 appendTo 目标
  const appendTo = container ? container.querySelector(`#app`) : '#app'

  // 如果是字符串，转换为对象
  if (typeof options === 'string') {
    return AntMessage({
      message: options,
      grouping: true,
      appendTo
    })
  }

  // 如果是对象，合并配置
  const { message = '', ...args } = options || {}
  if (message) {
    return AntMessage({
      ...args,
      message,
      grouping: true,
      appendTo
    })
  }
}

// 快捷方法
messageTip.success = (message, options = {}) => {
  const appendTo = container ? container.querySelector(`#app`) : '#app'
  return AntMessage.success({
    message,
    grouping: true,
    appendTo,
    ...options
  })
}

messageTip.warning = (message, options = {}) => {
  const appendTo = container ? container.querySelector(`#app`) : '#app'
  return AntMessage.warning({
    message,
    grouping: true,
    appendTo,
    ...options
  })
}

messageTip.info = (message, options = {}) => {
  const appendTo = container ? container.querySelector(`#app`) : '#app'
  return AntMessage.info({
    message,
    grouping: true,
    appendTo,
    ...options
  })
}

messageTip.error = (message, options = {}) => {
  const appendTo = container ? container.querySelector(`#app`) : '#app'
  return AntMessage.error({
    message,
    grouping: true,
    appendTo,
    ...options
  })
}

// 关闭所有消息
messageTip.closeAll = () => {
  AntMessage.closeAll()
}

// 优先从 URL search 获取 access_token

const getTokenFromUrl = () => {
  // 从 query 参数获取
  const urlParams = new URLSearchParams(window.location.search)
  const queryToken = urlParams.get('access_token') || urlParams.get('token')
  if (queryToken && queryToken.trim()) {
    return queryToken.trim()
  }

  // 从 hash 获取 (OAuth 回调常用)
  const hash = window.location.hash.substring(1)
  const hashParams = new URLSearchParams(hash)
  const hashToken = hashParams.get('access_token') || hashParams.get('token')
  if (hashToken && hashToken.trim()) {
    return hashToken.trim()
  }
}
const urlToken = getTokenFromUrl()
if (urlToken) {
  localStorage.setItem('urlToken', urlToken)
}

export const hworkAppReadyApi = (callback) => {
  // 如果 jsbridge 已经注入则直接调用
  if (window.AlipayJSBridge) {
    if (callback) callback()
  } else {
    // 如果没有注入则监听注入的事件
    document.addEventListener('AlipayJSBridgeReady', callback, false)
  }
}

// 异步获取Hwork移动端token
export const getHworkMobileToken = () => {
  return new Promise((resolve) => {
    hworkAppReadyApi(() => {
      window.AlipayJSBridge.call('getToken', {}, (res) => {
        if ([200, 10000].includes(Number(res.code))) {
          resolve(res.data.access_token || '')
        } else {
          resolve('')
        }
      })
    })
  })
}

/**
 * 是否预览环境
 * @returns
 */
export const isPreviewEnv = () => {
  const hostname = window.location.hostname
  if (hostname.startsWith('preview-init--')) {
    return true
  }
}
/**
 * 获取 Token
 * 优先级：
 * 1. 地址栏：从 URL query 参数或 hash 中获取 access_token
 * 2. Hwork 环境：
 *    - Web 微前端：window.HworkJSApi.getToken() 同步返回字符串
 *    - Electron 桌面端：window.hwork.getToken() 异步返回 Promise
 *    - 移动端：window.AlipayJSBridge.call('getToken') 异步返回
 * 3. localStorage：从 hwork_iamAccessToken 或 token 获取
 * @returns {Promise<string>} 返回 token 字符串，获取失败返回空字符串
 */
export const getToken = async () => {
  // 1. 优先从地址栏获取 (支持 query 和 hash)
  // 预览环境逻辑
  if (typeof window !== 'undefined' && window.location) {
    if (urlToken) {
      return urlToken
    }
    if (isPreviewEnv()) {
      const savedUrlToken = localStorage.getItem('urlToken')
      if (savedUrlToken) {
        return savedUrlToken
      }
    }
  }

  // 2. Web 微前端：window.HworkJSApi.getToken() 同步
  if (window.HworkJSApi?.getToken) {
    try {
      const token = window.HworkJSApi.getToken()
      if (token && String(token).trim() !== '') {
        return String(token).trim()
      }
    } catch (error) {
      console.warn('从 Web 微前端获取 token 失败:', error)
    }
  }

  // 3. Electron 桌面端：window.hwork.getToken() 异步
  if (window?.__POWERED_BY_HWORK__ === true && window.hwork?.getToken) {
    try {
      const tokenData = await window.hwork.getToken()
      const token = tokenData?.accessToken || tokenData
      if (token && String(token).trim() !== '') {
        return String(token).trim()
      }
    } catch (error) {
      console.warn('从 Electron 桌面端获取 token 失败:', error)
    }
  }

  // 4. 移动端：window.AlipayJSBridge.call('getToken') 异步
  if (window.AlipayJSBridge) {
    try {
      const token = await getHworkMobileToken()
      if (token && String(token).trim() !== '') {
        return String(token).trim()
      }
    } catch (error) {
      console.warn('从移动端获取 token 失败:', error)
    }
  }

  // 5. 尝试从 localStorage 获取
  if (typeof localStorage !== 'undefined') {
    const localToken = localStorage.getItem('hwork_iamAccessToken') || localStorage.getItem('token')
    if (localToken && localToken.trim()) {
      return localToken.trim()
    }
  }

  // 所有方式都失败，返回空字符串
  return ''
}
