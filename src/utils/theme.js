/**
 * 主题切换工具
 * 通过 CSS 变量实现全局主题切换，兼容 Hwork 平台主题配置
 */
import { settingsStore } from '@/pinia'

// 判断值是否为图片路径，返回对应的 CSS 值
function isImage(value) {
  if (!value) return 'transparent'
  if (value.startsWith('http') || value.startsWith('/') || value.startsWith('data:')) {
    return `url(${value})`
  }
  return value
}

// 默认主题配置
export const defaultThemeConfig = {
  themeName: '默认主题',
  themeId: 0,
  selected: false,
  themeCorer: '',
  publishTime: '长期有效',
  checked: false,
  allMenuSelectTextColor: '#165DFF', // web所有菜单选中文字颜色
  webWorkIcon: '#165DFF', // 顶部导航栏logo颜色
  userIconColor: 0, // 顶部导航栏文案预设值 0：深 1：浅
  topMenuBarImage: '#fff', // 顶部导航栏底图
  navbarSelectTextColor: '#165DFF', // 顶部导航栏文字选中颜色
  workbenchBgColorTopNav: '#fff', // 顶部导航栏工作台背景色
  workbenchSelectedColorTopNav: '', // 顶部导航栏工作台选中色
  usedMenuBackgroundImage: 'https://hwork.haier.net/static/background.png', // 应用弹框背景图
  navbarDrawerSquareColor: '#E7F4FF', // 应用弹框分类圆角颜色
  navbarDrawerFirstMenuColor: '#165DFF', // 应用弹框第一级菜单文字颜色
  navbarSettingFirstMenuColor: '#2c4d99', // 系统设置弹框第一级菜单文字颜色
  navbarDrawerClassifyMenuColorActive: 'linear-gradient(-6deg, #7da4ff 0%, #165DFF 100%)', // 应用弹框分类选中左侧线条颜色
  sideMenuFontColor: 1, // 左侧菜单栏文案预设值 0：深 1：浅
  leftMenuBarImage: '#165DFF', // 左侧菜单栏背景图
  leftMenuMouseHoverColor: 'rgba(255, 255, 255, .3)', // 左侧菜单栏元素悬浮颜色
  sideMenuFontColorHover: '#fff', // 左侧菜单栏元素悬浮文字颜色
  popoverBgColorHover: '#F1F2F8', // popover弹框元素悬浮背景色
  popoverBgColorActive: '#0e42d21a', // popover弹框元素选中背景色
  popoverFontColorHover: '#165DFF', // popover弹框文字悬浮颜色
  popoverFontColorActive: '#0E42D2', // popover弹框文字选中颜色
  tabControlInteractionColor: '#165DFF' // 多标签tab选中颜色
}

/**
 * 切换主题
 * @param {Object} value - 主题配置对象，结构同 defaultThemeConfig
 */
export const switchTheme = (value) => {
  const store = settingsStore()

  // 所有文字选中主题色
  document.body.style.setProperty('--default-font-color-hover', value.allMenuSelectTextColor)

  // logo
  document.body.style.setProperty('--default-logo-color', isImage(value.webWorkIcon))

  // 顶部导航栏文案预设值 0：深 1：浅
  store.setNavbarTheme(Number(value.userIconColor) === 1 ? 'ant-theme-light' : 'ant-theme-default')

  // 顶部导航栏背景图
  document.body.style.setProperty('--default-navbar-bg-color', isImage(value.topMenuBarImage))

  // 顶部导航栏文字选中颜色
  document.body.style.setProperty('--default-navbar-font-color-hover', value.navbarSelectTextColor)

  // 顶部导航栏工作台文字颜色
  document.body.style.setProperty('--default-navbar-bench-color', value.allMenuSelectTextColor)

  // 顶部导航栏工作台背景色
  document.body.style.setProperty(
    '--default-navbar-bench-background-color',
    value.workbenchBgColorTopNav || '#fff'
  )

  // 顶部导航栏工作台选中色
  document.body.style.setProperty(
    '--default-navbar-bench-active-color',
    value.workbenchSelectedColorTopNav
  )

  // 应用弹框背景图
  document.body.style.setProperty(
    '--default-navbar-drawer-bg-color',
    isImage(value.usedMenuBackgroundImage)
  )

  // 应用弹框分类圆角颜色
  document.body.style.setProperty(
    '--default-navbar-drawer-square-color',
    value.navbarDrawerSquareColor
  )

  // 应用弹框第一级菜单文字颜色
  document.body.style.setProperty(
    '--default-navbar-drawer-first-menu-color',
    value.navbarDrawerFirstMenuColor
  )

  // 系统设置弹框第一级菜单文字颜色
  document.body.style.setProperty(
    '--default-navbar-setting-first-menu-color',
    value.navbarSettingFirstMenuColor
  )

  // 应用弹框分类选中左侧线条颜色
  document.body.style.setProperty(
    '--default-navbar-drawer-classify-menu-color-active',
    value.themeId === 0 ? value.navbarDrawerClassifyMenuColorActive : value.allMenuSelectTextColor
  )

  // 左侧菜单栏文案预设值 0：深 1：浅
  store.setSidemenuTheme(
    Number(value.sideMenuFontColor) === 0 ? 'ant-theme-light' : 'ant-theme-default'
  )

  // 左侧菜单栏应用名称背景图
  document.body.style.setProperty(
    '--default-sidemenu-title-bg-color',
    value.themeId === 0 ? 'url(https://hwork.haier.net/static/sidemenu-bg-open.png)' : 'transparent'
  )

  // 左侧菜单栏背景图
  document.body.style.setProperty('--default-sidemenu-bg-color', isImage(value.leftMenuBarImage))

  // 左侧菜单栏元素悬浮颜色
  document.body.style.setProperty(
    '--default-sidemenu-bg-color-hover',
    value.leftMenuMouseHoverColor
  )

  // 左侧菜单栏元素悬浮文字颜色
  document.body.style.setProperty(
    '--default-sidemenu-font-color-hover',
    value.sideMenuFontColorHover
  )

  // 左侧菜单栏箭头图标悬浮颜色
  document.body.style.setProperty(
    '--default-sidemenu-arrow-color-hover',
    value.sideMenuFontColorHover
  )

  // popover弹框元素悬浮背景色
  if (value.popoverBgColorHover) {
    document.body.style.setProperty('--default-popover-bg-color-hover', value.popoverBgColorHover)
  }

  // popover弹框元素选中背景色
  if (value.popoverBgColorActive) {
    document.body.style.setProperty('--default-popover-bg-color-active', value.popoverBgColorActive)
  }

  // popover弹框文字悬浮颜色
  if (value.popoverFontColorHover) {
    document.body.style.setProperty(
      '--default-popover-font-color-hover',
      value.popoverFontColorHover
    )
  }

  // popover弹框文字选中颜色
  if (value.popoverFontColorActive) {
    document.body.style.setProperty(
      '--default-popover-font-color-active',
      value.popoverFontColorActive
    )
  }

  // 多标签tab选中颜色
  document.body.style.setProperty(
    '--default-tag-font-color-active',
    value.tabControlInteractionColor
  )
}
