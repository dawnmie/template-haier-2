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
