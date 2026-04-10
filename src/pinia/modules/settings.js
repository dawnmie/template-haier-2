import { defineStore } from '../defineStore'

export default defineStore('settings', {
  state: () => ({
    // 顶部导航栏主题：'ant-theme-default'(深色) | 'ant-theme-light'(浅色)
    navbarTheme: 'ant-theme-default',
    // 左侧菜单栏主题：'ant-theme-default'(深色) | 'ant-theme-light'(浅色)
    sidemenuTheme: 'ant-theme-default'
  }),
  actions: {
    setNavbarTheme(theme) {
      this.navbarTheme = theme
    },
    setSidemenuTheme(theme) {
      this.sidemenuTheme = theme
    }
  }
})
