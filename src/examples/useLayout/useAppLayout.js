import { ref } from 'vue'

/**
 * 应用布局配置 Hook
 * 管理菜单数据、折叠状态、选中项等布局相关状态
 */
export function useAppLayout() {
  // 侧边栏折叠状态
  const isCollapsed = ref(false)

  // 当前选中的菜单项
  const selectedKey = ref('home')

  // 菜单数据配置示例
  const menuList = ref([
    {
      key: 'home',
      title: '首页',
      icon: 'h-icon-home'
    },
    {
      key: 'apps',
      title: '应用管理',
      icon: 'h-icon-management',
      children: [
        { key: 'app-list', title: '应用列表' },
        { key: 'app-config', title: '应用配置' }
      ]
    },
    {
      key: 'user',
      title: '用户中心',
      icon: 'h-icon-user'
    },
    {
      key: 'settings',
      title: '系统设置',
      icon: 'h-icon-settings'
    }
  ])

  /**
   * 菜单点击事件处理
   * @param {string} key - 菜单项的 key
   */
  const handleMenuClick = (key) => {
    selectedKey.value = key
  }

  /**
   * 切换侧边栏折叠状态
   */
  const toggleCollapsed = () => {
    isCollapsed.value = !isCollapsed.value
  }

  return {
    isCollapsed,
    selectedKey,
    menuList,
    handleMenuClick,
    toggleCollapsed
  }
}
