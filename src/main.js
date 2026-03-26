import * as vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import '@/styles/iconfont/iconfont.css'
import 'ant-design-vue/dist/reset.css'
import { renderWithQiankun } from 'vite-plugin-qiankun/dist/helper';

const name = import.meta.env.VITE_SUB_APP_NAME
import * as Tool from '@/tool/tool.js'
import * as Const from '@/tool/const.js'
import { setHworkJSApi } from '@/services/hwork-context.js'
import pinia, { userStore } from '@/pinia'
import WujieVue from 'wujie-vue3';
// 引入国际化
import { createI18nInstance } from '@/tool/i18n'

let app = null
let globals = null
let hworkJSApi = null
let container = null
let EventEmitter = null
const i18n = createI18nInstance()

const userInfoStore = userStore()

function render(props) {
  console.log('props', props);
  app = vue.createApp(App);
  createDefaultApp(props)

  hworkJSApi = props?.HworkJSApi
  setHworkJSApi(hworkJSApi ?? (typeof window !== 'undefined' ? window.hwork : null))
  container = props?.container
  EventEmitter = props?.EventEmitter

  if (props?.EventEmitter) {
    props.EventEmitter.on('main.changeLanguage', (languageCode = '', languagePacks = null) => {
      if (languageCode && languagePacks) {
        // 语言编码切换 更新语言编码与语言包
      }
    })
  }

  // 跳转其他子应用页面
  if (props?.mainAppRouter) {
    app.provide('$mainAppRouter', props.mainAppRouter)
    app.config.globalProperties.$mainAppRouter = props.mainAppRouter
  }

  // 获取内外网状态
  if (props?.getInternalNetwork) {
    app.provide('$getInternalNetwork', props.getInternalNetwork)
    app.config.globalProperties.$getInternalNetwork = props.getInternalNetwork
  }

  // 用户信息
  if (props?.userInfo) {
    userInfoStore.$patch({
      userInfo: props.userInfo
    })
  }

  // iamToken
  if (props?.iamToken) {
    localStorage.setItem('hwork_iamAccessToken', props.iamToken)
  }

  // 按钮权限
  if (props?.limitsList) {
    app.provide('$limitsList', props.limitsList)
  }

  app.mount(props?.container ? (props?.container.querySelector('#app')) : '#app');
}
if (!Const.IS_HWORK_QIANKUN) {
  hworkJSApi = typeof window !== 'undefined' ? window.hwork : null
  setHworkJSApi(hworkJSApi)
  app = vue.createApp(App);
  createDefaultApp()
  app.mount('#app')
} else {
  let headStyles = window.$hwork_qiankun_styleList || []
  renderWithQiankun({
    mount(props) {
      console.log('--mount');
      if (headStyles.length) {
        headStyles.forEach(node => {
          document.head.appendChild(node)
        })
        headStyles = []
      }
      render(props)
    },
    bootstrap() {
      console.log('--bootstrap');
    },
    update() {
      console.log('--update');
    },
    unmount() {
      console.log('--unmount');
      Array.from(document.head.children).forEach(node => {
        if (node.tagName === 'STYLE' || node.rel === 'stylesheet') {
          if (node.href?.includes(name)) {
            node.remove()
            headStyles.push(node)
          }
        }
      })
      window.$hwork_qiankun_styleList = headStyles

      app?.unmount();
    }
  });
}

function createDefaultApp(props = {}) {
  // app.config.globalProperties.$echarts = echarts
  let history = null

  history = createWebHistory(Const.IS_HWORK_QIANKUN ? (props?.routerBase || '') : name)

  const router = createRouter({
    history,
    routes
  })
  router.beforeEach((to, _from, next) => {
    if (to.matched.length) {
      next()
    } else if (props?.mainAppRouter) {
      props.mainAppRouter.replace('/portal/404')
    } else {
      next({ path: '/' })
    }
  })
  app.use(router).use(pinia).use(WujieVue).use(i18n)

  globals = app.config.globalProperties
}

export { globals, hworkJSApi, container, EventEmitter }
