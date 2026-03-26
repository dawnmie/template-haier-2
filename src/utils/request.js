import axios from 'axios'
import { messageTip } from '@/tool/tool'
import throttle from 'lodash.throttle'
import * as Tool from '@/tool/tool.js'
import { globals } from '../main'
import * as Const from '@/tool/const.js'

const HWORK_URL = import.meta.env.VITE_HWORK_URL
const HWORK_INTERNAL = import.meta.env.VITE_HWORK_INTERNAL

const service = axios.create({
  baseURL: HWORK_URL,
  timeout: 180 * 1000
})

const error2Message = throttle(error => {
  let message = ''
  if (Const.HWORK_DOMAIN_INNER_ARR.includes(error?.config?.baseURL)) {
    return
  }

  if (error.code === 'ERR_NETWORK' || (error.message || '').toLowerCase() === 'network error') {
    message = '网络不可用'
  } else if (error.response?.status === 400) {
    message = '请求错误'
  } else if ([401, 403].includes(error.response?.status)) {
    message = '登录失效'
  } else if (error.response?.status === 404) {
    message = '请求地址错误'
  } else {
    message = '系统异常'
  }

  if (message) {
    if (Const.IS_NEW_DESKTOP) {
      window?.hwork?.showToast({
        type: 'error',
        content: message
      })
    } else {
      messageTip.error({ message })
    }
  }
}, 3000)

service.interceptors.request.use(
  async config => {
    if (config.needRefreshToken && window?.hwork?.getToken) {
      const obj = await window.hwork.getToken(config.needRefreshToken)
      console.log('401第二次获取', obj);
    }
    const hworkToken = hworkJSApi?.getToken()

    if (hworkToken) {
      config.headers.Authorization = 'Bearer ' + hworkToken
    }
    if (config.limit) {
      config.headers.ignoreTip = true
    }

    if (config.params?.hwork) {
      config.baseURL = HWORK_URL
      delete config.params.hwork
    } else if (config.data?.hwork) {
      config.baseURL = HWORK_URL
      delete config.data.hwork
    } else if (config.params?.internal) {
      config.baseURL = HWORK_INTERNAL
      delete config.params.internal
    } else if (config.data?.internal) {
      config.baseURL = HWORK_INTERNAL
      delete config.data.internal
    } else if (config.data?.refreshToken) {
      config.baseURL = HWORK_URL
      config.headers.Authorization = 'Bearer ' + config.data.refreshToken
      delete config.data.refreshToken
    }

    if (config.params?.extraHeader) { // 部分接口有额外的请求头，如强通知ejectIKnow
      config.headers[config.params.extraHeader] = config.params?.extraHeaderVal
      delete config.params.extraHeader;
      delete config.params.extraHeaderVal;
    }

    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (Tool.webEnv() === 'qiankun') {
      if (response.config.responseType === 'blob') {
        return response
      }
      return res
    }
    if (res.code === 40001 || res.code === 900 || res.code === 20203 || res.code === 15000) {
      handle_401(res.msg || res.message || 'Error')
    } else if (res.code && res.code !== 10000 && res.code !== 10001 && res.code !== 200 && res.code !== 1 && !response.config.headers.ignoreTip && !res.success) {
      if (Const.IS_NEW_DESKTOP) {
        window?.hwork?.showToast({
          type: 'error',
          content: res.msg || res.message || 'Error'
        })
      } else {
        messageTip({
          message: res.msg || res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || res.message || 'Error'))
    } else {
      return res
    }
  },
  async (error) => {
    if (error.response?.status === 401) {
      if (Const.IS_NEW_DESKTOP) {
        await newDesktop_401(error)
      } else {
        handle_401(error)
      }
    } else {
      error2Message(error)
    }

    return Promise.reject(error)
  }
)

function handle_401 (error) {
  let errMsg = ''

  if (typeof error === 'string') {
    errMsg = error
  } else {
    errMsg = error?.response?.data?.message || '请重新登录'
  }

  localStorage.removeItem('hwork_token')

  if (Tool.terminalEnv() === 'web') {
    error2Message(error)
    if (Tool.webEnv() === 'qiankun') {
      // 跳转qiankun主应用登录页
      localStorage.removeItem('token')
      rememberFrom()
      globals.$mainAppRouter.push('/register')
    } else {
      // todo
    }
  } else { // 跳转到桌面端的登录页，不显示报错提示
    window?.ipcMethod?.jumpToLogin({
      errMsg,
      aimPath: '/home/workbench'
    })
  }
}

async function newDesktop_401 (error) {
  console.log('token已过期');
  if (!error.config.needRefreshToken) {
    return service({
      ...error.config,
      needRefreshToken: true
    });
  }
  return Promise.reject(new Error(error?.data?.message || ''));
}

function rememberFrom () {
  const { pathname, href } = window.location
  const list = ['/', '/register']
  if (list.indexOf(pathname) === -1) {
    localStorage.setItem('from_href', href)
  }
}

export default service
